// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

goog.provide('hs.tmpl');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hs.tmpl.ActionBar = function(opt_data, opt_sb) {
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
hs.tmpl.Main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  hs.tmpl.ActionBar(opt_data, output);
  output.append('<div id="main"></div>');
  if (!opt_sb) return output.toString();
};
