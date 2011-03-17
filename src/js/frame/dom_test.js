
goog.require('frame.dom.Node');
goog.require('hs.tmpl');

goog.require('goog.testing.jsunit');

var testDomNode = function(){
    assertEquals('Node exists', typeof frame.dom.Node, 'function');
    var doc = new frame.dom.Node(document);

    doc.q('body').append(hs.tmpl.Main());

    assertEquals('q func exists', typeof doc.q, 'function');

    assertEquals('id query', doc.q('#main').length, 1);
    assertEquals('tag name query', doc.q('body').length, 1);
    assertEquals('selector query', doc.q('div#main').length, 1);

    doc.q('#main').html('word');
    assert('Node.html', doc.q('#main').html().indexOf('word') > -1);

    doc.q('#main').append('2');
    assert('Node.append', doc.q('#main').html().indexOf('word2') > -1);

    doc.q('#main').prepend('3');
    assert('Node.prepend', doc.q('#main').html().indexOf('3word2') > -1);
};

