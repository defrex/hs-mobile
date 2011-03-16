

goog.provide('consy.frame.form.fields.TextField');

goog.require('consy.frame.form.fields.Field');

/**
* field class for a text field
* @constructor
* @extends consy.frame.form.fields.Field
**/
consy.frame.form.fields.TextField = function() {
    consy.frame.form.fields.Field.apply(this, arguments);
};
goog.inherits(consy.frame.form.fields.TextField, consy.frame.form.fields.Field);

/**
* validate this form field
* @this {consy.frame.Form.fields.Field}
* @param {function(boolean, string)} clbk callback, passed a success
*     boolean and an error message.
**/
consy.frame.form.fields.TextField.prototype.validate = function(clbk, that) {
    that = that || this;
    consy.frame.form.fields.TextField.superClass_.validate.call(this, function() {
        var done = function() {clbk.call(that, this.valid, this.error);}

        if (!this.valid) done();

        var el = this.getElem(),
            val = el.val(),
            name = this.kwargs.name || 'This field';

        this.valid = true;

        this.valid = !(this.kwargs.required && val.length == 0);
        if (!this.valid) {
            this.error = name + ' is required';
            return done.call(this);
        }

        if (this.kwargs.maxLength) {
            this.valid = this.kwargs.maxLength >= val.length;
            if (!this.valid) {
                this.error = 'Only ' + this.kwargs.maxLength
                        + ' characters allowed for ' + name;
                return done.call(this);
            }
        }

        done.call(this);
    }, this);
};

