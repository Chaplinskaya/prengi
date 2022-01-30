window.addEventListener('DOMContentLoaded', () => {
    
    // Menu hamburger

    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.promo-section__menu_block'),
          menuItem = document.querySelectorAll('.promo-section__menu_block-item');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('promo-section__menu_block_active');
    });
    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('promo-section__menu_block_active');
        });
    });

    //Modal

    const modalTrigger = document.querySelector('[data-modal]'),
          modal = document.querySelector('.modal');
          
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    modalTrigger.addEventListener('click', openModal);
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    modal.addEventListener('click', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    const modalTimerId = setTimeout(openModal, 50000);
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
    
    //Forms

    const forms = document.querySelector('form');
    const message = {
        loading: 'images/form/spinner.svg',
        success: 'Спасибо! Мы с вами скоро свяжемся!',
        failure: 'Что-то пошло не так...'
    };
    bindPostData(forms);

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!$(this).valid()) {
                return;//блокирует отправку пустых писем
            }
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            //form.appendChild(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);//вставка спинера после блока оповещения            
            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
   
    const sliderItem = document.querySelectorAll('.solution__tab_img'),
          slider = document.querySelector('.solution__tab'),
          prev = document.querySelector('.solution__slider_prev'),
          next = document.querySelector('.solution__slider_next'),
          sliderBlock = document.querySelector('.slider-block'),
          sliderInner = document.querySelector('.solution__slider'),
          width = window.getComputedStyle(sliderBlock).width;
    
    let sliderIndex = 1;
    let offset = 0;

    sliderInner.style.width = 100 * sliderItem.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';
    sliderBlock.style.overflow = 'hidden';

    sliderItem.forEach(slide => {
        slide.style.width = width;
    });
    sliderInner.style.position = 'relative';
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        display: flex;
        list-style-type: none;
        justify-content: space-between;
        margin: 0 auto;
        max-width: 845px;
        border: 1px solid #fff;
        border-radius: 3px;
        top: 0;
        right: 0;
        left: 0;
        z-index: 15;
    `;
    const mQuery = window.matchMedia('(max-width: 768px)');
    if (mQuery.matches) { 
        indicators.style.cssText = `
            display: none;
    `;
    }
    sliderBlock.append(indicators);
    
    const buttons = ['Prengi Prodaction', 'Prengi FMC', 'Prengi Mallz Retail', 'Prengi Logistic', 'Prengi IT', 'Prengi HR'];
   
    for (let i = 0; i < sliderItem.length; i++) {
       const dot = document.createElement('li');
       dot.setAttribute('data-slide-to', i+1);
       dot.style.cssText = `
            padding: 20px 30px;
            font-size: 13px;
            color: #fff;
            cursor: pointer;
            transition: opacity 0.6s easy;
       `;
       dot.textContent = buttons[i];
       if (i==0) {
           dot.style.color = '#00c2f0';
       }
       dots.push(dot);
       indicators.append(dot);
   };
   next.addEventListener('click', () => {
       if (offset == +width.slice(0, width.length - 2) * (sliderItem.length - 1)) {
           offset = 0;
       } else {
           offset += +width.slice(0, width.length - 2);
       }

       sliderInner.style.transform = `translateX(-${offset}px)`;

       if (sliderIndex == sliderItem.length) {
           sliderIndex = 1;
       } else {
           sliderIndex++;
       }
       dots.forEach(dot => dot.style.color = '#fff');
       dots[sliderIndex - 1].style.color = '#00c2f0';
   });
   prev.addEventListener('click', () => {
       if (offset == 0) {
           offset = +width.slice(0, width.length - 2) * (sliderItem.length - 1);
       } else {
        offset -= +width.slice(0, width.length - 2);
       }
       sliderInner.style.transform = `translateX(-${offset}px)`;
       if (sliderIndex == 1) {
        sliderIndex = sliderItem.length;
    } else {
        sliderIndex--;
    }
    dots.forEach(dot => dot.style.color = '#fff');
    dots[sliderIndex - 1].style.color = '#00c2f0';
   });

   dots.forEach(dot => {
       dot.addEventListener('click', (e) => {
           const slideTo = e.target.getAttribute('data-slide-to');
           sliderIndex = slideTo;
           offset = +width.slice(0, width.length - 2) * (slideTo - 1);
           sliderInner.style.transform = `translateX(-${offset}px)`;
           dots.forEach(dot => dot.style.color = '#fff');
           dots[sliderIndex - 1].style.color = '#00c2f0';
       });
    });
   














   
   
   
    ///tabs
//     const tabs = document.querySelectorAll('.solution__tab_block-item'),
//           tabsContent = document.querySelectorAll('.solution__tab_img'),
//           tabsParent = document.querySelector('.solution__tab_block-items');

//           function hideTabContent() {
//             tabsContent.forEach(item => {
//                 item.classList.add('hide');
//                 item.classList.remove('show', 'fade');
//             });
//             tabs.forEach(item => {
//                 item.classList.remove('solution__tab_block-item-active');
//             });
//           };
          
//           function showTabContent(i = 0) {
//               tabsContent[i].classList.add('show', 'fade');
//               tabsContent[i].classList.remove('hide');
//               tabs[i].classList.add('solution__tab_block-item-active');
//           }
//           hideTabContent();
//           showTabContent();

//           tabsParent.addEventListener('click', (event) => {
//               const target = event.target;
//               if (target && target.classList.contains('solution__tab_block-item')) {
//                   tabs.forEach((item, i) => {
//                       if (target == item) {
//                         hideTabContent();
//                         showTabContent(i);
//                       }
//                   });
//               }
//           });

//     //slider
    
//     const prev = document.querySelector('.solution__slider_prev'),
//           next = document.querySelector('.solution__slider_next');
    
//     let slideIndex = 1;

//     showSlides(slideIndex);

//     function showSlides(n) {
//         if (n > tabsContent.length) {
//             slideIndex = 1;
//         };
//         if (n < 1) {
//             slideIndex = tabsContent.length;
//         };
        
//         //tabsContent.forEach(item => item.style.display = 'none');
//         //tabsContent[slideIndex - 1].style.display = 'block';
//     }
//     function plusSlides(n) {
//         showSlides(slideIndex += n);
//     };
//     prev.addEventListener('click', () => {
//         plusSlides(-1);
//     });
//     next.addEventListener('click', () => {
//         plusSlides(1);
//     });

});