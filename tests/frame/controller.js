
test('frame.Controller', function(){
    var doc = new frame.dom.Node(document);

    ok(frame.controller instanceof frame.Controller, 'controller started');

    var View1 = function(){frame.View.apply(this, arguments)};
    goog.inherits(View1, frame.View);
    View1.prototype.requireAuth = false;
    View1.prototype.template = function(){return 'view1'};
    hs.urls.push(['^/conTest/1/$', View1]);

    var View2 = function(){frame.View.apply(this, arguments)};
    goog.inherits(View2, frame.View);
    View2.prototype.requireAuth = false;
    View2.prototype.template = function(){return 'view2'};
    hs.urls.push(['^/conTest/2/$', View2]);

    frame.controller.urls = hs.urls;

    frame.controller.goTo('/conTest/1/');
    stop(500);
    setTimeout(function(){
        ok(doc.q('#main').html().indexOf('view1') > -1, 'view1 loaded');
        frame.controller.goTo('/conTest/2/');
        setTimeout(function(){
            ok(doc.q('#main').html().indexOf('view2') > -1, 'view2 loaded');
            start();
        }, 100);
    }, 100);
});

