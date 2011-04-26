
goog.provide('frame.support');

frame.support = {
    fixedPosition: function (){
        if (typeof frame.support._fixedPosition != 'undefined')
            return frame.support._fixedPosition;

        var container = document.body;
        if (document.createElement && container && 
                container.appendChild && container.removeChild) {
            var el = document.createElement('div');

            if (!el.getBoundingClientRect) return null;

            el.innerHTML = 'x';
            el.style.cssText = 'position:fixed;top:100px;';
            container.appendChild(el);

            var originalHeight = container.style.height,
            originalScrollTop = container.scrollTop;

            container.style.height = '3000px';
            container.scrollTop = 500;

            var elementTop = el.getBoundingClientRect().top;
            container.style.height = originalHeight;

            frame.support._fixedPosition = (elementTop === 100);
            container.removeChild(el);
            container.scrollTop = originalScrollTop;

            return frame.support._fixedPosition;
        }
        return null;
    },
    touch: function(){
        if (typeof frame.support._touch == 'undefined')
            frame.support._touch = 'ontouchstart' in window;
        return frame.support._touch;
    }
}
