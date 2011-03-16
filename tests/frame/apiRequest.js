//depends: frame/apiRequest.js

test('consy.frame.apiRequest', function(){
    equal(typeof consy.frame.apiRequest, 'function', 'apiRequest exists');
    stop(5000);
    consy.frame.apiRequest({path: '/', auth: false}, function(resp, status){
        start();
        equal(status, 200, 'request returned 200');
    });
});

