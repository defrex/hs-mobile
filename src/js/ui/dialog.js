
goog.provide('consy.ui.dialog.Dialog');
goog.provide('consy.ui.dialog.Toast');
goog.provide('consy.ui.dialog.Wait');

//goog.require('goog.ui.Button');
//goog.require('goog.ui.Css3ButtonRenderer');
//goog.require('goog.object');
goog.require('consy.frame.Class');
goog.require('consy.tmpl.ui.dialog');
goog.require('doc');


/**
* A dialog
* @constructor
**/
consy.ui.dialog.Dialog = consy.frame.Class.extend({
    template: consy.tmpl.ui.dialog.Dialog,
    /**
    * the constructor
    * @this {consy.ui.dialog.Wait}
    * @param {string} body the body of the dialog.
    * @param {Object} buttons optional map buttons text {string} => function().
    * @param {string} posX the x-axis position of the toast in the form
    *       '5px' or '25%'.
    * @param {string} posY the y-axis position of the toast in the form
    *       '5px' or '25%'.
    **/
    init: function(body, buttons, posX, posY) {
        this.body = body;
        this.posX = posX || '50%';
        this.posY = posY || '55px';
        //this.buttonHandlers = buttons || this.buttonHandlers;
        //if (this.buttonHandlers)
        //    this.buttonNames = goog.object.getKeys(this.buttonHandlers);
    },
    /**
    * Displays the message, and removes it after a time.
    * @this {consy.ui.dialog.Wait}
    **/
    display: function(clbk, that) {
        that = that || this;
        doc.q('body').append(this.template(this));

        var t = doc.q('.dialog');

        if (/\d+%/.test(this.posX))
            t.style('marginLeft', -(t[0].offsetWidth / 2) + 'px');
        t.style('left', this.posX);

        if (/\d+%/.test(this.posY))
            t.style('marginTop', -(t[0].offsetHeight / 2) + 'px');
        t.style('top', this.posY);

        /*
        if (this.buttonHandlers){
            this.buttons = [];
            goog.object.forEach(this.buttonHandlers, function(handler, n){
                var button = new goog.ui.Button(n,
                        new goog.ui.Css3ButtonRenderer.getInstance());
                button.addEventListener('click', handler);
                this.buttons.push(button);
            }, this);
        }
        */

        if (clbk) clbk.call(that);
    },
    /**
    * Displays the message, and removes it after a time.
    * @this {consy.ui.dialog.Wait}
    **/
    remove: function(clbk, that) {
        doc.q('.dialog').remove();
    }
});


/**
* A spinner + text dialog
* @constructor
* @extends consy.ui.dialog.Dialog
**/
consy.ui.dialog.Wait = consy.ui.dialog.Dialog.extend({
    template: consy.tmpl.ui.dialog.Wait,
    /**
    * the constructor
    * @this {consy.ui.dialog.Wait}
    * @param {string} body the body of the dialog.
    * @param {string} posX the x-axis position of the toast in the form
    *       '5px' or '25%'.
    * @param {string} posY the y-axis position of the toast in the form
    *       '5px' or '25%'.
    **/
    init: function(body, posX, posY) {
        this._super(body, undefined, posX, posY);
    }
});


/**
* a text dialog that disapears on it's own.
* @constructor
* @extends consy.ui.dialog.Dialog
**/
consy.ui.dialog.Toast = consy.ui.dialog.Dialog.extend({
    template: consy.tmpl.ui.dialog.Toast,
    /**
    * the constructor
    * @this {consy.ui.dialog.Wait}
    * @param {string} body
    * @param {number} timeout the time to wait before removing the message.
    * @param {string} posX the x-axis position of the toast in the form
    *       '5px' or '25%'.
    * @param {string} posY the y-axis position of the toast in the form
    *       '5px' or '25%'.
    **/
    init: function(body, timeout, posX, posY) {
        this.timeout = timeout || 5000;
        this._super(body, null, posX, posY);
    },
    /**
    * Displays the message, and removes it after a time.
    * @this {consy.ui.dialog.Wait}
    **/
    display: function() {
        this._super.apply(this, arguments);
        setTimeout(function() {doc.q('.dialog.toast').remove();}, this.timeout);
    }
});


/**
* a dialog with okay and cancel buttons
* @constructor
* @extends consy.ui.dialog.Dialog
**
consy.ui.dialog.OkCancel = consy.ui.dialog.Dialog.extend({
    buttonHandlers: {
        'Okay': function(e){
            consy.log('Okay!');
        },
        /** @this {consy.ui.dialog.Wait} **
        'Cancel': function(e){
            this.remove();
        }
    }
});
*/












