// This file was automatically generated from wait.soy.
// Please don't edit this file by hand.

goog.provide('consy.tmpl.ui');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.ui.Wait = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="wait"><img src="img/spinner.gif"/> ', soy.$$escapeHtml(opt_data.msg), '</div>');
  if (!opt_sb) return output.toString();
};
