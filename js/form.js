const inputs = document.querySelectorAll('.form input');
const select = document.querySelector('.input-select');
const selectList = document.querySelector('.input-select-list');
const selectItems = document.querySelectorAll('.input-select-list li');
const formSuccess = document.querySelector('.form-success');
const selectItemsValues = getSelectValues();
const form = document.querySelector('.form');
const row2 = document.querySelector('.form-inputs__row-2');

form.addEventListener('submit', function(event) {
	event.preventDefault();

	if ( ifInputsCorrect() ) {
		formSuccess.classList.add('active');
	}
});

inputs.forEach(input => {
	input.addEventListener('change', onChangeInput);
});

function ifInputsCorrect() {
	let correct = true;

	inputs.forEach(input => {
		if (input.id === 'js-file-input') return;
		correct = correct && input.value;
	});

	return correct && validateGender() && validateBirthdate() && ifFileUploaded();
}

function onChangeInput() {
	const id = this.getAttribute('id');

	validateInput(id);

	displaySecondRow(id);
}

function displaySecondRow() {
	if (ifNameGenderValue()) {
		row2.classList.add('active');
	} else {
		row2.classList.remove('active');
	}
}

function ifNameGenderValue() {
	const name = document.querySelector(`#js-form-name`).value;
	const gender = document.querySelector(`#js-form-gender`).value;

	return name && gender;
}

function validateInput(id) {
	switch (id) {
		case 'js-form-gender':
			validateGender();
			break;
		case 'js-form-birthdate':
			validateBirthdate();
			break;
		default:
			break;
	}

	if ( ifInputsCorrect() ) {
		document.querySelector("#js-btn-submit").disabled = false;
	} else {
		document.querySelector("#js-btn-submit").disabled = true;
	}
}

function validateGender() {
	const input = document.querySelector(`#js-form-gender`);
	const value = input.value.toLowerCase();
	let correct = true;

	if (value === '') return;

	if (selectItemsValues.includes(value)) {
		input.parentNode.parentNode.classList.remove('danger');
	} else {
		input.parentNode.parentNode.classList.add('danger');
		correct = false;
	}

	return correct;
}
function validateBirthdate() {
	const input = document.querySelector(`#js-form-birthdate`);
	const valueSplitted = input.value.split('.');
	let correct = true;

	if (input.value === '') return;

	// проверяем, что у нас формат с точками (dd.mm.yyy)
	if (valueSplitted.length !== 3) correct = false;

	// проверяем, что день между 1 и 31
	if ( parseInt(valueSplitted[0]) < 1 || parseInt(valueSplitted[0]) > 31) correct = false;

	// проверяем, что месяц между 1 и 12
	if ( parseInt(valueSplitted[1]) < 1 || parseInt(valueSplitted[1]) > 12) correct = false;

	// проверяем, что год между 1800 и текущим (вдруг настолько олд)
	if ( parseInt(valueSplitted[2]) < 1800 || parseInt(valueSplitted[2]) > new Date().getFullYear()) correct = false;

	if (correct) {
		input.parentNode.classList.remove('danger');
	} else {
		input.parentNode.classList.add('danger');
	}

	return correct;
}

function ifFileUploaded() {
	return document.querySelectorAll('.file-uploaded__item').length;
}

//SELECT
selectItems.forEach(item => {
	item.addEventListener('click', function() {
		select.value = this.getAttribute('value');

		select.blur();

		validateGender();
		displaySecondRow();
	});
});
select.addEventListener('input', function(event) {
	event.target.value = '';
});
select.addEventListener('focus', function() {
	selectList.style.display = "block";
});
select.addEventListener('blur', function() {
	setTimeout(() => {
		selectList.style.display = "none";
	}, 100); // иначе не успеваем кликнуть по элементу списка

	setTimeout(() => {
		select.blur()
	},100); // странно, но событие расфокуса есть, а самого расфокуса нет. Для этого форсируем расфокус

	ifNameGenderValue();
});

function getSelectValues() {
	const values = [];
	selectItems.forEach(item => {
		const value = item.getAttribute('value').toLowerCase();
		values.push(value);
	});

	return values;
}