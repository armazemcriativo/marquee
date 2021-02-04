;(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

} (function($) {
  'use strict';

  $.fn.marquee = function(speed) {

    const _this = this;
    speed = speed ? speed : 1;

    let lastScrollPos = 0;
    let timer;
  
      const $container = _this.find('.marquee__content');
      const $content = _this.find('.marquee__content > *');
  
      // Get total width
      const elWidth = $content.width();
      const repeats = Math.round(_this.innerWidth() / $content.innerWidth());

      // Duplicate content
      for (let index = 0; index < repeats + 1; index++) {
        $content.clone().appendTo($container)
      }
  
      let progress = 1;
  
      function loop() {
        progress = progress - speed;

        if (progress <= elWidth * -1) {
          progress = 0;
        }

        $container.css({
          'transform': 'translateX(' + progress + 'px)'
        });

        window.requestAnimationFrame(loop);
      }

      loop();

  
    window.addEventListener('scroll', () => {
      const maxScrollValue = 12;
      const newScrollPos = window.scrollY;
      let scrollValue = newScrollPos - lastScrollPos;
      
      if (scrollValue > maxScrollValue) {
        scrollValue = maxScrollValue;
      } else if (scrollValue < -maxScrollValue) {
        scrollValue = -maxScrollValue;
      }
  
      speed = scrollValue;
      clearTimeout(timer);
      timer = setTimeout(handleSpeedClear, 10);
    });
    
    function handleSpeedClear() {
      speed = 4;
    }

  }

}));