import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

export function oSwiperInit() {
  const tSwiper = document.querySelector('.main-swiper');
  const tPrev = tSwiper?.querySelector('.swiper-button-prev');
  const tNext = tSwiper?.querySelector('.swiper-button-next');
  const tSlides = tSwiper?.querySelectorAll('.t-swiper__thumb');

  const popupSwiper = document.querySelector('.swiper-popup');
  const closePopupBtn = popupSwiper?.querySelectorAll('[data-preview-close]');
  const mSwiper = popupSwiper?.querySelector('.m-swiper');
  const mPrev = mSwiper?.querySelector('.swiper-button-prev');
  const mNext = mSwiper?.querySelector('.swiper-button-next');

  const thumbSwiper = popupSwiper?.querySelector('.thumb-swiper');
  const thumbPrev = thumbSwiper?.querySelector('.swiper-button-prev');
  const thumbNext = thumbSwiper?.querySelector('.swiper-button-next');
  const thumbSlides = thumbSwiper?.querySelectorAll('.swiper-slide');

  if (!tSwiper || !popupSwiper) return;


  if (thumbSlides.length <= 6) {
    const thumbSwiperWrapper = thumbSwiper.querySelector('.swiper-wrapper');
    if (thumbSwiperWrapper) {
      thumbSwiperWrapper.style.justifyContent = 'center';
    }
  }

  
  const swiper = new Swiper(tSwiper, {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    navigation: {
      prevEl: tPrev,
      nextEl: tNext,
    },
  });


  const swiper3 = new Swiper(thumbSwiper, {
    slidesPerView: 'auto',
    watchSlidesProgress: true,
    navigation: {
      prevEl: thumbPrev,
      nextEl: thumbNext,
    },
  });

  const swiper2 = new Swiper(mSwiper, {
    navigation: {
      prevEl: mPrev,
      nextEl: mNext,
    },
    thumbs: {
      swiper: swiper3,
    },
  });

  swiper2.on('slideChange', (swipe) => {
    swiper.slideTo(swipe.activeIndex, 0, true);
  });

  function showBigImages() {
    const curIdx = swiper.clickedIndex;

    swiper2.slideTo(curIdx, 0, true);
    popupSwiper.classList.add('swiper-popup--open');
  }

  function hideBigImages() {
    popupSwiper.classList.remove('swiper-popup--open');
  }

  closePopupBtn.forEach((btn) => {
    btn.addEventListener('click', hideBigImages);
  });

  tSlides.forEach((el) => {
    el.addEventListener('click', showBigImages);
  });

}
