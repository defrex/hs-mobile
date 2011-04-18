
goog.provide('hs.listings.forms.NewListing');

goog.require('frame.Form');
goog.require('frame.form.fields.TextField');

hs.listings.forms.NewListing = function(){
    this.q = 'form';

    this.fields = {
        image: new frame.form.fields.Field({
            q: '#image',
            required: true,
        }),
        description: new frame.form.fields.TextField({
            q: '#description',
            required: true,
            maxLength: 140
        }),
        price: new frame.form.fields.TextField({
            q: '#price',
            required: true
        })
    };

    frame.Form.call(this);
};
goog.inherits(hs.listings.forms.NewListing, frame.Form);
