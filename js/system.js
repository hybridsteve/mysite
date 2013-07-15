$(document).ready(function() {
	// hook for the randomized footer, not currently in use
	var fq = Math.floor(Math.random() * 3);
	if (fq < 1) {
		//$("p#footer").html("<span class='contact'>Stephen Wagner</span> - 2013 - Powered by Ghosts");
		$("p#footer").html("<span class='contact'>Stephen Wagner</span> - 2013");
	}

	// mouse over name in footer displays email address
	$(".contact").on({
		mouseenter: function() {
			$(this).text("stephen dot wagner 7 at gmail");
		}, 
		mouseleave: function(){
			$(this).text("Stephen Wagner");
		}
	});
	
	$("#featureimagecontainer").on("click", function() {
		// hide the preview window
		$("#featureimagecontainer").css("display", "none").removeAttr("ondragstart");
		
		// if mobile, we need to set the scroll position to where it was before the preview opened
		$("#viewWrapper").css("display", "block");
		if (window.innerWidth <= 960) {
			window.scroll(0, system.scrollPosition);
		}
	});

	$(window).on("resize", function() {
		updateImagePreview();
	});

	$("#featureimagecontainer img").load(function() {
		updateImagePreview();
	});

	system.init();

});

function updateImagePreview(target) {
	var mobile = (window.innerWidth <= 960) ? true : false;
	var tooSmall = (window.innerWidth <= 480 || window.innerHeight <= 480) ? true : false;

	$("#featureimagecontainer").css({height: (window.innerHeight) + "px"});
	$("#featureimagecontainer .imagearea").css("max-height", (window.innerHeight - 50) + "px");
	var img = document.getElementById("featureimage");
	var height = $("#featureimagecontainer").height();
	var newheight = ((window.innerHeight / 2) - (height / 2));
	
	// set the size of the image
	var descWidth = $(".imagedescriptionarea").width();
	var descHeight = $(".imagedescriptionarea").height();
	var imgWidth = (window.innerWidth * 0.80) - ((mobile == false) ? descWidth : 0);
	var imgHeight = (window.innerHeight * 0.80) - ((mobile == true && tooSmall == false) ? (descHeight + 20) : 50);
	$(img).css({maxWidth: imgWidth + "px", maxHeight: imgHeight + "px"});
	
	// set the position of the image preview window
	if (mobile == true) {
		// the preview window is position: absolute because fixed is unreliable on mobile
		$("#featureimagecontainer").css("top", "0").attr("ondragstart", "return false;");
	} else {
		// the preview window is position: fixed
	}

	//update the margin-tops of the description and image
	$("#featureimagecontainer .imagearea").css("margin-top", ((window.innerHeight - $(".imagearea").height()) / 2) - ((mobile == false || tooSmall == true) ? 0 : descHeight / 2) + "px");
	$("#featureimagecontainer .imagedescriptionarea").css("margin-top", ((mobile == false) ? (window.innerHeight / 3) + "px" : 0 ));
}

function updateImagePreviewText(imageId) {
	//update the image title and description if possible
	if (imageId != undefined) {
		var imageObject = system.blogImages.get(imageId);
		//console.log(imageObject);
		$(".imagetitle").text(imageObject.get("title"));
		$(".imagedescription").text(imageObject.get("description"));
	} else {
		$(".imagetitle").text("This image has no title");
		$(".imagedescription").text("This image has no description.");
	}
}

var System = Backbone.Model.extend({
	navigationView: undefined,
	currentView: undefined,
	projects: undefined,
	scrollPosition: 0,
	router: undefined,
	init: function() {
		//this.projects = new ProjectCollection();

		this.navigationView = new NavigationView({
			model: {},
			el: "#navWrapper"
		});

		this.getData();

		//this.navigateBlog();

		this.set("router", new SystemRouter());
		Backbone.history.start();
	},
	getData: function() {
		// eventually get json of projects from db
	},
	navigateBlog: function() {
		this.get("router").navigate("blog", {trigger: true});
		
	},
	navigateGallery: function() {
		this.get("router").navigate("gallery", {trigger: true});
		
	}
});

