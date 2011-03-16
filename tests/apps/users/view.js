//depends: apps/users/views.js

test('consy.apps.users.Login', function(){
    consy.frame.store.clear();
    var User = consy.apps.users.User;
    
    stop(500);
    User.get('test123453456', function(user){
        equal(typeof user, 'undefined', 'User not returned');
        setTimeout(function(){
            start()
            equal(doc.q('form').length, 1, 'login form loaded');
        }, 200);
    });
});


test('consy.apps.users.Logout', function(){
    consy.frame.store.clear();
    var User = consy.apps.users.User;
    
    stop(500);
    User.login('test', 'passw0rd', function(user){
        ok(user instanceof User, 'logged in');
        consy.controller.goTo('/');
        setTimeout(function(){
            equal(doc.q('form.login').length, 0, 'login not form loaded');
            consy.controller.goTo('/logout/');
            setTimeout(function(){
                equal(doc.q('form.login').length, 1, 'login form loaded');
                start();
            }, 200);
        }, 200);
    });
});

