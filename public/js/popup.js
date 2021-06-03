const docBody = document.getElementsByTagName('body')[0];
const imgThumbs = document.querySelectorAll('.landmark figure img');

const popupContainer = document.getElementById('popup-container');
const popupImg = document.querySelector('.popup figure img');
const closeBtn = document.querySelector('.popup .close');

imgThumbs.forEach(thumb => {
   thumb.addEventListener('click', function() {
      const photoUrl = this.getAttribute('data-lg-img');
      popupContainer.classList.toggle('popup-open');
      docBody.classList.toggle('popup-open');
      popupImg.src = photoUrl;
   });
});

closeBtn.addEventListener('click', () => {
   popupContainer.classList.toggle('popup-open');
   docBody.classList.toggle('popup-open');
   popupImg.src = '';
});