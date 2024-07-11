export function cardlistExpand() {
  const cardListsSect = document.querySelectorAll('.lo-cards-sect');

  cardListsSect.forEach((sect) => {
    const list = sect.querySelector('.o-card-list');
    const cards = list.querySelectorAll('.o-card-list__item');
    const sectBody = sect.querySelector('.lo-cards-sect__body');
    const moreBtn = sect.querySelector('.btn--more');

    const params = {
      visibleRows: 1,
      cardsInRow: 1,
    }

    function getParams() {
      params.visibleRows = Number(getComputedStyle(sect).getPropertyValue('--rows-visible'));
      params.cardsInRow = Number(getComputedStyle(sect).getPropertyValue('--cols-num'));
    }

    function getMinHeight(index) {
      const lastIndex = index > cards.length - 1 ? cards.length - 1 : index;
      const top = list.getBoundingClientRect().top;
      const cardBox = cards[lastIndex].getBoundingClientRect();
      const bottom = cardBox.top + cardBox.height;

      return Math.round(bottom - top);
    }

    function calcHeight() {
      getParams();

      const lastRowCardIndex = params.visibleRows * params.cardsInRow - 1;
      const minHeight = getMinHeight(lastRowCardIndex);

      sect.style.setProperty('--min-height', `${minHeight}px`);

      if (lastRowCardIndex >= cards.length - 1) {
        sect.classList.add('lo-cards-sect--no-more');
      } else {
        sect.classList.remove('lo-cards-sect--no-more');
      }
    }

    function expandSect() {
      sectBody.style.maxHeight = `${sectBody.scrollHeight}px`;
      sect.classList.add('lo-cards-sect--expand');
    }

    function collapseSect() {
      sectBody.style.maxHeight = `${sectBody.scrollHeight}px`;
      sect.classList.remove('lo-cards-sect--expand');
      setTimeout(() => { sectBody.style.maxHeight = null; }, 1)
    }

    sectBody.addEventListener('transitionend', (evt) => {
      if (evt.type !== 'transitionend') return;

      if (sect.classList.contains('lo-cards-sect--expand')) {
        sectBody.style.maxHeight = null;
      }

      sect.classList.remove('lo-cards-sect--anim');
    });

    calcHeight();

    window.addEventListener('resize', calcHeight);

    moreBtn.addEventListener('click', () => {
      sect.classList.add('lo-cards-sect--anim');

      if (sect.classList.contains('lo-cards-sect--expand')) {
        collapseSect();
      } else {
        expandSect();
      }
    });
  });
}
