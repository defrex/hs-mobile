
goog.provide('frame');
goog.provide('frame.init');
goog.provide('frame.log');

/** @define {boolean} Debug mode *.*/
frame.DEBUG = true;

frame.log = function() {
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

    var load = function() {
        loaded = true;
        for (var i=0, len=toLoad.length; i<len; i++)
            toLoad[i][0].call(toLoad[i][1]);
    };

    window.onload = function(){
        if (typeof PhoneGap != 'undefined'){
            document.addEventListener('deviceready', load, false);
        }else{
            load();
        }
    };

    return function(fn, that) {
        if (!loaded){
            toLoad.push([fn, that]);
        }else {
            fn.call(that);
        }
    }
})();

