function handleMarquee() {

    const marquee = document.querySelectorAll('.marquee');
    let speed = 2;
    let lastScrollPos = 0;
    let timer;
  
    marquee.forEach(el => {
      const container = el.querySelector('.marquee__content');
      const content = el.querySelector('.marquee__content > *');
  
      // Get total width
      const elWidth = content.offsetWidth;
      const repeats = Math.round(el.clientWidth / content.clientWidth);
  
      // Duplicate content
      for (let index = 0; index < repeats + 1; index++) {
        let clone = content.cloneNode(true);
        container.appendChild(clone);
      }
  
      let progress = 1;
  
      function loop() {
        progress = progress - speed;
        if (progress <= elWidth * -1) {
          progress = 0;
        }
        container.style.transform = 'translateX(' + progress + 'px)';
        window.requestAnimationFrame(loop);
      }
      loop();
    });
  
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
  
  handleMarquee();