/*
	This js uses some variables found in ./config.js.
	Please include that before including this in your html.
	
	Alex Suciu - alexsuciu06@gmail.com
*/

var canvas = document.getElementById('canvas'),
	running = false,
	placedRight = [],
	muted = false;
	
function sound_click() {
	var src = (muted) ? "./static/with_sound.png" : "./static/muted.png";
	$('#sound_widget').prop("src", src);
	muted = !muted;
	$('audio').each(function(){
		this.muted = muted;
	});
}
	
function drawTemplateBike() {
	var img = new Image();

	img.onload = function() {
		$(canvas).drawImage({
			source: img,
			x: 246, y: 331,
			width: img.width / 4,
			height: img.height / 4,
			opacity: 0.1,
			fromCenter: false,
			layer: true,
			click: function(layer) { console.log(layer); }
		});
	}
	img.src = "./static/bike.png";
}

function drawParts() {
	for (var ix in imgs) {
		let image = new Image();

		image.name = imgs[ix].name;
		image.id = ix;
		image.onload = function() { renderPart(image) }
		image.src = imgs[ix].src;
	}
}

function renderPart(image) {
	let w = image.width / 4,
		h = image.height / 4;
		
	$(canvas).drawImage({
		source: image,
		x: imgs[image.id].x, 
		y: imgs[image.id].y,
		width: w, height: h,
		fromCenter: false,
		draggable: true,
		layer: true,
		bringToFront: true,
		click: function(layer) {
			if ( layer.data["class"] && layer.data["class"] != ""  ) {
				console.log("hasClass");
				layer.data["class"] = "";
				return false;
			} else {
				console.log("hasnt got claass");
				handlePartClick(layer);
			}
			},
		dragstop: function (layer) { 			
			layer.data["class"] = "noclick"; 
			console.log(layer);
			console.log("DROP"); 
			},
		mouseup: function(layer) {
			console.log("mousedown");
			checkSolution(layer);
			//return false;
			}
	});
}	

function rect(x, y, width, height) {
	$(canvas).drawRect({
			fillStyle: "transparent",
			strokeStyle: "#FFA500", // orange
			strokeWidth: "2",
			visible: true,
			x: x, y: y,
			width: width + 4,
			height: height + 4,
			fromCenter: false
		});
}

function handlePartClick(layer) {
	let name = layer.source.name;
	rect(layer.x, layer.y, layer.width, layer.height);
	
	if (running) {
		$.stopSound();
		running = false;
		return false;
	}
	if (!muted)
		_playSound(name);
	return false;
}

function checkSolution(layer) {
	// index: -1 if element is not in list, else the index where we find it
	let index = placedRight.indexOf(layer.source.name);
	
	if ( isPlacedRight(layer) ) {
		stickyLayer(layer);
		if ( index == -1 ) {
			placedRight.push(layer.source.name);
		}
		if ( placedRight.length === 7 ) {
			showCongrats();
		}
	} else {
 
		if ( index != -1 ) {
			placedRight.splice(index, 1);
		}
	}
}

function isPlacedRight(layer) {
	let sol = solutions[layer.source.name],
		dx = Math.abs(layer.x - sol.x),
		dy = Math.abs(layer.y - sol.y);
		
	return (dx < 15 && dy < 15);
	
}

function stickyLayer(layer) {
	let name = layer.source.name,
		sol = solutions[name];
	
	layer.x = sol.x;
	layer.y = sol.y;
}

function randomCongratsGIF() {
	let r = Math.floor(1 + 7 * Math.random()); // random int in [1, 7]
	return "\"./static/congrats/solved" + r + ".gif\"";
}

function showCongrats() {
	var congratsImg = randomCongratsGIF();
	$('#content').html(
		"<div id=\"congrats_heder\">FELICITĂRI !!!</div>"
	  +	"<img id=\"congrats_gif\" src=" + congratsImg + " />"
		);
}

function _playSound(name) {
	console.log(muted);
	if (muted) return;

	if (sounds[name]) {
		running = true;
		$.playSound(sounds[name])
			.on("ended", function() {
				running = false;
			});
	}
}