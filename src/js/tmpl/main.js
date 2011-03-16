// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

goog.provide('consy.tmpl');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.ActionBar = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="actionbar"><a href="#/"><img src="img/ab_logo.png" alt="connectsy" id="ab_logo" /></a></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.Main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  consy.tmpl.ActionBar(opt_data, output);
  output.append('<div id="main"></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.Dashboard = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="dashboard"><a class="dash-item" href="#/plans/"><img src="img/dashboard_plans.png" alt="Plans" /><br>Plans</a><a class="dash-item" href="#/plans/new/"><img src="img/dashboard_share_plan.png" alt="Share Plan" /><br>Share Plan</a><a class="dash-item" href="#/users/search/"><img src="img/dashboard_search.png" alt="Search" /><br>Search</a><a class="dash-item" href="#/users/<%= user.username %>/"><img src="img/dashboard_profile.png" alt="Profile" /><br>Profile</a></div>');
  if (!opt_sb) return output.toString();
};
