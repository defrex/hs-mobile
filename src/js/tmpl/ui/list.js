// This file was automatically generated from list.soy.
// Please don't edit this file by hand.

goog.provide('consy.tmpl.ui.list');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.ui.list.ListItemLoading = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<li id="', opt_data.id, '"><img src="img/spinner.gif"/></li>');
  if (!opt_sb) return output.toString();
};
