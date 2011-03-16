
goog.provide('consy.apps.users.Login');
goog.provide('consy.apps.users.Logout');
goog.provide('consy.apps.users.Signup');
goog.provide('consy.apps.users.UserView');

goog.require('consy.apps.users.User');
goog.require('consy.frame.View');
goog.require('consy.frame.store');
goog.require('consy.tmpl.auth');
goog.require('consy.tmpl.users');
goog.require('consy.ui.dialog.Wait');

/**
* User view
* @constructor
**/
consy.apps.users.UserView = function() {
    consy.frame.View.apply(this, arguments);
};
goog.inherits(consy.apps.users.UserView, consy.frame.View);

consy.apps.users.UserView.prototype.template = consy.tmpl.users.UserView;


/**
* Logout View
* @constructor
**/
consy.apps.users.Logout = function() {
    consy.frame.View.apply(this, arguments);

    consy.frame.store.clear();
    consy.controller.goTo('/login/');
};
goog.inherits(consy.apps.users.Logout, consy.frame.View);

consy.apps.users.Logout.prototype.noDisplay = true;


/**
* Login View
* @constructor
**/
consy.apps.users.Login = function() {
    consy.frame.View.apply(this, arguments);
};
goog.inherits(consy.apps.users.Login, consy.frame.View);

consy.apps.users.Login.prototype.requireAuth = false;
consy.apps.users.Login.prototype.actionBar = false;
consy.apps.users.Login.prototype.template = consy.tmpl.auth.Login;
consy.apps.users.Login.prototype.enterDocument = function() {
    this.doc.q('input[name=submit]').on('click', function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var uip = this.doc.q('input[name=username]');
        var username = uip.val();
        if (username == '') {
            uip.style('backgroundColor', '#f00');
            uip.on('keydown', function kd() {
                uip.style('backgroundColor', '#fff');
                uip.un('keydown', kd);
            });
            return;
        }

        var pip = this.doc.q('input[name=password]');
        var password = pip.val();
        if (password == '') {
            pip.style('backgroundColor', '#f00');
            pip.on('keydown', function kd() {
                pip.style('backgroundColor', '#fff');
                pip.un('keydown', kd);
            });
            return;
        }

        var wait = new consy.ui.dialog.Wait('Loging in...');
        wait.display();

        consy.apps.users.User.login(username, password, function(user) {
            wait.remove();
            if (user instanceof consy.apps.users.User) {
                consy.controller.goTo('/');
            }else {
                this.doc.q('form').prepend('<div class="error">'
                        + 'Invalid username or password</div>');
            }

        });

    });
};


/**
* Signup View
* @constructor
**/
consy.apps.users.Signup = function() {
    consy.frame.View.apply(this, arguments);
};
goog.inherits(consy.apps.users.Signup, consy.frame.View);

consy.apps.users.Signup.prototype.requireAuth = false;
consy.apps.users.Signup.prototype.actionBar = false;
consy.apps.users.Signup.prototype.template = consy.tmpl.auth.SignUp;
consy.apps.users.Signup.prototype.enterDocument = function() {
    this.doc.q('input[name=submit]').on('click', function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var invalid = function(ip) {
            ip.style('backgroundColor', '#f00');
            ip.on('keydown', function kd() {
                ip.style('backgroundColor', '#fff');
                ip.un('keydown', kd);
            });
        }

        var filled = function(q) {
            var ip = this.doc.q(q);
            var val = ip.val();
            if (val == '') return invalid(ip);
            return val;
        }

        var username = filled('input[name=username]');
        var password = filled('input[name=password]');
        var password2 = filled('input[name=password2]');
        if (password != password2) {
            invalid(this.doc.q('input[type=password]'));
            return;
        }else if (username == '' || password == '')
            return;

        var wait = new consy.ui.dialog.Wait('Loging in...');
        wait.display();

        var User = consy.apps.users.User;

        User.put(username, password, function(resp, status) {
            if (status == 200) {
                User.login(username, password, function() {
                    wait.remove();
                    consy.controller.goTo('/');
                });
            }else if (status == 409) {
                wait.remove();
                this.doc.q('form').prepend('<div class="error">'
                        + 'That username is taken.</div>');
            }else {
                wait.remove();
                consy.log('error', resp);
            }
        });

    });
};

