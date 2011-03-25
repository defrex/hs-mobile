
goog.require('hs.listings.models');
goog.require('hs.init');
goog.require('frame.init');

goog.require('goog.testing.jsunit');
goog.require('goog.testing.AsyncTestCase');

console.log('models_test');

var testModelFetch = function(){
    asyncTestCase.waitForAsync();
    hs.listings.models.Listing.get({'id': 1}, function(listing){
        assert('listing returned', listing instanceof hs.listings.models.Listing);
        asyncTestCase.continueTesting();
    }, this);
};


var testModelSave = function(){
    frame.init(function(){
        var listing = new hs.listings.models.Listing();

        listing.field('description', 'desc value');
        listing.field('price', 50);

        assert('correct price', listing.field('price') == 50);

        assert('unsaved',listing.unsaved === true);

        asyncTestCase.waitForAsync();
        listing.save(function(){
            assert('saved', listing.unsaved === false);
            assert('id set', typeof listing.field('id') == 'number');

            asyncTestCase.continueTesting();
        }, this);
    }, this);
};

var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();
