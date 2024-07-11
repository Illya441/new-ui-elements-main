const header = document.querySelector('header.m-header .navbar');
const headerHeight = header.clientHeight;
const marginY = 24;
const stickySelector = '.sticky-side';
const classNameTop = 'js-sticky-top';
const classNameBot = 'js-sticky-bottom';
const BREAKPOINT = '767.98px';

let prevScrollTop = window.scrollY;

function clearSticky(div) {
  div.classList.remove(classNameBot);
  div.classList.add(classNameTop);
  div.style.marginTop = null;
}

function checkPos(div) {
  if (window.matchMedia(`(max-width: ${BREAKPOINT})`).matches) {
    clearSticky(div);
    return;
  }

  const parent = div.parentNode;
  const parentClientRect = parent.getBoundingClientRect();
  const divClientRect = div.getBoundingClientRect();

  if (headerHeight + marginY + divClientRect.height <= window.innerHeight) {
    clearSticky(div);
    return;
  }

  const scrollTop = window.scrollY;

  if (scrollTop > prevScrollTop) {
    div.classList.remove(classNameTop);
    div.classList.add(classNameBot);

    if (
      divClientRect.top - parentClientRect.top > 0 &&
      divClientRect.top + divClientRect.height > window.innerHeight - marginY
    ) {
      div.classList.remove(classNameBot);
      div.style.marginTop = `${divClientRect.top - parentClientRect.top}px`;
    } else {
      div.style.marginTop = null;
    }
  } else {
    if (
      !(
        div.classList.contains(classNameBot) &&
        parent.offsetTop + divClientRect.height > scrollTop + window.innerHeight - marginY
      )
    ) {
      div.classList.remove(classNameBot);
      div.classList.add(classNameTop);
    }

    if (
      divClientRect.top - parentClientRect.top > 0 &&
      divClientRect.top < headerHeight + marginY &&
      divClientRect.top + divClientRect.height !== parentClientRect.top + parentClientRect.height
    ) {
      div.classList.remove(classNameTop);
      div.style.marginTop = `${divClientRect.top - parentClientRect.top}px`;
    } else {
      div.style.marginTop = null;
    }
  }

  prevScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

export function StickySide() {
  const stickies = document.querySelectorAll(stickySelector);

  if (stickies.length === 0) return;

  stickies.forEach((div) => {
    checkPos(div);
  });

  window.addEventListener('scroll', () => {
    stickies.forEach((div) => {
      checkPos(div);
    });
  });

  window.addEventListener('resize', () => {
    stickies.forEach((div) => {
      checkPos(div);
    });
  });
}
