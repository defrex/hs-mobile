// This file was automatically generated from widgets.datetime.soy.
// Please don't edit this file by hand.

goog.provide('consy.tmpl.ui.widgets');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
consy.tmpl.ui.widgets.DateTime = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="widget datetime"><h1>Day</h1><div class="button-row toggle"><div id="day-today" class="button goog-css3-toggle-button goog-css3-button-collapse-right goog-css3-button">Today</div><div id="day-tomorrow" class="button goog-css3-toggle-button goog-css3-button-collapse-left goog-css3-button">Tomorrow</div></div><h1>Hour</h1><div class="button-row toggle"><div id="m-am" class="button goog-css3-toggle-button goog-css3-button-collapse-right goog-css3-button">AM</div><div id="m-pm" class="button goog-css3-toggle-button goog-css3-button-collapse-left goog-css3-button">PM</div></div><div class="button-row"><div id="hour-1" class="button goog-css3-toggle-button goog-css3-button">1</div><div id="hour-2" class="button goog-css3-toggle-button goog-css3-button">2</div><div id="hour-3" class="button goog-css3-toggle-button goog-css3-button">3</div><div id="hour-4" class="button goog-css3-toggle-button goog-css3-button">4</div></div><div class="button-row"><div id="hour-5" class="button goog-css3-toggle-button goog-css3-button">5</div><div id="hour-6" class="button goog-css3-toggle-button goog-css3-button">6</div><div id="hour-7" class="button goog-css3-toggle-button goog-css3-button">7</div><div id="hour-8" class="button goog-css3-toggle-button goog-css3-button">8</div></div><div class="button-row"><div id="hour-9" class="button goog-css3-toggle-button goog-css3-button">9</div><div id="hour-10" class="button goog-css3-toggle-button goog-css3-button">10</div><div id="hour-11" class="button goog-css3-toggle-button goog-css3-button">11</div><div id="hour-12" class="button goog-css3-toggle-button goog-css3-button">12</div></div><h1>Minute</h1><div class="button-row"><div id="minute-0" class="button goog-css3-toggle-button goog-css3-button">0</div><div id="minute-15" class="button goog-css3-toggle-button goog-css3-button">15</div><div id="minute-30" class="button goog-css3-toggle-button goog-css3-button">30</div><div id="minute-45" class="button goog-css3-toggle-button goog-css3-button">45</div></div></div>');
  if (!opt_sb) return output.toString();
};
