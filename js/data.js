// create the system project collection
system.projects = new ProjectCollection();
system.blogImages = new ImageCollection();
var project, image;

//
// art 2011-2012
project = new ProjectModel({
	title: "Art 2011-2012",
	abbrev: "a2012",
	type: "Art",
	description: "Various art from the period of 2011 to 2012.",
	id: 1,
	images: new ImageCollection()
});

image = new ImageModel({
	title: "Tim's Birthday",
	description: "I painted this for my good friend Tim Rozetar's birthday.",
	source: "images/content/a2012/tim_bday_steve_01.jpg",
	thumbnail: "images/content/a2012/th/tim_bday_steve_01.png",
	id: 0
});

project.get("images").add([ image ]);
system.blogImages.add([ image ]);

image = new ImageModel({
	title: "Firekeeper/Maiden in Black",
	description: "Character from Demon's Souls. She's spooky.",
	source: "images/content/a2012/ds_maiden_in_black.png",
	thumbnail: "images/content/a2012/th/ds_maiden_in_black.png",
	id: 1
});

project.get("images").add([ image ]);

system.projects.unshift(project);
system.blogImages.add([ image ]);

//
// hybrid 3d and renders
project = new ProjectModel({
	title: "3D Renders",
	abbrev: "h3d",
	type: "3D",
	description: "Various 3D renders for clients done while working at Hybrid. We did a lot of 3D at Hybrid, but these pieces specifically were modeled, textured, and rendered by me.<br/><br/> All images are Hybrid property unless otherwise noted.",
	id: 3,
	images: new ImageCollection()
});

image = new ImageModel({
	title: "Signal Receiver",
	description: "A render of a signal receiver. I like this model a lot.",
	source: "images/content/h3d/icom_r9000l_oblique_.png",
	thumbnail: "images/content/h3d/th/icom_r9000l_oblique.png",
	id: 6
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Signal Receiver Wireframe",
	description: "The signal receiver's wireframes (smoothed).",
	source: "images/content/h3d/icom_r9000l_oblique_wire_.png",
	thumbnail: "images/content/h3d/th/icom_r9000l_oblique_wire.png",
	id: 14
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Signal Receiver",
	description: "Front view of the signal receiver.",
	source: "images/content/h3d/icom_r9000l_front_on.png",
	thumbnail: "images/content/h3d/th/icom_r9000l_front_on.png",
	id: 7
});


project.get("images").add([ image ]);

image = new ImageModel({
	title: "Computer Component",
	description: "",
	source: "images/content/h3d/tekm_oblique_.png",
	thumbnail: "images/content/h3d/th/tekm_oblique.png",
	id: 8
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Computer Component",
	description: "",
	source: "images/content/h3d/ics_top_comp_v01_0002_.png",
	thumbnail: "images/content/h3d/th/ics_top_comp_v01_0002.png",
	id: 9
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Computer Component",
	description: "",
	source: "images/content/h3d/ics_various_oblique_v01_0002_.png",
	thumbnail: "images/content/h3d/th/ics_various_oblique_v01_0002.png",
	id: 10
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Computer Component",
	description: "",
	source: "images/content/h3d/mercury_dlk_oblique_.png",
	thumbnail: "images/content/h3d/th/mercury_dlk_oblique.png",
	id: 11
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Computer Component",
	description: "",
	source: "images/content/h3d/nai_64c_oblique_.png",
	thumbnail: "images/content/h3d/th/nai_64c_oblique.png",
	id: 12
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Horn Antennas",
	description: "",
	source: "images/content/h3d/horn_ant_oblique_.png",
	thumbnail: "images/content/h3d/th/horn_ant_oblique.png",
	id: 13
});

project.get("images").add([ image ]);

system.projects.unshift(project);

//
// dice baseball html app
project = new ProjectModel({
	title: "Dice Baseball",
	abbrev: "dbb",
	type: "Game, UI",
	description: "Dice Baseball was a simple mobile game we built at Hybrid to test the iOS application deployment process. The game was written as an HTML application and packaged with PhoneGap. I created a lot of the user interface graphics, which you can see here.<br/><br/> All images are Hybrid property unless otherwise noted.",
	id: 2,
	images: new ImageCollection()
});

image = new ImageModel({
	title: "Title Screen",
	description: "Dice Baseball's title screen.",
	source: "images/content/dbb_title_menu_vct_v00_0007.png",
	id: 2
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Number of Players Select Screen",
	description: "Select one or two players.",
	source: "images/content/dbb_tem_sel_example.png",
	id: 4
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Field Select Screen",
	description: "On this screen, the players choose which field to play on. The field graphics inside the card pictures are by Katie Schrader.",
	source: "images/content/dbb_fld_sel_example.png",
	id: 3
});

project.get("images").add([ image ]);

image = new ImageModel({
	title: "Team Name Screen",
	description: "Players enter their team names on this screen.",
	source: "images/content/dbb_nam_ent_example.png",
	id: 5
});

project.get("images").add([ image ]);

system.projects.unshift(project);