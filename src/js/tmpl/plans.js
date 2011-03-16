// This file was automatically generated from plans.soy.
// Please don't edit this file by hand.

goog.provide('consy.tmpl.plans');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.plans.PlanList = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="plan-list"><h1>Plans</h1><ul></ul></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.plans.PlanListItem = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<img src="', soy.$$escapeHtml(opt_data.creator.avatar), '" class="avatar" /><a class="username" href="#', soy.$$escapeHtml(opt_data.creator.link), '">', soy.$$escapeHtml(opt_data.plan.creator), '</a>', soy.$$escapeHtml(opt_data.plan.what), '<div class="created">Created ', soy.$$escapeHtml(opt_data.plan.createdDisplay), '</div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.plans.PlanView = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="plan-view"><div class="user" /><img src="', soy.$$escapeHtml(opt_data.creator.avatar), '" class="avatar" /><a class="username" href="#', soy.$$escapeHtml(opt_data.creator.link), '">', soy.$$escapeHtml(opt_data.plan.creator), '</a></div><div class="plan-body"><div class="what">', soy.$$escapeHtml(opt_data.plan.what), '</div>', (opt_data.plan.where) ? '<div class="where">Where: ' + soy.$$escapeHtml(opt_data.plan.where) + '</div>' : '', (opt_data.plan.when) ? '<div class="when">When: ' + soy.$$escapeHtml(opt_data.plan.when) + '</div>' : '', '<div class="created">Created ', soy.$$escapeHtml(opt_data.plan.createdDisplay), '</div></div><div class="list-button comments">Comments</div><div class="list-button who">Who\'s In</div></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.plans.PlanNew = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="plan-new"><form><textarea name="what" placeholder="What are you doing later?"></textarea><input type="text" name="where" placeholder="Where (optional)" /><div class="list-button" id="when">When (optional)</div><div id="private"><label> Public<input type="radio" name="private" value="public" /></label><label> Private<input type="radio" name="private" value="private" /></label></div><div class="list-button" id="sms">Invite with SMS</div><div id="button-bar"><input type="submit" value="Share"/></div></form></div>');
  if (!opt_sb) return output.toString();
};
