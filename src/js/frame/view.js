
goog.provide('consy.frame.View');

goog.require('consy.apps.users.User');
goog.require('goog.ui.Component');
goog.require('goog.ui.Component.Error');

/**
* The main View object. Subclasses of View can be registered in urls.js to
* create a "page".
* @constructor
**/
consy.frame.View = function() {
    goog.ui.Component.call(this, Array.prototype.pop.call(arguments));
    
    if (this.requireAuth) {
        if (!consy.frame.store.has('username')) throw ('403');
        this.username = consy.frame.store.get('username');
    }
    
    this.args = Array.prototype.slice.call(arguments);
    
    this.doc = new consy.frame.dom.Node(document, this.dom_);
};
goog.inherits(consy.frame.View, goog.ui.Component);

/**
* only allow authed users to see this view
* @type {boolean}
**/
consy.frame.View.prototype.requireAuth = true;

/**
* display Action Bar
* @type {boolean}
**/
consy.frame.View.prototype.actionBar = true;

/**
* The view's template
* @type {function()}
**/
consy.frame.View.prototype.template = null;

/**
* @param {function(Object)} clbk required. called after render.
* @param {Object} that clbk's this.
**/
consy.frame.View.prototype.createDom = function(clbk, that) {
    consy.frame.View.superClass_.createDom.call(this);
    that = that || this;

    if (this.template === null) throw ('no template for view');

    if (!this.actionBar && this.doc.q('#actionbar').visible())
        this.doc.q('#actionbar').hide();
    else if (this.actionBar && !this.doc.q('#actionbar').visible())
        this.doc.q('#actionbar').show();

    if (this.username)
        consy.apps.users.User.get(this.username, function(user) {
            this.user = user;
            finish.call(this);
        }, this);
    else
        finish.call(this);

    function finish() {
        this.prepContext(function() {
            this.element_.innerHTML = this.template(this);
            clbk.call(that);
        }, this);
    };
};

/**
* async-able verstion of goog.ui.Component.prototype.render_
* @param {Element} opt_parent the parent element to render into.
* @param {function(Object)} clbk required. called after render.
* @param {Object} that clbk's this.
**/
consy.frame.View.prototype.render = function(opt_parent, clbk, that) {
    if (this.inDocument_)
        throw Error(goog.ui.Component.Error.ALREADY_RENDERED);

    if (typeof opt_parent == 'function') {
        clbk = opt_parent;
        that = clbk || this;
    }else {
        that = that || this;
    }

    if (!this.element_) this.createDom(withDom, this);
    else withDom.call(this);

    function withDom() {
        if (opt_parent) {
            opt_parent.appendChild(this.element_);
        } else {
            this.dom_.getDocument().body.appendChild(this.element_);
        }

        // If this component has a parent component that isn't in the document yet,
        // we don't call enterDocument() here.  Instead, when the parent component
        // enters the document, the enterDocument() call will propagate to its
        // children, including this one.  If the component doesn't have a parent
        // or if the parent is already in the document, we call enterDocument().
        if (!this.parent_ || this.parent_.isInDocument()) {
            this.enterDocument();
        }
        if (clbk) clbk.call(that);
    }
};

/**
* @param {function(Object)} clbk required. called after render.
* @param {Object} that clbk's this.
**/
consy.frame.View.prototype.prepContext = function(clbk, that) {
    if (clbk) clbk.call(that || this);
};



