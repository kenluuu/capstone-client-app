/*===============================
						Service
================================*/

$(function() {

	new WOW().init();
});


/*===============================
						WORK
================================*/
$(function() {
	$('#work').magnificPopup({
	  delegate: 'a', 
	  type: 'image',
	  gallery: {
	  	enabled: true
	  }
	});
});


/*===============================
						TEAM
================================*/
$(function() {
	$("#team-members").owlCarousel({
		items: 3,
		autoplay: true,
		smartSpeed: 700,
		loop: true
	});
});