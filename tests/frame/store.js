//depends: frame/store.js

test('frame.store', function(){
    equals(typeof frame.store, "object", "store exists");

    frame.store.put('key', 'val');

    ok(frame.store.has('key'), 'store has');

    equals(frame.store.get('key'), 'val', 'store get');

    frame.store.del('key');
    ok(!frame.store.has('key'), 'store del');

    frame.store.put('key', 'val');
    frame.store.clear();
    ok(!frame.store.has('key'), 'store clear');
});

