
goog.provide('frame');
goog.provide('frame.init');
goog.provide('frame.log');

goog.require('PhoneGap');

/** @define {string} Platform constant, filled at compile-time *.*/
frame.PLATFORM = 'ios';

/** @define {boolean} Debug mode *.*/
frame.DEBUG = true;

/** @define {string} domain for the API server *.*/
frame.API_SERVER = '';

frame.log = function() {
    if (frame.PLATFORM == 'ios')
        alert(arguments[0]);
    if (frame.DEBUG && console.log != undefined)
        console.log.apply(window.console, arguments);
};
frame.warn = function() {
    if (frame.DEBUG && console.warn != undefined)
        console.warn.apply(window.console, arguments);
};
frame.info = function() {
    if (frame.DEBUG && console.info != undefined)
        console.info.apply(window.console, arguments);
};

frame.init = (function() {
    var toLoad = new Array(),
        loaded = false;

    window.onload = function(){
        if (!PhoneGap.onDeviceReady.fired && false){
            document.addEventListener('deviceready', load, false);
        }else{
            load();
        }
    };

    function load() {
        frame.log('load fire');
        loaded = true;
        for (var i=0, len=toLoad.length; i<len; i++)
            toLoad[i][0].call(toLoad[i][1]);
    };

    return function(fn, that) {
        if (!loaded) toLoad.push([fn, that]);
        else fn.call(that);
    }
})();
