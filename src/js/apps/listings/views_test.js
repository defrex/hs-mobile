
goog.require('hs.init');
goog.require('hs.listings.views');
goog.require('frame.init');
goog.require('frame.dom.Node');

goog.require('goog.testing.jsunit');
goog.require('goog.testing.AsyncTestCase');


var testViewAdd = function(){
    asyncTestCase.waitForAsync();
    frame.init(function(){
        frame.controller.goTo('/');
        setTimeout(function(){
            var doc = new frame.dom.Node(document);

            assert('image button', doc.q('.take_image').length > 0);
            assert('desc field', doc.q('.description').length > 0);
            assert('price field', doc.q('.price').length > 0);

            asyncTestCase.continueTesting();
        }, 100);
    });
};

var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();