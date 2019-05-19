function onNavbarHover (e) {
  console.log('hghg');
}

function onNavbarLeave (e) {
  if (e.target !== this) return;
}

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navigation');
  navbar.addEventListener('mouseover', onNavbarHover);
  navbar.addEventListener('mouseout', onNavbarLeave);
});