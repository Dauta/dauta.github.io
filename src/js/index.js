function restrictScrolling(e) {
  // if (e.deltaY <= 0) return 0;

  return e.deltaY / 1.5;
}

function offsetLimit() {
  const body = document.body;
  return body.offsetHeight / 10;
}

function moveRocket(shift) {
  const rocket = document.querySelector('.rocket-container');
  let offset = window.getComputedStyle(rocket).transform.split(',')[5];

  if(offset) {
    offset = offset.split(')')[0];
    offset = Math.abs(parseInt(Math.floor(offset)));
  } else {
    offset = 0;
  }

  if(offset > offsetLimit()) return;

  rocket.style.transform = `translate(0, -${(shift + offset)}px)`;
}

(function init() {
  window.addEventListener('wheel', (e) => {
    e.stopImmediatePropagation();
    const scrollVal = restrictScrolling(e);

    moveRocket(scrollVal);
  }, true)
})();