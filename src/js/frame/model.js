
goog.provide('consy.frame.Model');
goog.provide('consy.frame.ModelList');

goog.require('consy.frame.ArrayClass');
goog.require('consy.frame.Class');

/**
* Base class for data Model objects
* @constructor
**/
consy.frame.Model = function(){};

/**
* Base class list for Models
* @constructor
* @param {array} arr a json-array.
**/
consy.frame.ModelList = function(arr) {
    Array.call(this);
    if (typeof arr != 'undefined' && arr.length) 
        for (var i = 0; i < arr.length; i++)
            this.push(arr[i]);
};
goog.inherits(consy.frame.ModelList, Array);

/** 
* call clbk for each item in list
* @param {function(consy.frame.Model)} clbk
* @param {function(Object)} that this in the callback.
**/
consy.frame.ModelList.prototype.each = function(clbk, that) {
    that = that || this;
    var l = this.length;
    for (var i = 0; i < l; i++) clbk.call(that, this.getItem(i));
};

/** 
* get Model instance at index
* @param {number} index
**/
consy.frame.ModelList.prototype.getItem = function(index) {
    return new this.Model(this[index]);
};

