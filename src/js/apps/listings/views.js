
goog.provide('hs.listings.views');

goog.require('frame.View');
goog.require('frame.apiRequest');
goog.require('hs.tmpl.listings');
goog.require('hs.listings.fakeImage');
goog.require('hs.ui.ModalSpinner');

/** @constructor **/
hs.listings.views.Add = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));

    var view = this;
    navigator.geolocation.getCurrentPosition(function(pos){
        frame.log('got position');
        view.location = pos;
    }, function(){
        // location error
        frame.log('position error');
        view.location = null;
    });
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

    this.placehold();

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
            }, {quality: 50});
        else
            withImage(hs.listings.fakeImage);
    }, this);

    this.doc.q('form').on('submit', this.submit, this);
    this.doc.q('#postListing').on('click', this.submit, this);
};

/**
* Submit the form
* @type {function()}
**/
hs.listings.views.Add.prototype.submit = function(e){
    if (e) e.preventDefault();
    if (this.waiting) return;

    this.data = {
        description: this.doc.q('#description').val(),
        price: this.doc.q('#price').val().replace('$', '')
    };
    if (!this.isValid()) return;

    this.wait();
    var view = this;
    (function haveLocation(){
        if (typeof view.location != 'undefined'){
            if (view.location == null) return
            else view.post();
        }else
            setTimeout(haveLocation, 100);
    })();
};

hs.listings.views.Add.prototype.wait = function(stop){
    this.waiting = !(stop === false);
    frame.log('waiting', this.waiting);
    if (this.waiting && typeof this.spinner == 'undefined')
        this.spinner = new hs.ui.ModalSpinner().show();
    else if (!this.waiting && typeof this.spinner != 'undefined')
        this.spinner.remove();
};

hs.listings.views.Add.prototype.post = function(){
    frame.log('posting');
    frame.apiRequest({
        method: 'POST', 
        path: '/api/v1/listing/', 
        body: {
            'description': this.data.description,
            'price': this.data.price,
            'latitude': this.location.coords.latitude+'',
            'longitude': this.location.coords.longitude+'',
            'photo': this.imageData,
            'user': frame.store.get('userURI')
        }
    }, function(resp, status){
        frame.log('status: '+ status +', resp: '+ resp);
        this.wait(false);
        if (status == 201) frame.controller.goTo('/thanks/');
    }, this);
};

hs.listings.views.Add.prototype.isValid = function(){
    if (!(/^\d+$/.test(this.data.price))){
        this.doc.q('#price').alert();
        return false;
    }
    return true;
};



/** @constructor **/
hs.listings.views.Thanks = function(){
    frame.View.call(this, Array.prototype.pop.call(arguments));
};
goog.inherits(hs.listings.views.Thanks, frame.View);
hs.listings.views.Thanks.prototype.requireAuth = true;
hs.listings.views.Thanks.prototype.template = hs.tmpl.listings.Thanks;
hs.listings.views.Thanks.prototype.abButtons = [{
    position: 'right',
    text: 'New',
    id: 'postNew'
}];

hs.listings.views.Thanks.prototype.enterDocument = function(){
    frame.View.prototype.enterDocument.call(this, Array.prototype.pop.call(arguments));

    this.doc.q('#postAgain').on('click', function(){
        frame.controller.goTo('/');
    });
};
