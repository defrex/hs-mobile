
goog.provide('hs.ui.ModalSpinner');

goog.require('frame.dom.Node');
goog.require('hs.tmpl.ui');

hs.ui.ModalSpinner = function(text){
    this.doc = new frame.dom.Node(document);
    this.rendered = false;
    this.text = text || 'Loading...';
}

hs.ui.ModalSpinner.prototype.render = function(){
    this.doc.q('body').append(hs.tmpl.ui.ModalSpinner({text:this.text}));
    this.rendered = true;
    return this;
};

hs.ui.ModalSpinner.prototype.show = function(){
    if (!this.rendered) this.render();
    // this.doc.q('.modalbg').show();
    this.doc.q('#modal-spinner').show();
    return this;
};

hs.ui.ModalSpinner.prototype.hide = function(){
    if (!this.rendered) return this;
    // this.doc.q('.modalbg').hide();
    this.doc.q('#modal-spinner').hide();
    return this;
};

hs.ui.ModalSpinner.prototype.remove = function(){
    if (!this.rendered) return this;
    // this.doc.q('.modalbg').remove();
    this.doc.q('#modal-spinner').remove();
    return this;
};


