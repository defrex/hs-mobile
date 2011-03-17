
goog.require('frame.form.fields.Field');
goog.require('frame.Form');
goog.require('frame.form.fields.TextField');

goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.jsunit');

var testFormField = function(){
    var Field = frame.form.fields.Field;

    var f = new Field({
        q: '#textTest',
        required: true
    });

    assertEquals('validate method exists', typeof f.validate, 'function');
    assertEquals('display method exists', typeof f.displayError, 'function');

    asyncTestCase.waitForAsync();
    f.validate(function(valid, error){
        assert('field is not valid', !valid);
        asyncTestCase.continueTesting();
    });
};

var testTextField = function(){
    var TextField = frame.form.fields.TextField,
        doc = new frame.dom.Node(document);

    doc.q('#tests').html('<form><input type="text" id="textTest"/></form>');

    var tf = new TextField({
        q: '#textTest',
        required: true,
        maxLength: 140
    });

    assertEquals('validate method exists', typeof tf.validate, 'function');
    assertEquals('display method exists', typeof tf.displayError, 'function');

    asyncTestCase.waitForAsync();
    tf.validate(function(valid, error){
        assert('field is not valid', !valid);
        tf.displayError(function(el, er, cb){el.before(er, cb);}, function(){
            assert('error displayed', doc.q('#tests').html().indexOf(tf.error) > 0);
            asyncTestCase.continueTesting();
        });
    });
};


var testForm = function(){
    var Form = frame.Form,
        TextField = frame.form.fields.TextField,
        doc = new frame.dom.Node(document);

    doc.q('#tests').html('<form><input type="text" id="textTest"/></form>');

    var MyForm = function(){
        this.q = 'form';

        this.fields = {
            textTest: new TextField({
                q: '#textTest',
                required: true,
                maxLength: 140
            })
        };

        frame.Form.call(this);
    };
    goog.inherits(MyForm, frame.Form);

    var myForm = new MyForm();

    asyncTestCase.waitForAsync();
    myForm.validate(function(valid, errors){
        assertFalse('form invalid', valid);
        assertEquals('field error exists', 'string', typeof errors.textTest);
        myForm.displayErrors(function(){
            assert('error displayed', doc.q('#tests').html().indexOf(errors.textTest) > 0);
            asyncTestCase.continueTesting();
        });
    });
};

var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();
