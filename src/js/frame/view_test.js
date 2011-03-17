
goog.require('frame.View');

goog.require('goog.testing.jsunit');

var testView = function(){
    assertEquals('View exists', typeof frame.View, 'function');
}