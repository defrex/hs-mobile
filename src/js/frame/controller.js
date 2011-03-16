
goog.provide('consy.frame.Controller');

goog.require('goog.dom');
goog.require('goog.testing.stacktrace');
goog.require('consy.frame.Class');
goog.require('consy.frame.route');
goog.require('consy.tmpl');

/**
* One Class to rule them all. Or at lease rule all the Views.
* @constructor
**/
consy.frame.Controller = function() {

    /**
    * @type {Array.<consy.frame.View>}
    **/
    this.viewStack = new Array();

    /**
    * DOM helper class. This get passed into and reused by all the views.
    * @type {goog.dom.DomHelper}
    **/
    this.dom_ = goog.dom.getDomHelper();
    
    /**
    * DOMinator.
    * @type {consy.frame.dom.Node}
    **/
    this.doc = new consy.frame.dom.Node(document, this.dom_);
    
    this.doc.q('body').append(consy.tmpl.Main());
};

/** Kicks off the hash change monitoring. **/
consy.frame.Controller.prototype.startHashChange = function() {
    var hashChange = function() {
        var h = window.location.hash;
        h = h == '' ? '/' : h.slice(1);
        consy.log('loading view for url: ' + h);
        consy.frame.route(h);
    }

    if (window.onHashChange != undefined) {
        window.onHashChange = hashChange;
    }else {
        var hash;
        (function checkHash() {
            if (hash != window.location.hash) {
                hash = window.location.hash;
                hashChange();
            }
            setTimeout(checkHash, 100);
        })();
    }
};

/** Render the top view **/
consy.frame.Controller.prototype.renderTop = function() {
    this.viewStack[this.viewStack.length - 1].render(this.doc.q('#main').html('')[0]);
};

/**
* @param {consy.frame.View} view View subclass.
* @param {Array.<string>} args extracted data from catpture groups in the url.
**/
consy.frame.Controller.prototype.push = function(view, args) {
    if (!(view instanceof consy.frame.View)) {
        if (!(args[args.length-1] instanceof goog.dom.DomHelper))
            args.push(this.dom_);
        // this little hack-fest here lets us instantiate the view with apply
        var V = function() {view.apply(this, args)};
        V.prototype = view.prototype;
        try {
            view = new V();
        }catch (e) {
            if (e == '403') this.authReset();
            else if (consy.DEBUG)
                consy.log('view init error', goog.testing.stacktrace.get());
            return;
        }
    }
    this.viewStack.push(view);
    if (view.noDisplay !== true) this.renderTop();
};

/** Remove view from stack **/
consy.frame.Controller.prototype.pop = function() {
    this.viewStack.pop().dispose();
    this.renderTop();
};

/** clear view stack **/
consy.frame.Controller.prototype.clear = function() {
    this.viewStack = new Array();
};

/** 
* fetch a URL, kinda 
* @param {string} path Path to go to.
**/
consy.frame.Controller.prototype.goTo = function(path) {
    document.location.hash = '#' + path;
};

/**
* Triggers when there is an auth error. It clears the view stack
*  and loads /login/
**/
consy.frame.Controller.prototype.authReset = function() {
    this.clear();
    document.location.hash = '#/login/';
};


