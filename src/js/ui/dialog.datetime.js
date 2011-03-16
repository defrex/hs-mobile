
goog.provide('consy.ui.dialog.DateTimeDialog');

goog.require('consy.ui.widgets.DateTime');
goog.require('consy.utils');
goog.require('goog.ui.Dialog');

/**
* DateTime dialog
* @constructor
* @param {Date|number} opt_date a Date ofject or timestamp.
**/
consy.ui.dialog.DateTimeDialog = function(opt_date) {
    goog.ui.Dialog.call(this, null, false);

    /**
    * The current date of the widget
    * @type {Date}
    **/
    this.date = opt_date instanceof Date ? opt_date :
                typeof opt_date == 'number' ? new Date(opt_date) :
                new Date();

    /**
    * The DateTime widget
    * @type {consy.ui.widgets.DateTime}
    **/
    this.widget = null;
};
goog.inherits(consy.ui.dialog.DateTimeDialog, goog.ui.Dialog);

consy.ui.dialog.DateTimeDialog.prototype.createDom = function() {

    this.setTitle(consy.utils.formatDate(this.date));

    consy.ui.dialog.DateTimeDialog.superClass_.createDom.call(this);
};

consy.ui.dialog.DateTimeDialog.prototype.enterDocument = function() {
    consy.ui.dialog.DateTimeDialog.superClass_.enterDocument.call(this);

    this.widget = new consy.ui.widgets.DateTime(this.date);
    this.widget.render(this.getContentElement());
    this.widget.addEventListener('change', function() {
        this.date = this.widget.date;
    }, false, this);

    this.setVisible(true);
};

consy.ui.widgets.DateTime.prototype.dispose = function() {
    consy.ui.dialog.DateTimeDialog.superClass_.dispose.call(this);
    this.widget.dispose();
};