var ImageModel = Backbone.Model.extend({
	title: undefined,
	description: undefined,
	source: undefined,
	thumbnail: undefined,
	orientation: undefined,
	id: undefined,
	initialize: function() {
		// if thumbnail image source is not set, use the source attribute
		if (this.get("thumbnail") == undefined) {
			this.set("thumbnail", this.get("source"));
		}
	}
});

var ProjectModel = Backbone.Model.extend({
	title: undefined,
	abbrev: undefined,
	type: undefined,
	description: undefined,
	images: undefined, // an image collection
	id: undefined
});

var ImageCollection = Backbone.Collection.extend({
	model: ImageModel
});

var ProjectCollection = Backbone.Collection.extend({
	model: ProjectModel
});

var NavigationView = Backbone.View.extend({
	template: _.template($("#navigationView-template").html()),
	initialize: function() {
		this.render();
	},
	events: {
		"click .navToBlog": "navigateBlog",
		"click .navToGallery": "navigateGallery"
	},
	render: function() {
		$(this.el).html(this.template());
	},
	navigateBlog: function() {
		system.navigateBlog();
	},
	navigateGallery: function() {
		system.navigateGallery();
	},
	tearDown: function() {
		this.setElement("#navigationView");
		this.remove();	
	}
});

var BlogView = Backbone.View.extend({
	template: _.template($("#blogView-template").html()),
	initialize: function() {
		this.render();
	},
	events: {
		"click .blogimage": "blogImageView"
	},
	render: function() {
		$(this.el).html(this.template());
	},
	blogImageView: function(event) {
		var mobile = (window.innerWidth <= 960) ? true : false;

		if (mobile == true) {
			system.scrollPosition = window.scrollY;
			$("#viewWrapper").css("display", "none");
		}

		$("#featureimagecontainer").css({display: "block", height: (window.innerHeight) + "px"});
		thatimage = event.target;
		imageId = $(event.target).data("id");
		image = document.getElementById("featureimage");
		image.src = thatimage.src;
		updateImagePreview(image);
		updateImagePreviewText(imageId);
	},
	tearDown: function() {
		this.undelegateEvents();
		this.setElement("#blogView");
		this.remove();
	}
});

