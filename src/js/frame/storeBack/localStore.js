
goog.provide('consy.frame.storeBack.LocalStore');

goog.require('consy.frame.storeBack');

/** @constructor **/
consy.frame.storeBack.LocalStore = function(){
    consy.frame.storeBack.call(this);
};
goog.inherits(consy.frame.storeBack.LocalStore, consy.frame.storeBack);

consy.frame.storeBack.LocalStore.prototype.has = function(key) {
    return this.get(key) != null;
};
consy.frame.storeBack.LocalStore.prototype.get = function(key) {
    return window.localStorage.getItem(key);
};
consy.frame.storeBack.LocalStore.prototype.put = function(key, value) {
    window.localStorage.setItem(key, value);
};
consy.frame.storeBack.LocalStore.prototype.del = function(key) {
    window.localStorage.removeItem(key);
};
consy.frame.storeBack.LocalStore.prototype.clear = function() {
    window.localStorage.clear();
};

consy.frame.storeBack.LocalStore.isAvailable = function() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    }catch (e) {
        return false;
    }
};

