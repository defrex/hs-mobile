// This file was automatically generated from users.soy.
// Please don't edit this file by hand.

goog.provide('consy.tmpl.users');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.users.UserView = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="user-view">', soy.$$escapeHtml(opt_data.user), '</div>');
  if (!opt_sb) return output.toString();
};
