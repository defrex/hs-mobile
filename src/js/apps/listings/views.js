
goog.provide('hs.listings.views');

goog.require('hs.tmpl.listings');
goog.require('frame.View');


hs.listings.views.Add = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));

};
goog.inherits(hs.listings.views.Add, frame.View);

/**
* only allow authed users to see this view
* @type {boolean}
**/
frame.View.prototype.requireAuth = true;

/**
* display Action Bar
* @type {boolean}
**/
frame.View.prototype.actionBar = true;

/**
* The view's template
* @type {function()}
**/
frame.View.prototype.template = hs.tmpl.listings.Add;
