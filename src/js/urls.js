
goog.provide('consy.urls');

goog.require('consy.apps.core.Dashboard');
goog.require('consy.apps.plans.PlanList');
goog.require('consy.apps.plans.PlanNew');
goog.require('consy.apps.plans.PlanView');
goog.require('consy.apps.users.Login');
goog.require('consy.apps.users.Logout');
goog.require('consy.apps.users.Signup');

/**
* urls for routing to View objects
* @type {Array.<Array.<String, consy.frame.View>>}
**/
consy.urls = [
    ['^/$', consy.apps.core.Dashboard],
    ['^/login/$', consy.apps.users.Login],
    ['^/signup/$', consy.apps.users.Signup],
    ['^/logout/$', consy.apps.users.Logout],
    ['^/plans/$', consy.apps.plans.PlanList],
    ['^/plans/new/$', consy.apps.plans.PlanNew],
    ['^/plans/([\\w]+)/$', consy.apps.plans.PlanView]
];

