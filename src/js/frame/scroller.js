
goog.provide('frame.Scroller');

goog.require('frame.dom.Node');
goog.require('frame.utils');
goog.require('goog.style');

/** @constructor */
frame.Scroller = function(element){
    // document.body.addEventListener('touchmove', function(e) {
    //     e.preventDefault();
    //     frame.log('prevented scroll');
    // }, false);

    this.element = element;
    this.startTouchY = 0;
    this.animateTo(0);
    this.doc = new frame.dom.Node(document);
    this.enabled = true;

    var scrl = this,
        vpHeight = window.innerHeight;
    (function fixBadScroll(scroller){
        if (scroller.enabled){
            if (window.pageYOffset != 0){
                scrl.animateTo( -(window.pageYOffset));
                window.scrollTo(0, 0);
            }
            if (window.innerHeight != vpHeight){
                scrl.snapToBounds();
            }
        }
        setTimeout(function(){
            fixBadScroll(scroller);
        }, 10);
    })(this);
}

frame.Scroller.prototype.enable = function(){
    this.enabled = true;

    this.element.on('touchstart', this.handleEvent, this);
    this.element.on('touchmove', this.handleEvent, this);
    this.element.on('touchend', this.handleEvent, this);
}

frame.Scroller.prototype.handleEvent = function(e) {
    switch (e.type) {
        case 'touchstart': this.onTouchStart(e); break;
        case 'touchmove': this.onTouchMove(e); break;
        case 'touchend': this.onTouchEnd(e); break;
    }
}

frame.Scroller.prototype.onTouchStart = function(e) {
    this.stopMomentum();

    this.startTouchY = e.getBrowserEvent().touches[0].clientY;
    this.contentStartOffsetY = this.contentOffsetY;
}

frame.Scroller.prototype.onTouchMove = function(e) {
    e.preventDefault();
    this.currentTouchY = e.getBrowserEvent().touches[0].clientY;
    if (this.isDragging()) {
        var deltaY = this.currentTouchY - this.startTouchY;
        var newY = deltaY + this.contentStartOffsetY;
        this.animateTo(newY);
    }
}

frame.Scroller.prototype.onTouchEnd = function(e) {
    if (this.isDragging()) {
        if (this.shouldStartMomentum()) {
            this.doMomentum();
        } else {
            this.snapToBounds();
        }
    }
}

frame.Scroller.prototype.animateTo = function(offsetY) {
    this.contentOffsetY = offsetY;

    // We use webkit-transforms with translate3d because these animations
    // will be hardware accelerated, and therefore significantly faster
    // than changing the top value.
    this.element.style('webkitTransform', 'translate3d(0, ' + offsetY + 'px, 0)');
}

frame.Scroller.prototype.snapToBounds = function() {
    var mainHeight = this.doc.q('#main')[0].scrollHeight;
    var displayHeight = window.innerHeight - 50;

    // if the whole div can be displayed at once, scroll to top.
    if (displayHeight > mainHeight){
        this.animateTo(0);
    // if the div is below the top, scroll to top.
    }else if (this.contentOffsetY > 0){
        this.animateTo(this.contentOffsetY - mainHeight);
    // if the bottom of the div is above the bottom of the viewport, scroll to the bottom
    }else if (this.contentOffsetY - mainHeight > displayHeight){
        this.animateTo(this.contentOffsetY - mainHeight);
    }
}

frame.Scroller.prototype.isDragging = function() {
    return Math.abs(this.currentTouchY - this.startTouchY) > 10;
}

// TODO: impliment momentum
frame.Scroller.prototype.shouldStartMomentum = function() {return false;}
frame.Scroller.prototype.doMomentum = function() {}
frame.Scroller.prototype.stopMomentum = function() {}

frame.Scroller.prototype.disable = function(){
    this.enabled = false;

    this.element.un('touchstart', this.handleEvent);
    this.element.un('touchmove', this.handleEvent);
    this.element.un('touchend', this.handleEvent);
};

frame.Scroller.prototype.checkForm = function(){
    if (this.doc.q('textarea, input[type=text], input[type=email], input[type=password]').length)
        this.disable();
    else
        this.enable();
}