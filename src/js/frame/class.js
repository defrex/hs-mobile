
goog.provide('consy.ArrayClass');
goog.provide('consy.frame.ArrayClass');
goog.provide('consy.frame.Class');

goog.require('consy.log');

/**
* Inherit from this to make an array-like object
* @constructor
**/
consy.ArrayClass = function() {};
consy.ArrayClass.prototype = new Array();

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function() {
  var initializing = false;
  /**
  * The base Class implementation (does nothing)
  * @constructor
  */
  consy.frame.Class = function() {};

  /** 
  * Create a new Class that inherits from this class
  * @deprecated Use goog.inherits instead.
  **/
  consy.frame.Class.extend = function(prop) {
    consy.warn('Resig\'s Class.extend depricated in favour of goog.inherits');
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      if (typeof prop[name] == 'function' && typeof _super[name] == 'function') {
        prototype[name] = (function(name, fn) {
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]);
      }else {
        prototype[name] = prop[name];
      }
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init)
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };

  /**
  * The base Class implementation for Array-like objects
  * @typedef {function()}
  */
  consy.frame.ArrayClass = function() {};
  consy.frame.ArrayClass.prototype = new Array();
  consy.frame.ArrayClass.extend = consy.frame.Class.extend;

})();
