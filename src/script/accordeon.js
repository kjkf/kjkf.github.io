;(function() {
	// ************* T E A M    A C C O R D E O N
	const acco_list = document.querySelector(".accordeon__list");
	const acco_items = acco_list.querySelectorAll(".accordeon__item");

	for (const item of acco_items) {
		item.addEventListener("click", eventHandlerAcco);
	}

	function eventHandlerAcco(e) {
		const item = e.currentTarget;
		const wrap = item.querySelector(".accordeon__item__wrap");
		if (item.classList.contains("active")) {
			closeAccoMenu(item, wrap, "height");
		} else {
			const activeItem = acco_list.querySelector(".accordeon__item.active");
			if(activeItem) {
				const activeWrap = activeItem.querySelector(".accordeon__item__wrap");
				closeAccoMenu(activeItem, activeWrap, "height");
			}
			
			openAccoMenu(item, wrap, "height");
			
		}
	}

	// ************* M E N U    A C C O R D E O N
	const menu_list = document.querySelector(".menus__accordeon");
	const menu_items = menu_list.querySelectorAll(".menus__item-wrap");

	for (const menuItem of menu_items) {
		menuItem.addEventListener("click", eventHandlerMenu);
	}

	function eventHandlerMenu(e) {
		const item = e.currentTarget;
		const wrap = item.querySelector(".menus__item-text-wrap");

		if (item.classList.contains("active")) {
			closeAccoMenu(item, wrap, "width");
		} else {
			const activeItem = menu_list.querySelector(".menus__item-wrap.active");
			if (activeItem) {
				const activeWrap = activeItem.querySelector(".menus__item-text-wrap");
				closeAccoMenu(activeItem, activeWrap, "width");
			}
			openAccoMenu(item, wrap, "width");
		}
	}

	// *************  A C C O R D E O N    F U N C T I O N S
	function openAccoMenu(item, wrap, type) {
		const content = wrap.firstElementChild;
		const current = type == "height" ? content.getBoundingClientRect()[type] + "px" : "95%";
		wrap.style[type] = `${current}`;
		item.classList.add("active");	
	}

	function closeAccoMenu(item, wrap, type) {
		wrap.style[type] = 0;
		item.classList.remove("active");	 
	}
})();
