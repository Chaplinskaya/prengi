const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 400,
    initialSlide: 0,
    //parallax: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 4000,
      },
  
    pagination: {
      el: '.swiper-pagination',
    }
  
  });