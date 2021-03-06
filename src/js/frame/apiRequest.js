//depends: frame/main.js, frame/store.js

goog.provide('frame.apiRequest');

goog.require('frame.store');
goog.require('frame.Controller');
goog.require('goog.uri.utils');

/**
* Issue a request to the API server.
* if options is a string, it's treated as a path.
* @param {Object} options {
    path: string required,
    auth: boolean optional default: true,
    method: string optional default: 'GET',
    body: [string|Object] optional Object will to json encoded,
    post: Object optional POST arguments, only valid is method = 'POST',
    cache: boolean optional default: true use cached GET response,
* }.
* @param {function(Object, number)} clbk optional. request complete callback,
*     should take a json response body, and a status code.
**/
frame.apiRequest = function(o, clbk, that) {
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
            && clbk && frame.store.has(o.path)) {
        if (clbk) clbk.call(that, frame.store.get(o.path), 222);
        return;
    }

    if (typeof o.body == 'object')
        o.body = JSON.stringify(o.body);
    else if(o.method == 'POST' && o.post)
        o.body = goog.uri.utils.buildQueryDataFromMap(o.post);

    o.path = 'http://'+frame.controller.settings.apiServer+o.path;

    if (o.auth && !frame.store.has('token')) {
        frame.controller.authReset();
        if (clbk) clbk.call(that, 'no token', 0);
        return;
    }

    var req = new XMLHttpRequest();
    req.open(o.method, o.path);

    if (o.auth) req.setRequestHeader('Authorization', 
            'Token '+frame.store.get('token'));

    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (typeof o.headers != 'undefined')
        for (header in o.headers)
            req.setRequestHeader(header, o.headers[header]);

    if (clbk) req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 500 && frame.DEBUG){
                var erframe = document.createElement('iframe'),
                    doc = new frame.dom.Node(document);
                doc.q('body').append(erframe);
                
                goog.style.setStyle(erframe, 'position', 'absolute');
                goog.style.setStyle(erframe, 'top', '5%');
                goog.style.setStyle(erframe, 'left', '50%');
                goog.style.setStyle(erframe, 'width', '90%');
                goog.style.setStyle(erframe, 'height', '90%');
                goog.style.setStyle(erframe, 'marginLeft', '-45%');
                goog.style.setStyle(erframe, 'zIndex', '10000');
                erframe.setAttribute('id', 'errorframe');

                var fDoc = erframe.document;
                if (erframe.contentDocument)// for moz
                    fDoc = erframe.contentDocument;
                fDoc.open();
                fDoc.writeln(req.responseText);
                fDoc.close();

                doc.q('body').append('<a href="#" id="errorclose">X</a>');
                doc.q('#errorclose')
                    .style('position', 'absolute')
                    .style('top', '0')
                    .style('right', '0')
                    .style('fontSize', '20px')
                    .style('padding', '5px')
                    .on('click', function(e){
                        doc.q('#errorframe').remove();
                        doc.q('#errorclose').remove();
                    });
            }else if(req.status == 401 || req.status == 403){
                setTimeout(function(){frame.controller.authReset()}, 0);
            }
            var resp;
            try {
                resp = JSON.parse(req.responseText);
            }catch (e) {
                resp = req.responseText;
            }
            clbk.call(that, resp, req.status, req);
        }
    };
    
    req.send(o.body);
};
