;(function() {
	// H A M B U R G E R    M E N U
	const hamburgMenuOpenBtn = document.querySelector(".hamburger__menu-link");
	const hamburgMenuCloseBtn = document.querySelector(".hamburger__menu-closeBtn");
	const hamburgMenu = document.querySelector(".hamburger__menu-wrap");
	let op = 0.19;

	hamburgMenuOpenBtn.addEventListener('click', e => {
		hamburgMenu.classList.add("hamburger__menu-wrap_visible");
		hamburgMenu.style.opacity = 0;

		setTimeout(function fadeIn() {
			if (op < .99) {
				op += 0.2;
				hamburgMenu.style.opacity = op;
				setTimeout(fadeIn, 100);
			}
		})
	});

	hamburgMenuCloseBtn.addEventListener('click', e => {
		hamburgMenuClose();
	});

	document.addEventListener('keydown', e => {
		if(e.keyCode == 27) {
			hamburgMenuClose();

			let popup = document.querySelector(".popup");
			if (popup) {
				document.body.removeChild(popup);
			}
		}
	});

	function hamburgMenuClose() {
		setTimeout(function fadeOut() {
			if (op > 0) {
				op -= 0.2;
				hamburgMenu.style.opacity = op;
				setTimeout(fadeOut, 100);
			} else {
				hamburgMenu.classList.remove("hamburger__menu-wrap_visible");
			}
		})
		//
	}

	const hamburgMenuItems = hamburgMenu.querySelectorAll(".menu__item");
	for (const item of  hamburgMenuItems) {
		item.addEventListener("click", e => {
			hamburgMenuClose();
		});
	}


})();
