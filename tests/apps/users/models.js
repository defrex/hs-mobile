//depends: apps/users/models.js

test('consy.apps.users.models.User', function(){
    var User = consy.apps.users.User;
    
    stop(1000);
    User.login('test', 'passw0rd', function(user){
        start();
        equal(typeof user, 'object', 'User returned');
        equal(user.username, 'test', 'returned correct user object');
    });
});

