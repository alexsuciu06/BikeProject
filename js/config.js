var imgs = [
	{
		src: "./static/parts/ax_jos.png", 
		name: "ax_jos", 
		x: 787, 
		y: 206 
	}, 
	{
		src: "./static/parts/cadru.png", 
		name: "cadru", 
		x: 539, 
		y: 3
	}, 
	{
		src: "./static/parts/front_tyre.png", 
		name: "front_tyre", 
		x: 983, 
		y: 47
	}, 
	{
		src: "./static/parts/ghidon.png", 
		name: "ghidon", 
		x: 6, 
		y: 6
	}, 
	{
		src: "./static/parts/pedala.png", 
		name: "pedala", 
		x: 41, 
		y: 289
	}, 
	{
		src: "./static/parts/roata_spate.png", 
		name: "roata_spate", 
		x: 194, 
		y: 16
	},
	{
		src: "./static/parts/sezut.png", 
		name: "sezut", 
		x: 842, 
		y: 28
	} 
];

//Puzzle solutions for each part
var solutions = {
	ax_jos : {
		x: 498, y: 465
	},
	pedala: {
		x: 574, y: 609
	},
	cadru: {
		x: 499, y: 425
	},
	roata_spate: {
		x: 675, y: 499
	},
	sezut: {
		x: 682, y: 405
	},
	front_tyre: {
		x: 247, y: 487
	},
	ghidon: {
		x: 415, y: 330
	}
}
				
			
var sounds = {
	ghidon: "./static/mp3/ghidonul.mp3",
	ax_jos: "./static/mp3/cadrul.mp3",
	cadru: "./static/mp3/cadrul.mp3",
	pedala: "./static/mp3/pedalier.mp3",
	sezut: "./static/mp3/saua.mp3",
	front_tyre: "./static/mp3/roataFata.mp3",
	roata_spate: "./static/mp3/roataSpate.mp3",
};