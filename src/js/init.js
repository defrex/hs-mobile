
goog.provide('hs.init');

goog.require('frame.start');
goog.require('hs.urls');

setTimeout(function(){
    frame.start({
        urls: hs.urls,
        apiServer: 'dev.hipsell.com',//'0.0.0.0:8000',
        on403: function(){
            this.clear();
            this.goTo('/login/');
        },
        isAuthenticated: function(){
            if (!frame.store.has('email'))
                return false;
            else
                return true;
        }
    });
}, 0);
