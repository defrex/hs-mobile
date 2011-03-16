
test('frame.form.fields.Field', function(){
    console.log(frame);
    var Field = frame.form.fields.Field;

    var f = new Field({
        q: '#textTest',
        required: true
    });

    equal(typeof f.validate, 'function', 'validate method exists');
    equal(typeof f.displayError, 'function', 'display method exists');

    stop(500);
    f.validate(function(valid, error){
        ok(!valid, 'field is not valid');
        start();
    });
});

test('frame.form.fields.TextField', function(){
    var TextField = frame.form.fields.TextField,
        doc = new frame.dom.Node(document);

    doc.q('#tests').html('<form><input type="text" id="textTest"/></form>');

    var tf = new TextField({
        q: '#textTest',
        required: true,
        maxLength: 140
    });

    equal(typeof tf.validate, 'function', 'validate method exists');
    equal(typeof tf.displayError, 'function', 'display method exists');

    stop(500);
    tf.validate(function(valid, error){
        ok(!valid, 'field is not valid');
        tf.displayError(function(el, er, cb){el.before(er, cb);}, function(){
            ok(doc.q('#tests').html().indexOf(tf.error) > 0, 'error displayed');
            start();
        });
    });
});


test('frame.Form', function(){
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

    stop(500);
    myForm.validate(function(valid, errors){
        equal(valid, false, 'form invalid');
        equal(typeof errors.textTest, 'string', 'field error exists');
        myForm.displayErrors(function(){
            ok(doc.q('#tests').html().indexOf(errors.textTest) > 0,
                    'error displayed');
            start();
        });
    });
});

