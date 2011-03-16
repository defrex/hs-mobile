//depends: frame/apiRequest.js

test('frame.apiRequest', function(){
    equal(typeof frame.apiRequest, 'function', 'apiRequest exists');
    stop(5000);
    frame.apiRequest({path: '/', auth: false}, function(resp, status){
        start();
        equal(status, 200, 'request returned 200');
    });
});

