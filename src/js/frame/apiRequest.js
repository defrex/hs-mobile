//depends: frame/main.js, frame/store.js

goog.provide('consy.frame.apiRequest');

goog.require('consy.frame.store');

/**
* Issue a request to the API server.
* if options is a string, it's treated as a path.
* @param {Object} options {
    path: string required,
    auth: boolean optional default: true,
    method: string optional default: 'GET',
    body: [string|Object] optional Object will to json encoded
    post: Object optional POST arguments, only valid is method = 'POST'
    cache: boolean optional default: true use cached GET response
* }.
* @param {function(Object, number)} clbk optional. request complete callback,
*     should take a json response body, and a status code.
**/
consy.frame.apiRequest = function(o, clbk) {
    if (typeof o == 'undefined')
        throw ('no arguments passed to apiRequest');
    else if (typeof o == 'string')
        o = {path: o};
    else if (typeof o.path != 'string')
        throw ('no path passed to apiRequest');

    if (typeof o.auth == 'undefined') o.auth = true;
    o.method = o.method || 'GET';
    o.method = o.method.toUpperCase();
    if (o.method == 'GET' && (typeof o.cache == 'undefined' || o.cache)
            && clbk && consy.frame.store.has(o.path)) {
        clbk(consy.frame.store.get(o.path));
        return;
    }

    if (typeof o.body == 'object')
        o.body = JSON.stringify(o.body);

    o.path = consy.API_SERVER + o.path;

    if (o.auth && !consy.frame.store.has('token')) {
        consy.controller.authReset();
        if (clbk) clbk();
        return;
    }

    var req = new XMLHttpRequest();
    req.open(o.method, o.path);

    if (o.auth)
        req.setRequestHeader('Authenticate',
                'Token auth=' + consy.frame.store.get('token'));

    if (clbk) req.onreadystatechange = function() {
        if (req.readyState == 4) {
            var resp;
            try {
                resp = JSON.parse(req.responseText);
            }catch (e) {
                resp = req.responseText;
            }
            clbk(resp, req.status);
        }
    };
    req.send(o.body);
};

