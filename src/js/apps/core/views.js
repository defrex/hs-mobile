
goog.provide('consy.apps.core.Dashboard');

goog.require('consy.frame.View');
goog.require('consy.tmpl');

/** @constructor **/
consy.apps.core.Dashboard = function() {
    consy.frame.View.apply(this, arguments);
};
goog.inherits(consy.apps.core.Dashboard, consy.frame.View);

consy.apps.core.Dashboard.prototype.template = consy.tmpl.Dashboard;


