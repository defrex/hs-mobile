// This file was automatically generated from listings.soy.
// Please don't edit this file by hand.

goog.provide('hs.tmpl.listings');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hs.tmpl.listings.Add = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<form id="new_listing"><input type="button" id="take_image" /><textarea id="description"></textarea><input type="text" id="price" /></form>');
  if (!opt_sb) return output.toString();
};
