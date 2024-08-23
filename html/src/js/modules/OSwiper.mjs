import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

export function oSwiperInit() {
  const mainSwiper = document.querySelector('.main-swiper');
  const mainSwiperPrev = mainSwiper?.querySelector('.swiper-button-prev');
  const mainSwiperNext = mainSwiper?.querySelector('.swiper-button-next');
  const mainSwiperSlides = mainSwiper?.querySelectorAll('.swiper-slide');

  const popupSwiper = document.querySelector('.swiper-popup');
  const closePopupBtn = popupSwiper?.querySelectorAll('[data-preview-close]');
  const galleryView = popupSwiper?.querySelector('.gallery-view');
  const galleryViewPrev = galleryView?.querySelector('.swiper-button-prev');
  const galleryViewNext = galleryView?.querySelector('.swiper-button-next');

  const thumbSwiper = popupSwiper?.querySelector('.thumb-swiper');
  const thumbPrev = thumbSwiper?.querySelector('.swiper-button-prev');
  const thumbNext = thumbSwiper?.querySelector('.swiper-button-next');
  const thumbSlides = thumbSwiper?.querySelectorAll('.swiper-slide');

  if (!mainSwiper || !popupSwiper) return;


  if (thumbSlides.length <= 6) {
    const thumbSwiperWrapper = thumbSwiper.querySelector('.swiper-wrapper');
    if (thumbSwiperWrapper) {
      thumbSwiperWrapper.style.justifyContent = 'center';
    }
  }

  const slidesPerView = mainSwiperSlides.length > 2 ? 3 : mainSwiperSlides.length;

  const swiper = new Swiper(mainSwiper, {
    slidesPerView,
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    navigation: {
      prevEl: mainSwiperPrev,
      nextEl: mainSwiperNext,
    },
  });


  const swiper3 = new Swiper(thumbSwiper, {
    slidesPerView: 6,
    // slidesPerGroup: 1,
    watchSlidesProgress: true,
    navigation: {
      prevEl: thumbPrev,
      nextEl: thumbNext,
    },
  });

  const swiper2 = new Swiper(galleryView, {
    navigation: {
      prevEl: galleryViewPrev,
      nextEl: galleryViewNext,
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

  mainSwiperSlides.forEach((el) => {
    el.addEventListener('click', showBigImages);
  });

}
