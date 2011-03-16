
test('consy.frame.Controller', function(){
    ok(consy.controller instanceof consy.frame.Controller, 'controller started');
    
    var View1 = function(){consy.frame.View.apply(this, arguments)};
    goog.inherits(View1, consy.frame.View);
    View1.prototype.requireAuth = false;
    View1.prototype.template = function(){return 'view1'};
    consy.urls.push(['^/conTest/1/$', View1]);
    
    var View2 = function(){consy.frame.View.apply(this, arguments)};
    goog.inherits(View2, consy.frame.View);
    View2.prototype.requireAuth = false;
    View2.prototype.template = function(){return 'view2'};
    consy.urls.push(['^/conTest/2/$', View2]);
    
    consy.controller.goTo('/conTest/1/');
    stop(500);
    setTimeout(function(){
        ok(doc.q('#main').html().indexOf('view1') > -1, 'view1 loaded');
        consy.controller.goTo('/conTest/2/');
        setTimeout(function(){
            ok(doc.q('#main').html().indexOf('view2') > -1, 'view2 loaded');
            start();
        }, 100);
    }, 100);
});

