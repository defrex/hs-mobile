
goog.provide('frame');
goog.provide('frame.init');
goog.provide('frame.log');

/** @define {string} Platform constant, filled at compile-time *.*/
frame.PLATFORM = 'ios';

/** @define {boolean} Debug mode *.*/
frame.DEBUG = true;

/** @define {string} domain for the API server *.*/
frame.API_SERVER = '';

frame.log = function() {
    if (frame.DEBUG && console.log != undefined)
        console.log.apply(window.console, arguments);
};
frame.warn = function() {
    if (frame.DEBUG && console.warn != undefined)
        console.warn.apply(window.console, arguments);
};

frame.init = (function() {
    var toLoad = new Array(),
        loaded = false;
    window.onload = function() {
        for (var i=0, len=toLoad.length; i<len; i++)
            toLoad[i][0].call(toLoad[i][1]);
        loaded = true;
    };
    return function(fn, that) {
        if (!loaded) toLoad.push([fn, that]);
        else fn.call(that);
    }
})();

