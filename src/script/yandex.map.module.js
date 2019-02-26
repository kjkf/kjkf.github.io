(function() {
	// M A P S
	ymaps.ready(init);

	let placemarks = [
		{
			latitude: 59.97,
			longitude: 30.31,
			hintContent: "<div class='map__hint'>ул. Литераторов, д. 19</div>", 
			balloonContent: [
				'<div class="map__balloon">',
				'<div class="map__burger-img-wrapper"><img class="map__burger-img" src="img/burger-icon.png", alt="Бургер"></div>',
				'Самые вкусные бургеры у нас!',
				'</div>'
				]
		},

		{
			latitude: 59.94,
			longitude: 30.25,
			hintContent: "<div class='map__hint'>Малый проспект В.О., д. 64</div>", 
			balloonContent: [
				'<div class="map__balloon">',
				'<div class="map__burger-img-wrapper"><img class="map__burger-img" src="img/burger-icon.png", alt="Бургер"></div>',
				'Самые вкусные бургеры у нас!',
				'</div>'
				]
		},

		{
			latitude: 59.93,
			longitude: 30.34,
			hintContent: "<div class='map__hint'>набережная реки Фонтанки д. 54</div>", 
			balloonContent: [
				'<div class="map__balloon">',
				'<div class="map__burger-img-wrapper"><img class="map__burger-img" src="img/burger-icon.png", alt="Бургер"></div>',
				'Самые вкусные бургеры у нас!',
				'</div>'
				]
		}
	],

	geoObjects = [];


	function init() {
		var map = new ymaps.Map('map', {
			center: [59.94, 30.32],
			zoom: 12,
			controls: ['zoomControl'],
			behaviors: ['drag']
		});

		//placemarks.forEach(function(obj) {
		for (var i = 0; i < placemarks.length; i++) {
			geoObjects[i] = new ymaps.Placemark(
				[placemarks[i].latitude, placemarks[i].longitude], {
				hintContent: placemarks[i].hintContent, 
				balloonContent: placemarks[i].balloonContent.join('')
			},
			{
				iconLayout: 'default#image',
				iconImageHref: './img/icons/map-marker.svg',
				iconImageSize: [46, 57],
				iconImageOffset: [-23, -57]
			});

			//map.geoObjects.add(placemark);
		//});
		}

		var clusterer = new ymaps.Clusterer({

		});

		map.geoObjects.add(clusterer);
		clusterer.add(geoObjects);
		
	}
})();

