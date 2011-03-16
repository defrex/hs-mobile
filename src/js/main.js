
goog.provide('consy');
goog.provide('consy.init');
goog.provide('consy.log');

/** @define {string} Platform constant, filled at compile-time *.*/
consy.PLATFORM = 'mobile-web';

/** @define {boolean} Debug mode *.*/
consy.DEBUG = true;

/** @define {string} domain for the API server *.*/
consy.API_SERVER = '';

consy.log = function() {
    if (consy.DEBUG && console.log != undefined)
        console.log.apply(window.console, arguments);
};
consy.warn = function() {
    if (consy.DEBUG && console.warn != undefined)
        console.warn.apply(window.console, arguments);
};

consy.init = (function() {
    var toLoad = new Array();
    window.onload = function() {
        for (var i = 0; i < toLoad.length; i++) toLoad[i]();
    };
    return function(fn) {toLoad.push(fn);}
})();

