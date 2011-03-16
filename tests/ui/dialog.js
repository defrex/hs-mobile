
test('consy.ui.dialog.Wait', function(){
    var text = 'foobar';
    var wait = new consy.ui.dialog.Wait(text);
    
    wait.display();
    ok(doc.q('body').html().indexOf(text) > 0, 'text is displayed');
    
    wait.remove();
    ok(doc.q('body').html().indexOf(text) < 0, 'text is not displayed');
});

