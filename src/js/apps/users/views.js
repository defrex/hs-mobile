
goog.provide('hs.users.views');

goog.require('hs.tmpl.users');
goog.require('frame.View');
goog.require('frame.dom.fx');
goog.require('frame.form.utils');
goog.require('frame.apiRequest');
goog.require('goog.crypt.base64');

/** @constructor **/
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
        this.submit();
    }, this);
};

/**
* Submit the form
* @type {function()}
**/
hs.users.views.Login.prototype.submit = function(){
    var email = this.doc.q('#email');
    if (this.doc.q('#email').length)
        return this.register();
    if (this.doc.q('#password').length)
        return this.login();
};

hs.users.views.Login.prototype.register = function(){
    var email = this.doc.q('#email');
    
    if (!frame.form.utils.isValidEmail(email.val())){
        email.alert();
    }else{
        email = this.email = email.val();
        frame.apiRequest({
            path: '/api/v1/user/',
            method: 'POST',
            body: {'username': email},
            auth: false
        }, function(resp, status, xhr){
            if (status == 201){
                frame.store.put('email', email);
                frame.store.put('token', resp.token);
                frame.store.put('userURI', resp.resource_uri);
                frame.controller.goTo('/');
            }else if (status == 400 && resp['username'][0] == 'This email is already registered.'){
                this.showLogin();
            }else{
                frame.log('unknown error: ', status, resp)
            }
        }, this);
    }
};

hs.users.views.Login.prototype.login = function(){
    var pass = this.doc.q('#password').val();
    
    if (pass == ''){
        this.doc.q('#password').alert();
    }else{
        frame.apiRequest({
            path: '/api/v1/auth/',
            method: 'GET',
            headers: {'Authorization': 'Basic '+goog.crypt.base64.encodeString(
                    this.email+':'+pass)},
            auth: false
        }, function(resp, status, xhr){
            if (status == 200){
                frame.store.put('email', this.email);
                frame.store.put('token', resp.token);
                frame.store.put('userURI', resp.resource_uri);
                frame.controller.goTo('/');
            }else{
                frame.log('unknown error: ', status, resp)
            }
        }, this);
    }
};

/**
* display the password field for login
* @type {function()}
**/
hs.users.views.Login.prototype.showLogin = function(){
    this.doc.q('#email').remove();
    this.doc.q('form').prepend('<input '
            +'type="password" '
            +'required '
            +'placeholder="Password" '
            +'id="password" />');
    this.doc.q('#password').alert();
};



/** @constructor **/
hs.users.views.Logout = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));

    frame.store.del('email');
    frame.controller.goTo('/');
};
goog.inherits(hs.users.views.Logout, frame.View);

hs.users.views.Logout.prototype.noDisplay = true;
