
goog.require('frame.store');

goog.require('goog.testing.jsunit');

var testStore = function(){
    assertEquals("store exists", typeof frame.store, "object");

    frame.store.put('key', 'val');

    assert('store has', frame.store.has('key'));

    assertEquals('store get', frame.store.get('key'), 'val');

    frame.store.del('key');
    assert('store del', !frame.store.has('key'));

    frame.store.put('key', 'val');
    frame.store.clear();
    assert('store clear', !frame.store.has('key'));
};

