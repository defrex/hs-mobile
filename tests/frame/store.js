//depends: frame/store.js

test('consy.frame.store', function(){
    equals(typeof consy.frame.store, "object", "store exists");
    
    consy.frame.store.put('key', 'val');
    
    ok(consy.frame.store.has('key'), 'store has');
    
    equals(consy.frame.store.get('key'), 'val', 'store get');
    
    consy.frame.store.del('key');
    ok(!consy.frame.store.has('key'), 'store del');
    
    consy.frame.store.put('key', 'val');
    consy.frame.store.clear();
    ok(!consy.frame.store.has('key'), 'store clear');
});

