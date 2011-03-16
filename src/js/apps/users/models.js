//depends: apps/users/main.js, frame/model.js

goog.provide('consy.apps.users.User');

goog.require('consy.frame.Model');
goog.require('consy.frame.apiRequest');
goog.require('goog.string');

/** @constructor **/
consy.apps.users.User = function(json) {
    consy.frame.Model.call(this);
    this.username = json['username'];
    this.id = json['id'];
    this.created = json['created'];
    this.follower = json['follower'];
    this.following = json['following'];
};
goog.inherits(consy.apps.users.User, consy.frame.Model);

/**
* fetch a user object
* @param {string} username
* @param {function(consy.apps.users.User)} callback
**/
consy.apps.users.User.get = function(q, clbk, that) {
    that = that || consy.apps.users.User;
    if (typeof q == 'string') {
        consy.frame.apiRequest('/users/' + q + '/', function(resp, status) {
            if (status == 200)
                clbk.call(that, new consy.apps.users.User(resp));
            else
                clbk.call(that);
        });
    }else {
        throw ('unimplimented');
    }
};

/**
* create a new user
* @param {string} username
* @param {string} password
* @param {function(string, number)} callback
**/
consy.apps.users.User.put = function(username, password, clbk) {
    if (!username || !password) throw ('illegal arguments');

    consy.frame.apiRequest({
                path: '/users/' + username + '/',
                method: 'PUT',
                body: {'password': password},
                auth: false
            }, function(resp, status) {
        if (clbk) clbk(resp, status);
    });
};

/**
* log the user in. Sets up the token for use by apiRequest
* @param {string} username
* @param {string} password
* @param {function(consy.apps.users.User)} callback
**/
consy.apps.users.User.login = function(username, password, clbk) {
    if (!username || !password) throw ('illegal arguments');

    consy.frame.apiRequest({
                path: '/token/?username=' + username + '&password=' + password,
                auth: false
            }, function(resp, status) {
        if (status == 200) {
            consy.frame.store.put('token', resp);
            consy.frame.store.put('username', goog.string.trim(username.toLowerCase()));
            consy.apps.users.User.get(username, clbk);
        }else if (clbk) {
            clbk();
        }
    });
};

/**
* get the avatar url for a user
* @param {string} username
**/
consy.apps.users.User.avatarUrl = function(username) {
    return consy.API_SERVER + '/users/' + username + '/avatar/';
};

