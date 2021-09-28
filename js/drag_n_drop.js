const dropArea = document.querySelector(".file-field");
const uploadedFilesField = document.querySelector(".file-uploaded__items");
const fileInput = document.querySelector("#js-file-input");

dropArea.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', function () {
	handleFiles(this.files);
});

document.addEventListener('click',function(event){
	if(event.target && event.target.className === 'file-remove'){
		const uploadedFileNode = event.target.parentNode.parentNode;
		const index = uploadedFileNode.getAttribute("data-index");
		// Как я понял, удалить файл из мультифайлового инпута нельзя, поэтому пока что просто удалю нод

		uploadedFileNode.remove();
		validateInput(); // from js/form.js
	}
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
	dropArea.addEventListener(eventName, preventDefaults, false)
	document.body.addEventListener(eventName, preventDefaults, false)
});

function preventDefaults (e) {
	e.preventDefault()
	e.stopPropagation()
}

function handleDrop(event) {
	const dataTransfer = event.dataTransfer;
	const files = dataTransfer.files;

	handleFiles(files);
}

function handleFiles(files) {
	files = [...files];
	files.forEach(file => previewFile(file));
}

function previewFile(file) {
	const fileInfo = {
		name: file.name,
		size: formatFileSize(file.size),
		type: formatFileType(file.type),
		index: getFileIndex()
	};

	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function() {
		let img = document.createElement('img');
		img.src = reader.result;

		fileInfo.src = img.src;
		uploadedFilesField.insertAdjacentHTML('beforeend' ,createUploadedFilePreview(fileInfo));

		validateInput(); // from js/form.js
	}
}

function createUploadedFilePreview(fileInfo) {
	return `
		<div class="file-uploaded__item" data-index="${fileInfo.index}">
			<img class="file-preview" src="${fileInfo.src}" alt="Cute cat">
			<div class="file-text">
				<div class="file-info">
					<h4 class="file-name">${fileInfo.name}</h4>
					<p class="file-extension-size">${fileInfo.type} ${fileInfo.size}</p>
				</div>
				<img class="file-remove" src="assets/img/icons/remove.svg" alt="Trash can">
			</div>
		</div>
	`;
}

function formatFileSize(fileSize) {
	const kb = Math.floor(fileSize/(1024));
	const mb = Math.floor(kb/(1024));

	return kb / 1000 < 1 ? kb + ' kb' : mb + ' mb';
}

function formatFileType(fileType) {
	return fileType.split('/').pop().toUpperCase();
}

function getFileIndex() {
	const uploadedFilesNodes = document.querySelectorAll('.file-uploaded__item');
	const uploadedFilesCount = uploadedFilesNodes.length;

	return uploadedFilesCount;
}
