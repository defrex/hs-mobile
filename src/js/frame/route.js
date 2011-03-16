
goog.provide('consy.frame.route');

goog.require('consy.urls');

consy.frame.route = function(url, passed_args, urls) {
    urls = urls || consy.urls;
    for (var i = 0; i < urls.length; i++) {
        var reg = typeof urls[i][0] == 'string' ? new RegExp(urls[i][0]) : urls[i][0];
        var args = reg.exec(url);
        if (args !== null) {
            args.shift();
            if (typeof passed_args == 'array')
                args.concat(passed_args);
            consy.controller.push(urls[i][1], args);
            return true;
        }
    }
    return false;
};

consy.frame.route.include = function(urls) {
    return function() {
        consy.frame.route(this[0], Array.prototype.slice.call(arguments, 0), urls);
    };
};