var GalleryView = Backbone.View.extend({
	template: _.template($("#galleryView-template").html()),
	initialize: function() {
		this.render();
	},
	events: {
		"click .gallery-thumbnail": "showFocusedImage",
		"click .close": "hideFocusedImage",
		"click .project-image-focus-area img.focus-image": "hideFocusedImage",
		"click .focus-prev": "previousImage",
		"click .focus-next": "nextImage",
		"click .show-more": "maximize"
	},
	render: function() {
		//console.log(this.collection.toJSON());
		$(this.el).html(this.template({ projects: this.collection.toJSON() }));
	},
	showFocusedImage: function(event) {
		// reset all image areas
		this.hideFocusedImage();

		// find the html elements and get the data
		var root = $(event.target).parents(".project-item");
		var thumbnailsArea = $(root).find(".project-image-preview-area");
		var descriptionArea = $(root).find(".description-area");
		var showMore = $(root).find(".show-more");
		var focusArea = $(root).find(".project-image-focus-area");
		var projectId = $(root).data("project-id");
		var project = system.projects.get(projectId);
		var imageIndex;
		if (event.target.nodeName.toUpperCase() == "DIV") {
			imageIndex = $(event.target).find("img").data("index");
		} else {
			imageIndex = $(event.target).data("index");
		}
		focusArea.data("project-id", projectId).data("image-index", imageIndex);
		var imageObject = project.get("images").at(imageIndex);

		// set values
		focusArea.find("img.focus-image").attr("src", imageObject.get("source"));
		focusArea.find(".project-image-focus-title").text(imageObject.get("title"));
		focusArea.find(".project-image-focus-description").text(imageObject.get("description"));

		// show the content
		thumbnailsArea.addClass("hidden");
		descriptionArea.addClass("hidden");
		focusArea.removeClass("hidden");
		showMore.addClass("hidden");
		//$('html, body').animate({scrollTop: $(root).offset().top}, 500);
	},
	hideFocusedImage: function() {
		// hide the content
		$(".project-image-preview-area").removeClass("hidden");
		$(".description-area").removeClass("hidden");
		$(".project-image-focus-area").addClass("hidden");
		$(".show-more").removeClass("hidden");
	},
	previousImage: function(event) {
		// find the project / image data
		var root = $(event.target).parents(".project-image-focus-area");
		var projectId = $(root).data("project-id");
		var imageIndex = $(root).data("image-index");

		// figure out correct index of previous image (loop to end if necessary)
		var project = system.projects.get(projectId);
		var numImages = project.get("images").length;
		var newImageIndex = (imageIndex-1 == -1)?numImages-1:imageIndex-1;

		// get image model
		var imageObject = project.get("images").at(newImageIndex);

		// set values
		root.data("project-id", projectId).data("image-index", newImageIndex);
		root.find("img.focus-image").attr("src", imageObject.get("source"));
		root.find(".project-image-focus-title").text(imageObject.get("title"));
		root.find(".project-image-focus-description").text(imageObject.get("description"));
	},
	nextImage: function(event) {
		//find the project / image data
		var root = $(event.target).parents(".project-image-focus-area");
		var projectId = $(root).data("project-id");
		var imageIndex = $(root).data("image-index");

		// figure out correct index of next image (loop to start if necessary)
		var project = system.projects.get(projectId);
		var numImages = project.get("images").length;
		var newImageIndex = (imageIndex+1 >= numImages)?0:imageIndex+1;

		// get image model
		var imageObject = project.get("images").at(newImageIndex);

		// set values
		root.data("project-id", projectId).data("image-index", newImageIndex);
		root.find("img.focus-image").attr("src", imageObject.get("source"));
		root.find(".project-image-focus-title").text(imageObject.get("title"));
		root.find(".project-image-focus-description").text(imageObject.get("description"));
	},
	maximize: function(event) {
		var root = $(event.target).parents(".project-item");
		root.removeClass("minimized");
	} ,
	tearDown: function() {
		this.undelegateEvents();
		this.setElement("#galleryView");
		this.remove();
	}
});

var SystemRouter = Backbone.Router.extend({
	routes: {
		"blog": "blog",
		"blog/:post": "blog",
		"gallery": "gallery",
		"gallery/:project": "gallery",
		"*actions": "defaultRoute"
	},
	blog: function(post) {
		if (post != undefined) {
			// blog content not frameworked yet
		} else {
			if (system.currentView != undefined) {
				system.currentView.tearDown();	
			}
			system.currentView = new BlogView({
				model: {},
				el: "#viewWrapper"
			});
		}
		$("nav").find("li").removeClass("active");
		$("nav").find(".navToBlog").addClass("active");
	},
	gallery: function(project) {
		var projectCollection;
		if (project != undefined){
			// render gallery page with given project
			projectCollection = new ProjectCollection( 
				system.projects.where({abbrev: project})
			);
		} else {
			// render gallery page with all projects
			projectCollection = system.projects;
		}
		if (system.currentView != undefined) {
			system.currentView.tearDown();	
		}
		system.currentView = new GalleryView({
			model: {},
			collection: projectCollection,
			el: "#viewWrapper"
		});
		$("nav").find("li").removeClass("active");
		$("nav").find(".navToGallery").addClass("active");
	},
	defaultRoute: function() {
		this.blog();
	}
});

var system = new System();
