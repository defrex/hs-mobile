
goog.provide('consy.ui.widgets.DateTime');

goog.require('consy.tmpl.ui.widgets');
goog.require('consy.utils');
goog.require('goog.date');
goog.require('goog.dom');
goog.require('goog.events.EventHandler');
goog.require('goog.style');
goog.require('goog.ui.Component');

/**
* DateTime widget
* @constructor
* @param {Date|number} opt_date a Date ofject or timestamp.
* @param {goog.dom.DomHelper} opt_domHelper
**/
consy.ui.widgets.DateTime = function(opt_date, opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);

    /**
    * The current date of the widget
    * @type {Date}
    **/
    this.date = opt_date instanceof Date ? opt_date :
                typeof opt_date == 'number' ? new Date(opt_date) :
                new Date();

    // round the minutes to the latest 15
    // TODO: this ignores the edge case of rolling over to a new day.
    //     closure has a solution for that, but it would mean not using
    //     native JS Date objects.
    var min = this.date.getMinutes();
    if (min > 0 && min < 15)
        this.date.setMinutes(15);
    else if (min > 15 && min < 30)
        this.date.setMinutes(30);
    else if (min > 30 && min < 45)
        this.date.setMinutes(45);
    else if (min > 45 && this.date.getHours() != 24) {
        this.date.setHours(this.date.getHours + 1);
        this.date.setMinutes(0);
    }

    /**
    * 'am'|'pm'
    * @type {string}
    **/
    this.m = this.date.getHours() > 12 ? 'pm' : 'am';

    /**
    * Event handler for this object.
    * @type {goog.events.EventHandler}
    * @private
    **/
    this.eh_ = new goog.events.EventHandler(this);

    this.dispatchEvent({type: 'change'});
};
goog.inherits(consy.ui.widgets.DateTime, goog.ui.Component);

consy.ui.widgets.DateTime.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};

consy.ui.widgets.DateTime.prototype.decorateInternal = function(element) {
    this.element_ = element;
    this.element_.innerHTML = consy.tmpl.ui.widgets.DateTime();
};

consy.ui.widgets.DateTime.prototype.enterDocument = function() {
    consy.ui.widgets.DateTime.superClass_.enterDocument.call(this);

    this.eh_.listen(this.element_, goog.events.EventType.CLICK,
            this.onClick_, true, this);
    this.renderDate();
};

/**
* Click handler for all widget clicks. Updated this.date accordingly
**/
consy.ui.widgets.DateTime.prototype.onClick_ = function(e) {
    var id = e.target.id.split('-');
    switch (id[0]) {
        case 'day':
            if (id[1] == 'today')
                this.date.setDate(new Date().getDate());
            else {
                var now = new Date();
                if (goog.date.getNumberOfDaysInMonth(now.getYear(),
                        now.getMonth()) == now.getDate()) {
                    this.date.setDate(1);
                    if (now.getMonth() == 12)
                        this.date.setMonth(1);
                    else
                        this.date.setMonth(now.getMonth() + 1);
                }else {
                    this.date.setDate(now.getDate() + 1);
                }
            }
        break;
        case 'm':
            if (this.m == 'am' && id[1] == 'pm')
                this.date.setHours(this.date.getHours() + 12);
            else if (this.m == 'pm' && id[1] == 'am')
                this.date.setHours(this.date.getHours() - 12);
            this.m = id[1];
        break;
        case 'hour':
            var hour = parseInt(id[1]);
            if (this.m == 'pm')
                hour += 12;
            this.date.setHours(hour);
        break;
        case 'minute':
            this.date.setMinutes(parseInt(id[1]));
        break;
    }
    this.dispatchEvent({type: 'change'});
    this.renderDate();
};

/**
* Updates the button states depending on the current state
**/
consy.ui.widgets.DateTime.prototype.renderDate = function() {
    doc.q('.widget.datetime .button').removeClass('goog-css3-button-open');
    var day = new Date().getDate() == this.date.getDate() ? 'today' : 'tomorrow';
    doc.q('#day-' + day).addClass('goog-css3-button-open');
    doc.q('#m-' + this.m).addClass('goog-css3-button-open');
    var hour = this.m == 'am' ? this.date.getHours() : this.date.getHours() - 12;
    // TODO: there is a bug around displaying 0 hour times. This hacks around it
    //     but does so incompletely.
    if (hour < 0) hour = 12;
    doc.q('#hour-' + hour).addClass('goog-css3-button-open');
    doc.q('#minute-' + this.date.getMinutes()).addClass('goog-css3-button-open');
};

consy.ui.widgets.DateTime.prototype.exitDocument = function() {
    consy.ui.widgets.DateTime.superClass_.exitDocument.call(this);
    this.eh_.removeAll();
};

consy.ui.widgets.DateTime.prototype.dispose = function() {
    if (!this.getDisposed()) {
        consy.ui.widgets.DateTime.superClass_.dispose.call(this);
        this.eh_.dispose();
        this.date = null;
    }
};
