// This file was automatically generated from auth.soy.
// Please don't edit this file by hand.

goog.provide('consy.tmpl.auth');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.auth.Login = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="auth login"><img src="img/auth_logo.png" alt="Connectsy" class="auth_logo"/><form class="login"><ul><li><input type="text" name="username" placeholder="username"/></li><li><input type="password" name="password" placeholder="password"/></li><li><a href="#/signup/">Sign Up</a> or <input type="button" name="submit" value="Login"/></li></ul></form></div>');
  if (!opt_sb) return output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.auth.SignUp = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="auth signup"><img src="img/auth_logo.png" alt="Connectsy" class="auth_logo"/><form class="signup"><ul><li><input type="text" name="username" placeholder="username"/></li><li><input type="password" name="password" placeholder="password"/></li><li><input type="password" name="password2" placeholder="password  (again)"/></li><li><a href="#/login/">Log In</a> or <input type="button" name="submit" value="Sign Up"/></li></ul></form></div>');
  if (!opt_sb) return output.toString();
};
