
goog.provide('frame.store');

goog.require('frame.storeBack.LocalStore');
goog.require('frame.storeBack.Mem');

frame.store = (function() {
    /** prioritised list of backends **/
    var backends = [
        frame.storeBack.LocalStore,
        frame.storeBack.Mem
    ];
    var backend;
    var getBackend = function() {
        if (typeof backend == 'undefined')
            for (var i = 0; i < backends.length; i++)
                if (backends[i].isAvailable()) {
                    backend = new backends[i]();
                    break;
                }
        return backend;
    }
    return {
        has: function(key) {return getBackend().has(key);},
        get: function(key) {return getBackend().get(key);},
        put: function(key, value) {return getBackend().put(key, value);},
        del: function(key) {return getBackend().del(key);},
        clear: function() {return getBackend().clear();}
    };
})();

