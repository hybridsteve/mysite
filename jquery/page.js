$(document).ready(function() {
	//alert("test complete");
	var fq = Math.floor(Math.random() * 3);
	if (fq < 1) {
		$("p#footer").html("<span class='contact'>Stephen Wagner</span> - 2011 - Powered by Ghosts");
	}
	$(".contact").hover( function(){
		$(this).text("stephen dot wagner 7 at gmail");
	}, function(){
		$(this).text("Stephen Wagner");
	});

	$(".blogimage").click( function() {
		$("#featureimagecontainer").css("display", "block");
		thatimage = $(this)[0];
		image = document.getElementById("featureimage");
		image.src = thatimage.src;
		updateImagePreview(image);
	});
	
	$("#featureimagecontainer > p").click( function() {
		$("#featureimagecontainer").css("display", "none");
	});

});

function updateImagePreview(target, newimg) {
	var img = document.getElementById("featureimage");
	var height = img.height;
	var newheight = ((window.innerHeight / 2) - (height / 2));
	$("#featureimagecontainer").css("top", newheight);
}