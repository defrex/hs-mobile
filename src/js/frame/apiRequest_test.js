
goog.require('frame.apiRequest');

goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.jsunit');
goog.require('frame.dom.Node');

var setUp = function(){
    asyncTestCase.waitForAsync();
    frame.start({
        urls: [],
        apiServer: '127.0.0.1:8000'
    }, function(){
        asyncTestCase.continueTesting();
    });

};

var testApiRequestExists = function(){
    assertEquals('apiRequest exists', typeof frame.apiRequest, 'function');
};

var testApiRequestGET = function(){
    asyncTestCase.waitForAsync();

    frame.apiRequest({path: '/cors_test/', auth: false}, function(resp, status){
        assertEquals('GET returned 200', 200, status);
        asyncTestCase.continueTesting();
    });
};

var testApiRequestPOST = function(){
    asyncTestCase.waitForAsync();

    frame.apiRequest({path: '/cors_test/', auth: true, method: 'POST'},
            function(resp, status){
        assertEquals('POST returned 200', 200, status);

        asyncTestCase.continueTesting();
    });
};

var tearDown = function(){
    var doc = new frame.dom.Node(document);

    doc.q('#actionbar').remove();
    doc.q('#wrapper').remove();
};

var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();

