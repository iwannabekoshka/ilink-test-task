let offset = 0; //Сдвиг картинок слайдера
let position = 0; //Текущая картинка

const totalImages = document.querySelectorAll('.slider-line img').length;
const lastImageIndex = totalImages-1;

const slider = document.querySelector('.slider');
const sliderLine = document.querySelector('.slider-line'); //Контейнер с картинками слайдера
const sliderBtnLeft = document.querySelector('.slider-btn--left');
const sliderBtnRight = document.querySelector('.slider-btn--right');
const sliderDots = document.querySelectorAll('.slider-dots img');
const dotInactiveSrc = 'assets/img/icons/dot-inactive.svg';
const dotActiveSrc = 'assets/img/icons/dot-active.svg';

sliderBtnLeft.addEventListener('click', function() {
	const photoWidth = slider.offsetWidth;

	setImagesWidth(photoWidth);

	offset -= photoWidth;
	position--;

	if (offset < 0) {
		offset = photoWidth*lastImageIndex;
		position = lastImageIndex;
	}

	setActiveDot();

	sliderLine.style.left = -offset + 'px';
});
sliderBtnRight.addEventListener('click', function() {
	const photoWidth = slider.offsetWidth;

	setImagesWidth(photoWidth);

	offset += photoWidth;
	position++;

	if (offset > photoWidth*lastImageIndex) {
		offset = 0;
		position = 0;
	}

	setActiveDot();

	sliderLine.style.left = -offset + 'px';
});

function setImagesWidth(photoWidth) { // Картинки почему-то разной ширины, это фикс
	const images = document.querySelectorAll('.slider-line img');
	images.forEach(img => {
		img.style.width = photoWidth + 'px';
	});
}

function setActiveDot() {
	sliderDots.forEach((dot, index) => {
		if (index === position) {
			dot.src = dotActiveSrc;
		} else {
			dot.src = dotInactiveSrc;
		}
	});
}