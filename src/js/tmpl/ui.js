// This file was automatically generated from ui.soy.
// Please don't edit this file by hand.

goog.provide('hs.tmpl.ui');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
hs.tmpl.ui.ModalSpinner = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="modalbg" style="display:none;"></div><div class="dialog modal" id="modal-spinner" style="display:none;">', soy.$$escapeHtml(opt_data.text), '<br><img src="img/spinner_w-on-b.gif" /></div>');
  if (!opt_sb) return output.toString();
};
