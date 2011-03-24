
goog.provide('hs.users.views');

goog.require('hs.tmpl.users');
goog.require('frame.View');
goog.require('frame.dom.fx');
goog.require('frame.form.utils')
goog.require('PhoneGap');

hs.users.views.Login = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));
};
goog.inherits(hs.users.views.Login, frame.View);

/**
* only allow authed users to see this view
* @type {boolean}
**/
hs.users.views.Login.prototype.requireAuth = false;

/**
* display Action Bar
* @type {boolean}
**/
hs.users.views.Login.prototype.actionBar = false;

/**
* The view's template
* @type {function()}
**/
hs.users.views.Login.prototype.template = hs.tmpl.users.Login;

/**
* Set up event handlers after the DOM is loaded
* @type {function()}
**/
hs.users.views.Login.prototype.enterDocument = function(){
    frame.View.prototype.enterDocument.call(this, Array.prototype.pop.call(arguments));

    this.doc.q('#login form').on('submit', function(e){
        e.preventDefault();
        var email = this.doc.q('#email');
        if (!frame.form.utils.isValidEmail(email.val())){
            email.alert();
        }else{
            frame.log('TODO: POST email!');
            frame.store.put('email', email.val());
            frame.controller.goTo('/');
        }
    }, this);
};

/**
* Submit the form
* @type {function()}
**/
hs.users.views.Login.prototype.submit = function(){
    frame.log('Submitting');
};



hs.users.views.Logout = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));

    frame.store.del('email');
    frame.controller.goTo('/');
};
goog.inherits(hs.users.views.Logout, frame.View);

hs.users.views.Logout.prototype.noDisplay = true;