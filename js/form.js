const inputs = document.querySelectorAll('.input-box input');
const select = document.querySelector('.input-select');
const selectList = document.querySelector('.input-select-list');
const selectItems = document.querySelectorAll('.input-select-list li');
const selectItemsValues = getSelectValues();

inputs.forEach(input => {
	input.addEventListener('change', onChangeInput);
});

function onChangeInput() {
	const id = this.getAttribute('id');

	validateInput(id);
}

function validateInput(id) {
	switch (id) {
		case 'js-form-gender':
			validateGender();
			break;
		case 'js-form-birthdate':
			validateBirthdate();
			break;
	}
}

function validateGender() {
	const input = document.querySelector(`#js-form-gender`);
	const value = input.value.toLowerCase();

	if (selectItemsValues.includes(value) || value === '') {
		input.parentNode.parentNode.classList.remove('danger');
	} else {
		input.parentNode.parentNode.classList.add('danger');
	}
}
function validateBirthdate() {
	const input = document.querySelector(`#js-form-birthdate`);
	const valueSplitted = input.value.split('.');
	let correct = true;

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
}

//SELECT
selectItems.forEach(item => {
	item.addEventListener('click', function() {
		select.value = this.getAttribute('value');

		select.blur();

		validateGender();
	});
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
});

function getSelectValues() {
	const values = [];
	selectItems.forEach(item => {
		const value = item.getAttribute('value').toLowerCase();
		values.push(value);
	});

	return values;
}