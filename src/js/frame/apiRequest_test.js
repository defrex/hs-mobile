
goog.require('frame.apiRequest');

goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.jsunit');

var testApiRequest = function(){
    assertEquals('apiRequest exists', typeof frame.apiRequest, 'function');

    asyncTestCase.waitForAsync();
    frame.start({
        urls: [],
        apiServer: '127.0.0.1:8080'
    }, function(){
        frame.apiRequest({path: '/', auth: false}, function(resp, status){
            assertEquals('request returned 200', 200, status);
            asyncTestCase.continueTesting();
        });
    });

};

var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();
