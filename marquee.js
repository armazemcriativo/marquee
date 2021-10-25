function handleMarquee() {

    const marquee = document.querySelectorAll('.marquee');
    let speed = 2;
    let lastScrollPos = 0;
    let timer;
  
    marquee.forEach(el => {
      const container = el.querySelector('.marquee__content');
      const content = el.querySelector('.marquee__content > *');
  
      // Get total width with possible side margins
      const marginRight = (
        content.currentStyle || window.getComputedStyle(content)
      ).marginRight
      const scrollbarWidth = window.innerWidth - document.body.offsetWidth
      const elWidth =
        content.clientWidth + parseInt(marginRight) - scrollbarWidth
      const repeats = Math.round(el.clientWidth / content.clientWidth)
  
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
  }
  
  handleMarquee();
