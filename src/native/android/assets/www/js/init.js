
goog.provide('hs.init');

goog.require('frame.start');
goog.require('hs.urls');

frame.start({
    urls: hs.urls,
    apiServer: '127.0.0.1:8080',
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

