
goog.provide('frame.Scroller');

goog.require('frame.dom.Node');

/** @constructor */
frame.Scroller = function(element){
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
        frame.log('prevented scroll');
    }, false);

    this.element = element;
    this.startTouchY = 0;
    this.animateTo(0);
    this.doc = new frame.dom.Node(document);

    element.on('touchstart', this.handleEvent, this);
    element.on('touchmove', this.handleEvent, this);
    element.on('touchend', this.handleEvent, this);

    // var scrl = this;
    // (function fixBadScroll(){
    //     if (window.scrollY != 1){
    //         scrl.animateTo(-window.scrollY);
    //         window.scrollTo(0, 1);
    //     }
    //     setTimeout(fixBadScroll, 10);
    // })();
}

frame.Scroller.prototype.handleEvent = function(e) {
    switch (e.type) {
        case 'touchstart': this.onTouchStart(e); break;
        case 'touchmove': this.onTouchMove(e); break;
        case 'touchend': this.onTouchEnd(e); break;
    }
}

frame.Scroller.prototype.onTouchStart = function(e) {
    // This will be shown in part 4.
    //this.stopMomentum();

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
            // This will be shown in part 3.
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

// Implementation of this method is left as an exercise for the reader.
// You need to measure the current position of the scrollable content
// relative to the frame. If the content is outside of the boundaries
// then simply reposition it to be just within the appropriate boundary.
frame.Scroller.prototype.snapToBounds = function() {
    this.animateTo(0);
}

// Implementation of this method is left as an exercise for the reader.
// You need to consider whether their touch has moved past a certain
// threshold that should be considered 'dragging'.
frame.Scroller.prototype.isDragging = function() {
    return Math.abs(this.currentTouchY - this.startTouchY) > 10;
}

// Implementation of this method is left as an exercise for the reader.
// You need to consider the end velocity of the drag was past the
// threshold required to initiate momentum.
frame.Scroller.prototype.shouldStartMomentum = function() {
    return false;
}
