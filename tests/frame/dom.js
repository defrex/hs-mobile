
test('frame.dom', function(){
    equal(typeof frame.dom.Node, 'function', 'Node exists');
    var doc = new frame.dom.Node(document);

    equal(typeof doc.q, 'function', 'q func exists');

    equal(doc.q('#main').length, 1, 'id query');
    equal(doc.q('body').length, 1, 'tag name query');
    equal(doc.q('div#main').length, 1, 'selector query');

    doc.q('#main').html('word');
    ok(doc.q('#main').html().indexOf('word') > -1, 'Node.html');

    doc.q('#main').append('2');
    ok(doc.q('#main').html().indexOf('word2') > -1, 'Node.append');

    doc.q('#main').prepend('3');
    ok(doc.q('#main').html().indexOf('3word2') > -1, 'Node.prepend');
});

