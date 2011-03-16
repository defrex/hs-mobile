//depends: apps/plans/views.js, frame/route.js

test('consy.apps.plans.PlanList', function(){
    var viewStack = consy.controller.viewStack,
        PlanList = consy.apps.plans.PlanList,
        User = consy.apps.users.User;
    
    stop(500);
    User.login('test', 'passw0rd', function(){
        consy.controller.goTo('/plans/');
        setTimeout(function(){
            var planList = viewStack[viewStack.length-1];
            ok(planList instanceof PlanList, 'routed to plans');
            start();
        }, 200);
    });
});

