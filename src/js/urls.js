
goog.provide('hs.urls');

goog.require('hs.listings.views')

/**
* urls for routing to View objects
* @type {Array.<Array.<String, frame.View>>}
**/
hs.urls = [
    ['^/$', hs.listings.views.Add],
    ['^thanks/$', hs.listings.views.Thanks]
];
