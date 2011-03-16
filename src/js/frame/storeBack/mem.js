
goog.provide('consy.frame.storeBack.Mem');

goog.require('consy.frame.storeBack');

/** @constructor **/
consy.frame.storeBack.Mem = function() {
    consy.frame.storeBack.call(this);
    this.cache = new Object();
};
goog.inherits(consy.frame.storeBack.Mem, consy.frame.storeBack);
consy.frame.storeBack.Mem.prototype.get = function(key) {
    return this.cache[key];
};
consy.frame.storeBack.Mem.prototype.put = function(key, value) {
    this.cache[key] = value;
};
consy.frame.storeBack.Mem.prototype.has = function(key) {
    return typeof this.cache[key] != 'undefined';
};
consy.frame.storeBack.Mem.prototype.del = function(key) {
    delete this.cache[key];
};
consy.frame.storeBack.Mem.prototype.clear = function() {
    this.cache = new Object();
};

consy.frame.storeBack.Mem.isAvailable = function() {return true;};

