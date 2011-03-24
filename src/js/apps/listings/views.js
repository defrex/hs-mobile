
goog.provide('hs.listings.views');

goog.require('hs.tmpl.listings');
goog.require('frame.View');
goog.require('PhoneGap');

/*
* @constructor
*/
hs.listings.views.Add = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));

};
goog.inherits(hs.listings.views.Add, frame.View);

/**
* only allow authed users to see this view
* @type {boolean}
**/
hs.listings.views.Add.prototype.requireAuth = true;

/**
* display Action Bar
* @type {boolean}
**/
hs.listings.views.Add.prototype.actionBar = true;

/**
* The view's template
* @type {function()}
**/
hs.listings.views.Add.prototype.template = hs.tmpl.listings.Add;

/**
* define buttons.
* @type {Object.<string, Array.<string, function()>>}
**/
hs.listings.views.Add.prototype.abButtons = [
    {
        position: 'right',
        text: 'Post',
        id: 'postListing'
    }
];

/**
* Set up event handlers after the DOM is loaded
* @type {function()}
**/
hs.listings.views.Add.prototype.enterDocument = function(){
    frame.View.prototype.enterDocument.call(this, Array.prototype.pop.call(arguments));

    this.placehold();

    this.doc.q('#take_image').on('click', function(e){
        var v = this;
        frame.log('getting image');
        navigator.camera.getPicture(function(image){
            v.doc.q('#image').attr('src', 'data:image/jpeg;base64,'+image);
            v.imageData = image;
            v.doc.q('#take_image').attr('value', 'Retake');
        }, function(){
            frame.log('#fail')
        }, {
            quality: 100
        });
    }, this);

};
