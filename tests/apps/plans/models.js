//depends: apps/plans/models.js

test('consy.apps.plans.Plan', function(){
    var Plan = consy.apps.plans.Plan,
        User = consy.apps.users.User,
        Model = consy.frame.Model,
        ModelList = consy.frame.ModelList;
    ok(new Plan() instanceof Model, 'Plan model exists');
    stop(1000);
    User.login('test', 'passw0rd', function(){
        Plan.getList(function(plans, status){
            equal(status, 200, 'got 200 of request');
            ok(typeof plans != 'undefined', 'got plans');
            ok(plans instanceof ModelList, 'plans is ModelList');
            start();
        });
    });
});

