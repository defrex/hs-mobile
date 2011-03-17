
goog.require('frame.Controller');
goog.require('frame.dom.Node');
goog.require('frame.View');
goog.require('hs.tmpl');

goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.jsunit');



var testController = function(){
    var doc = new frame.dom.Node(document);

    var View1 = function(){frame.View.apply(this, arguments)};
    goog.inherits(View1, frame.View);
    View1.prototype.requireAuth = false;
    View1.prototype.template = function(){return 'view1'};

    var View2 = function(){frame.View.apply(this, arguments)};
    goog.inherits(View2, frame.View);
    View2.prototype.requireAuth = false;
    View2.prototype.template = function(){return 'view2'};

    asyncTestCase.waitForAsync();
    frame.start({urls: [
        ['^/conTest/1/$', View1],
        ['^/conTest/2/$', View2]
    ]}, function(){
        assertTrue('controller started', frame.controller instanceof frame.Controller);
        doc.q('body').append(hs.tmpl.Main());
        frame.controller.goTo('/conTest/1/');
        setTimeout(function(){
            assertTrue('view1 loaded', doc.q('#main').html().indexOf('view1') > -1);
            frame.controller.goTo('/conTest/2/');
            setTimeout(function(){
                assertTrue('view2 loaded', doc.q('#main').html().indexOf('view2') > -1);
                asyncTestCase.continueTesting();
            }, 100);
        }, 100);
    });
}

var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();

