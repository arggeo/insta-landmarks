// SIDE MENU
const menuToggler = document.getElementById('toggler');
const sideMenu = document.getElementById('side-menu');

menuToggler.addEventListener('click', () => {
   sideMenu.classList.toggle('active');
});