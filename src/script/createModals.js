;(function() {
	//*************** M O D A L S 
	//console.log("M O D A L S");
	const template = document.querySelector('#modal-template').innerHTML;
	const reviewBtns = document.querySelectorAll(".reviews__btn>button");
	//const reviews = getReviews(); //загружает отзывы из json файла и записывает их в массив
	let currentReviewContent;
	
	for (const btn of reviewBtns) {
		btn.addEventListener('click', showReview);
	}

	function showReview(e) {
		currentReviewContent = getReviewInfo(e.currentTarget); //
		const content = getReviewContent();
		const modal = createModal(content);

		document.body.appendChild(modal);
	}


	function createModal(content) {
		const container = document.createElement('div');
		container.className = 'popup';
		container.innerHTML = template;

		const contentBlock = container.querySelector('.popup__content');
		contentBlock.appendChild(content);

		const closeBtn = container.querySelector(".closeBtn");
		closeBtn.addEventListener('click', e => {
			e.preventDefault();
			document.body.removeChild(container);
		});

		const overlay = container.querySelector(".overlay");
		overlay.addEventListener('click', e => {
			if (e.target === overlay) {
				closeBtn.click();
			}
		});

		return container;
	}

	function getReviewContent() {
		const contentTemplate = document.querySelector("#modal-reviewContent").innerHTML;
		const reviewWrap = document.createElement('div');
		reviewWrap.classList.add("modal");
		reviewWrap.innerHTML = contentTemplate;
		
		const contentHeader = reviewWrap.querySelector(".review__title");
		contentHeader.innerHTML = currentReviewContent.getHeader;

		const contentBlock = reviewWrap.querySelector(".review__content").firstElementChild;
		contentBlock.innerHTML = currentReviewContent.getReview;

		return reviewWrap;
	}


	function getReviewInfo(button) {
		let elemParent = button.closest(".reviews__item-hover"); //находим родителя кнопки, и от него будем искать h3
		return {
			"getHeader" :  elemParent.querySelector(".review__title").innerHTML,
			"getReview" : elemParent.querySelector(".reviews_text").innerHTML
		}
	}

	// F O R M S 
	let isError = false;
	const orderForm = document.querySelector("#orderForm");
	const orderBtn = document.querySelector("#orderBtn");
	const formDiv = document.querySelector(".form__column-wrap");

	function createErrorMsgBox(field) {
		const errorWrap = document.createElement("div");
		errorWrap.classList.add("errorWrap");

		const errorSpan = document.createElement("span");
		errorSpan.className = "error";
		errorSpan.innerHTML = field.validationMessage;

		errorWrap.appendChild(errorSpan);
		console.log(errorWrap);

		let parentElem = field.parentElement;
		let rect = parentElem.getBoundingClientRect();
		//console.log(parentElem);
		console.log(rect);

		let left = rect.left;
		let top = rect.top - 116;
		errorWrap.style.left = `${left}px`;
		errorWrap.style.top = `${top}px`;
		formDiv.appendChild(errorWrap);
		
	}


	//orderBtn.addEventListener('click', (e) => {
	orderForm.addEventListener('submit', (e) => {
		e.preventDefault();
		
		if (validateForm(orderForm)) {
			let formData = new FormData();
			formData.set("name", orderForm.elements["fld-name"].value);
			formData.set("phone", orderForm.elements["fld-phone"].value);
			formData.set("comment", orderForm.elements["fld-comment"].value);
			formData.set("to", "lodgsdg@mail.ru");

			//console.log(formData.get("name"));
		//https://webdev-api.loftschool.com/sendmail/fail
		//https://webdev-api.loftschool.com/sendmail
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
			xhr.responseType = "json";
			xhr.send(formData);
			xhr.addEventListener('load', () => {
				const response  = xhr.response.message;
				//console.log(response);
				const responseDiv = document.createElement('div');
				responseDiv.classList.add("modal");
				responseDiv.classList.add("response-server");
				responseDiv.innerHTML = response;
				const modal = createModal(responseDiv);
				document.body.appendChild(modal);
			});
		}
		
	});


	function validateForm(form) {
		let valid = true;

		if (!validateField(form.elements["fld-name"])) {
			valid = false;
		}

		if (!validateField(form.elements["fld-phone"])) {
			valid = false;
		}

		if (!validateField(form.elements["fld-comment"])) {
			valid = false;
		}

		return valid;
	}

	function validateField(field) {
		if (!field.checkValidity()) {
			//let errorMsg = createErrorMsgBox(field);
			isError = true;
			field.classList.add("has-error");
			//field.nextElementSibling.textContent = field.validationMessage;	
		} else {
			if (field.classList.contains("has-error")) {
				field.classList.remove("has-error");
			}
		}
		
		return field.checkValidity();
	}

	document.addEventListener('click', () => {
		//console.log("555555555555");
		if (isError) {
			let errorFlds = document.querySelectorAll(".has-error");
					
			setTimeout(() => {
				isError = false;
				for (const field of errorFlds) {
					field.classList.remove("has-error");

				}
			}, 1500);	
			
		}
		
		
	});

})();
