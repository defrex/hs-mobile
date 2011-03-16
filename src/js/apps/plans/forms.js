

goog.provide('consy.apps.plans.PlanForm');

goog.require('consy.frame.Form');
goog.require('consy.frame.form.fields.TextField');
goog.require('consy.ui.dialog.Toast');

/**
* form for the new plan page
* @constructor
* @extends consy.frame.Form
**/
consy.apps.plans.PlanForm = function() {
    this.q = '.plan-new form';

    this.fields = {
        what: new consy.frame.form.fields.TextField({
            q: '[name=what]',
            required: true,
            maxLength: 150,
            name: 'What'
        }),
        where: new consy.frame.form.fields.TextField({
            q: '[name=when]',
            maxLength: 25,
            name: 'Where'
        })
    };

    consy.frame.Form.call(this);
};
goog.inherits(consy.apps.plans.PlanForm, consy.frame.Form);

consy.apps.plans.PlanForm.prototype.renderError = function(elem, error) {
    new consy.ui.dialog.Toast(error).display();
};

