const MIN_HEIGHT = 340;
const MOB_BREAKPOINT = 767.8

export function MobileTextExpand() {
  const mainSect = document.querySelector('.l-organization');
  const side = mainSect.querySelector('.lo-side');
  const expSect = mainSect.querySelector('.expand-mob-text');
  const sectBody = expSect.querySelector('.expand-mob-text__body');
  const moreBtn = expSect.querySelector('.expand-mob-text__button .btn--more');

  function calcMinHeight() {
    const elements = sectBody.querySelectorAll(':scope > :is(div, h2, h3, h4, h5, h6, p, ul, ol)');
    const mainSectTop = mainSect.getBoundingClientRect().top;
    const sectTop = expSect.getBoundingClientRect().top;
    const cHeight = window.matchMedia(`(max-width: ${MOB_BREAKPOINT}px)`).matches ?
      MIN_HEIGHT :
      side.getBoundingClientRect().height - (sectTop - mainSectTop);

    let mHeight = 0;

    for (let i = 0; i < elements.length; i++) {
      const boundRect = elements[i].getBoundingClientRect();
      const elTop = boundRect.top - sectTop;

      if (elTop > cHeight) break;

      const elBot = boundRect.top + boundRect.height;
      mHeight = elBot - sectTop;
    }

    if (sectBody.scrollHeight <= mHeight) {
      expSect.classList.add('expand-mob-text--no-more');
      expSect.style.setProperty('--min-height', null);
    } else {
      expSect.classList.remove('expand-mob-text--no-more');
      expSect.style.setProperty('--min-height', `${mHeight}px`);
    }
  }

  function expandSect() {
    sectBody.style.maxHeight = `${sectBody.scrollHeight}px`;
    expSect.classList.add('expand-mob-text--expand');
  }

  function collapseSect() {
    sectBody.style.maxHeight = `${sectBody.scrollHeight}px`;
    expSect.classList.remove('expand-mob-text--expand');
    setTimeout(() => { sectBody.style.maxHeight = null; }, 1)
  }

  sectBody.addEventListener('transitionend', (evt) => {
    if (evt.type !== 'transitionend') return;

    if (expSect.classList.contains('expand-mob-text--expand')) {
      sectBody.style.maxHeight = null;
    }

    expSect.classList.remove('expand-mob-text--anim');
  });

  calcMinHeight();

  window.addEventListener('resize', calcMinHeight);

  moreBtn.addEventListener('click', () => {
    expSect.classList.add('expand-mob-text--anim');

    if (expSect.classList.contains('expand-mob-text--expand')) {
      collapseSect();
    } else {
      expandSect();
    }
  });
}
