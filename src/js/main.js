require("./lib/social"); //Do not delete

var map = L.map('statues-map', { zoomControl : false });

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

if (screen.width <= 480) {
  map.setView(new L.LatLng(37.76, -122.44), 11);
} else {
  map.setView(new L.LatLng(37.76, -122.44), 12);
}

// dosable zooming on scroll
map.scrollWheelZoom.disable();
map.doubleClickZoom.disable();

new L.control.zoom({
    position:'bottomleft'
}).addTo(map);

statuesData.forEach(function(d) {
	var point = L.marker([d.Lat, d.Lng]).addTo(map);

	if (screen.width >= 480) {
		if (d.PhotoType == "landscape") {
			point.bindPopup("<h3>"+ d.Name + "</h3>" + "<img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/landscape_large.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description, {keepInView:true});
		} else if (d.PhotoType == "square") {
			point.bindPopup("<h3>"+ d.Name + "</h3>" + "<img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/square_large.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description, {keepInView:true});
		} else if (d.PhotoType == "portrait") {
			point.bindPopup("<h3>"+ d.Name + "</h3>" + "<div class='img-portrait'><img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/portrait_large.jpg'></div>" + "<div class='portrait-caption'>"+d.Photographer+"</div>" + d.Description, {keepInView:true});
		}
	} else {
		point.on("click", function() {
			//$('window').scrollTop($('.tooltip').offset().top);
			console.log($('html,body').scrollTop());
			$('html, body').animate({
				scrollTop: $('.tooltip').offset().top - 35
			}, 600);
			//console.log(e);
			console.log($('html,body').scrollTop());

			document.querySelector(".tooltip").classList.remove("hide");
					if (d.PhotoType == "landscape") {
			document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<img class='mobile-img' src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/landscape_large.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description;
		} else if (d.PhotoType == "square") {
			document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<img class='mobile-img' src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/square_large.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description;
		} else if (d.PhotoType == "portrait") {
			document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<div class='img-portrait'><img src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/portrait_large.jpg'></div>" + "<div class='portrait-caption'>"+d.Photographer+"</div>" + d.Description;
		}
			// document.querySelector(".tooltip").innerHTML = "<h3>"+ d.Name + "</h3>" + "<img class='mobile-img' src='http://ww1.hdnux.com/photos/63/40/57/"+d.PhotoID+"/3/landscape_large.jpg'>" + "<div class='caption'>"+d.Photographer+"</div>" +  d.Description;
		//$(window).scrollTop($('.tooltip').offset().top);

		})
	}


})
