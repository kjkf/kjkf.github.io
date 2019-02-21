
var generateDots = function() {
	$(".section").each(function() {
		var dot = $('<li>', {
			attr : {
				class: 'fixed-menu__item',
				title: $(this).attr("title")
			}, 
			html : '<a href="#hero" class="menu__link"></a>'
		});

		$('.fixed-menu__list').append(dot);

	});
};

generateDots();

var setActiveDot = function(index) {
	$('.fixed-menu__list')
		.find('.fixed-menu__item')
		.eq(index)
		.addClass('active')
		.siblings()
		.removeClass('active');
}

var moveSlide = function(container, slideNum) {
	var items = container.find(".section"),
		activeSlide = items.filter(".active"),
		reqItem = items.eq(slideNum),
		reqIndex = reqItem.index(),
		list = container.find(".maincontent"),
		duration = 400;

	if (reqItem.length) {
		list.animate({
			'top': -reqIndex * 100 + '%'
		}, duration, function() {
			activeSlide.removeClass('active');
			reqItem.addClass('active');
			setActiveDot(slideNum);
		});
	}

}

$(".wrapper").on("wheel", function(e) {
	console.log(e.originalEvent.deltaY);
	e.preventDefault();
	var $this = $(this),
		container = $this.closest('.wrapper'),
		items = container.find(".section"),
		activeSlide = items.filter(".active"),
		nextItem = activeSlide.next();

		if (e.originalEvent.deltaY >= 0) {
			nextItem = activeSlide.next();
		} else {
			nextItem = activeSlide.prev();
		}

	moveSlide(container, nextItem.index());
	//console.log("on wheel ");
});

$('body').on('click', '.fixed-menu__item', function() {
	var $this = $(this),
		container = $this.closest('.wrapper'),
		index = $this.index();

	moveSlide(container, index);
	setActiveDot(index);
});

$('body').on('click', '.menu__item', function() {
	console.log("123");
	var $this = $(this),
		//parent = $this.closest();
		index = $this.attr("idx"),
		container = $this.closest('.wrapper');

	moveSlide(container, index);

	setActiveDot(index);
});

var goToOrder = function($this) {
	var container = $this.closest('.wrapper');
	moveSlide(container, 6);
	setActiveDot(6);
};

$(".hero__order-btn").on("click", function() {
	var $this = $(this);
	goToOrder($this);
});

$(".burger__btn").on("click", function() {
	var $this = $(this);
	goToOrder($this);
});