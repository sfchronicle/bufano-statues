require("./lib/social"); //Do not delete

var map = L.map('statues-map', { zoomControl : false });

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

if (screen.width <= 480) {
  map.setView(new L.LatLng(37.76, -122.44), 11);
} else {
  map.setView(new L.LatLng(37.76, -122.445), 12);
}

// dosable zooming on scroll
map.scrollWheelZoom.disable();
map.doubleClickZoom.disable();

console.log(map);

new L.control.zoom({
    position:'bottomleft'
}).addTo(map);


var selectedIcon = L.icon({
	iconUrl: 'assets/marker_red.png',
	shadowUrl: 'assets/marker-shadow.png'
});

var defaultIcon = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
	shadowUrl: 'assets/marker-shadow.png'
});

var oldIcon;

statuesData.forEach(function(d) {

	var point = L.marker([d.Lat, d.Lng]).addTo(map);
	

	//point.classList.add("point");
	//console.log(point);

	if (screen.width >= 480) {
		point.on("click", function(e) {
			
			var currIcon = e.target;
			currIcon.setIcon(currIcon.options.icon = selectedIcon);

			if (oldIcon) oldIcon.setIcon(currIcon.options.icon = defaultIcon);
			oldIcon = currIcon;


			document.querySelector(".tooltip").classList.remove("hide");
			document.querySelector(".tooltip-background").classList.add("hide");
			if (d.PhotoType != "portrait") {
				console.log("hello");
				document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/300x0.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description;
			} 
		// else if (d.PhotoType == "square") {
		// 	point.bindPopup("<h3>"+ d.Name + "</h3>" + "<img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/300x0.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description, {keepInView:true});
		// } else if (d.PhotoType == "custom") {
		// 	point.bindPopup("<h3>"+ d.Name + "</h3>" + "<img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/300x0.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" + d.Description, {keepInView:true});
		// } 
			else if (d.PhotoType == "portrait") {
				document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<div class='img-portrait'><img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/215x0.jpg'></div>" + "<div class='caption'>"+d.Photographer+"</div>" + d.Description;
			} 
		})
	} else {
		
		point.on("click", function(e) {
						var currIcon = e.target;
			currIcon.setIcon(currIcon.options.icon = selectedIcon);

			if (oldIcon) oldIcon.setIcon(currIcon.options.icon = defaultIcon);
			oldIcon = currIcon;

			console.log($(window).scrollTop());
			var height = document.querySelector('#wrap').clientHeight;
			console.log(height);
			// scroll to tooltip window
			// $('html, body').animate({
			// 	scrollTop: $('.tooltip').offset().top - 35
			// }, 600);
			//console.log($('.tooltip').offset().top);

			//pymChild.scrollParentTo('scroll-to-bottom');
			pymChild.sendMessage('test', height);


			// add tooltip window
			document.querySelector(".tooltip").classList.remove("hide");
			if (d.PhotoType == "landscape") {
				document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<img class='mobile-img' src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/landscape_large.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description;
			} else if (d.PhotoType == "square") {
				document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<img class='mobile-img' src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/square_large.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description;
			} else if (d.PhotoType == "portrait") {
				document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<div class='img-portrait'><img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/portrait_large.jpg'></div>" + "<div class='caption'>"+d.Photographer+"</div>" + d.Description;
			} else if (d.PhotoType == "custom") {
				document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<div class='mobile-img'><img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/280x0.jpg'></div>" + "<div class='caption'>"+d.Photographer+"</div>" + d.Description;
			}

			pymChild.sendHeight();

		})
	}


})
