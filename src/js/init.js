
goog.require('frame.start');
goog.require('hs.urls');
goog.require('hs.tmpl');

frame.start(hs.urls, function(){
    frame.controller.doc.q('body').append(hs.tmpl.Main());
});

