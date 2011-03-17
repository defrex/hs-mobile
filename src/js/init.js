
goog.require('frame.start');
goog.require('hs.urls');
goog.require('hs.tmpl');

frame.start({
    urls: hs.urls,
    apiServer: '127.0.0.1:8080'
}, function(){
    frame.controller.doc.q('body').append(hs.tmpl.Main());
});

