
goog.provide('frame.Model');
goog.provide('frame.ModelList');

goog.require('frame.ArrayClass');

/**
* Base class for data Model objects
* @constructor
**/
frame.Model = function(){};

/**
* Base class list for Models
* @constructor
* @param {array} arr a json-array.
**/
frame.ModelList = function(arr) {
    Array.call(this);
    if (typeof arr != 'undefined' && arr.length)
        for (var i = 0; i < arr.length; i++)
            this.push(arr[i]);
};
goog.inherits(frame.ModelList, Array);

/**
* call clbk for each item in list
* @param {function(frame.Model)} clbk
* @param {function(Object)} that this in the callback.
**/
frame.ModelList.prototype.each = function(clbk, that) {
    that = that || this;
    var l = this.length;
    for (var i = 0; i < l; i++) clbk.call(that, this.getItem(i));
};

/**
* get Model instance at index
* @param {number} index
**/
frame.ModelList.prototype.getItem = function(index) {
    return new this.Model(this[index]);
};

