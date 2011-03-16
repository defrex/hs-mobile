
goog.require('consy.frame.Controller');
goog.require('consy.init');

consy.init(function() {
    consy.controller = new consy.frame.Controller();
    consy.controller.startHashChange();
});

