let offset = 0; //Сдвиг картинок слайдера

const totalImages = document.querySelectorAll('.slider-line img').length;
const lastImageIndex = totalImages-1;

const slider = document.querySelector('.slider');
const sliderLine = document.querySelector('.slider-line'); //Контейнер с картинками слайдера
const sliderBtnLeft = document.querySelector('.slider-btn--left');
const sliderBtnRight = document.querySelector('.slider-btn--right');

sliderBtnLeft.addEventListener('click', function() {
	const photoWidth = slider.offsetWidth;
	setImagesWidth(photoWidth);

	offset -= photoWidth;

	if (offset < 0) {
		offset = photoWidth*lastImageIndex;
	}

	sliderLine.style.left = -offset + 'px';
});
sliderBtnRight.addEventListener('click', function() {
	const photoWidth = slider.offsetWidth;
	setImagesWidth(photoWidth);

	offset += photoWidth;

	if (offset > photoWidth*lastImageIndex) {
		offset = 0;
	}

	sliderLine.style.left = -offset + 'px';
});

function setImagesWidth(photoWidth) { // Картинки почему-то разной ширины, это фикс
	const images = document.querySelectorAll('.slider-line img');
	images.forEach(img => {
		img.style.width = photoWidth + 'px';
	});
}