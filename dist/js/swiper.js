const swiper = new Swiper('.swiper', {
    // Optional parameters
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
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    }
  
   
    
  });