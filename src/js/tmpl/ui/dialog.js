// This file was automatically generated from dialog.soy.
// Please don't edit this file by hand.

goog.provide('consy.tmpl.ui.dialog');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.ui.dialog.Wait = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="dialog wait"><img src="img/spinner.gif"/> ', soy.$$escapeHtml(opt_data.body), '</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.ui.dialog.Toast = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="dialog toast">', soy.$$escapeHtml(opt_data.body), '</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.ui.dialog.Dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="dialog"><div class="body">', soy.$$escapeHtml(opt_data.body), '</div><div class="buttons">');
  var buttonNameList78 = opt_data.buttonNames;
  var buttonNameListLen78 = buttonNameList78.length;
  for (var buttonNameIndex78 = 0; buttonNameIndex78 < buttonNameListLen78; buttonNameIndex78++) {
    var buttonNameData78 = buttonNameList78[buttonNameIndex78];
    output.append('<div class="button goog-css3-button">', soy.$$escapeHtml(buttonNameData78), '</div>');
  }
  output.append('</div></div>');
  if (!opt_sb) return output.toString();
};
