
goog.provide('hs.listings.views');

goog.require('hs.tmpl.listings');
goog.require('frame.View');
goog.require('frame.apiRequest');
goog.require('hs.listings.fakeImage');

/** @constructor **/
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
hs.listings.views.Add.prototype.abButtons = [{
    position: 'right',
    text: 'Post',
    id: 'postListing'
}];

/**
* Set up event handlers after the DOM is loaded
* @type {function()}
**/
hs.listings.views.Add.prototype.enterDocument = function(){
    frame.View.prototype.enterDocument.call(this, Array.prototype.pop.call(arguments));

    //this.editable();
    this.placehold();

    frame.log('registering click handler');
    this.doc.q('#take_image').on('click', function(e){
        var v = this;
        frame.log('getting image');
        frame.log('nav.cam ' + typeof navigator.camera);

        var withImage = function(image){
            //v.doc.q('#image').attr('src', image);
            v.doc.q('#image').attr('src', 'data:image/jpeg;base64,'+image);
            v.doc.q('label[for="take_image"]').hide();
            v.imageData = image;
            v.doc.q('#take_image').attr('value', 'Retake');
        };

        if (typeof navigator.camera != 'undefined')
            navigator.camera.getPicture(withImage, function(){
                frame.log('navigator.camera #fail');
                withImage(hs.listings.fakeImage);
            }, {quality: 10});
        else
            withImage(hs.listings.fakeImage);
    }, this);

    // fastbutton these focus clicks
    this.doc.q('textarea, input[type=text]').on('click', function(e){
        e.preventDefault();
        frame.log('bustclick');
        e.target.focus();
    });

    this.doc.q('form').on('submit', function(e){
        e.preventDefault();
        this.submit();
    }, this);
    this.doc.q('#postListing').on('click', function(e){
        e.preventDefault();
        frame.log('postListing');
        this.submit();
    }, this);

};

/**
* Submit the form
* @type {function()}
**/
hs.listings.views.Add.prototype.submit = function(){
    var data = {
        'description': this.doc.q('#description').val(),
        'price': this.doc.q('#price').val(),
        'latitude': '43.6519',
        'longtitude': '-79.3736',
        'photo': this.imageData,
        'user': frame.store.get('userURI')
    };
    frame.log('submitting');
    frame.apiRequest({method: 'POST', path: '/api/v1/listing/', body: data},
        function(resp, status){
            frame.log('status: '+ status +', resp: '+ resp);
            if (status == 200){
                frame.controller.goTo('/thanks/');
            }
        }, this);
};



/** @constructor **/
hs.listings.views.Thanks = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));
};
goog.inherits(hs.listings.views.Thanks, frame.View);
hs.listings.views.Thanks.prototype.requireAuth = true;
hs.listings.views.Thanks.prototype.template = hs.tmpl.listings.Thanks;
