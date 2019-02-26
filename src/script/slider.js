;(function() {
	//*************** S L I D E R 
	const leftBtn = document.querySelector("#left");
	const rightBtn = document.querySelector("#right");
	const items = document.querySelector(".burgers__slider__list");

	const step = items.firstElementChild.getBoundingClientRect().width;
	const maxRight = (items.children.length - 1) * step;
	const minRight = 0;
	let currentRight = 0;

	//console.log("maxRight = " + maxRight + "	minRight = " + minRight);

	rightBtn.addEventListener('click', e => {
		e.preventDefault();
		console.log("step = " + step + "	currentRight = " + currentRight);
		if (currentRight < maxRight) {
			currentRight += step;
			items.style.right = `${currentRight}px`;
		} else {
			currentRight = 0;
			items.style.right = `${currentRight}px`;
		}
	});

	leftBtn.addEventListener('click', e => {
		e.preventDefault();
		console.log("step = " + step + "	currentRight = " + currentRight);
		if (currentRight > minRight) {
			currentRight -= step;
			items.style.right = `${currentRight}px`;
		} else {
			currentRight = maxRight;
			items.style.right = `${currentRight}px`;
		}
	});
})();
