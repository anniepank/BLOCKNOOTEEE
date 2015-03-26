var init = function () {
	var fileNameInput = document.getElementById("fileNameInput");                                 //название файла, указание на элемент
	var fileContentInput = document.getElementById("fileContentInput");							  //содержимое файли, указание на элемент
	var fileSaveButton = document.getElementById("fileSaveButton");								  //кнопка сохранения, указание на элемент
	var fileList = document.getElementsByClassName("file-list")[0];								  //список сохраненных файлов, указание
	var fileListItemTemplate = document.getElementsByClassName("file-list-item-template")[0];	  //шаблон элемента списка
	fileList.removeChild(fileListItemTemplate);													  //убийство детей каждого элемента списка


	var saveFile = function () {
		/*
		функция сохранения файла в local Storage
		*/
		var name = fileNameInput.value;										
		
		var content = fileContentInput.value;
		
		console.log("Save!", name, content);
		
		var data = loadFromLocalStorage();
		data[name] = content;
		saveToLocalStorage(data);

		//обновление списка, после сохранения фвйла
		refreshList();
	};

	var deleteFile = function(name) {
		var data = loadFromLocalStorage();
		if (confirm("Are you sure?")) {
			delete data[name];
			saveToLocalStorage(data);
			refreshList();
		}
	}

	var loadFromLocalStorage = function () {
		/*
		Возвращение объекта, содержащего файлы
		*/
		if (localStorage.files === undefined) {
			return {};
		} 
		return JSON.parse(localStorage.files); 
	};

	var saveToLocalStorage = function (files) {
		/*
			Сохранение файлов в local Storage
		*/
		localStorage.files = JSON.stringify(files);
	};

	var refreshList = function () {
		/*
			Обновление списка
			
			1 Удалить детей
			2 Скопировать шаблон(ссылка с текстом внутри)
			3 Добавить название в элемент
			4 Добавить элемент в список
			5 Загружать при нажатии

		*/

		var data = loadFromLocalStorage();
		for(var i = fileList.children.length - 1; i >= 0; i--){
			fileList.removeChild(fileList.children[i]);
		}

		for (var name in data) {
			var fileListItem = fileListItemTemplate.cloneNode(true);
			fileListItem.children[0].textContent = name;
			fileList.appendChild(fileListItem);
			(function (name) {
				fileListItem.children[0].addEventListener("click", function() {
					loadFile(name);
				});
				fileListItem.children[1].addEventListener("click", function() {
					deleteFile(name);
				})
			})(name);
		}


	};

	var loadFile = function(name) {
		/*
			Вствка всей нужной информации из local Storage
			в нужные поля ввода
		*/
		var data = loadFromLocalStorage();
		var content = data[name];
		fileNameInput.value = name;
		fileContentInput.value = content;
	};



	fileSaveButton.addEventListener("click", saveFile);



	refreshList();
}