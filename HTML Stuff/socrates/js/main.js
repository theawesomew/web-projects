var canvas, width, height, ctx, img,

fgpos = 0,
score = 0,
frames = 0,
currentState,

states = {
	MENU: 0, SPLASH: 1, GAME: 2, SCORE: 3
},

bird = [new Bird(50, Math.round(Math.random()*100)),
		new Bird(50, Math.round(Math.random()*100)),
		new Bird(50, Math.round(Math.random()*100)),
		new Bird(50, Math.round(Math.random()*100))],

pipes = {
	_pipes: [],

	reset: function () {
		this._pipes = [];
	},

	update: function () {
		if (frames % 100 == 0) {
			var _y = height - (s_pipeSouth.height + s_fg.height + 120 + 150 * Math.random());

			this._pipes.push({
				x: 500,
				y: _y,
				width: s_pipeSouth.width,
				height: s_pipeSouth.height
			})
		}

		var b;

		for (var j = 0; j < bird.length; j++) {
			b = bird[j];
		}

		for (var i = 0; i < this._pipes.length; i++) {
			var p = this._pipes[i];

			p.x -= 2;

			if (i === 0) {

				var cx = Math.min(Math.max(b.x, p.x), p.x + p.width);
				var cy1 = Math.min(Math.max(b.y, p.y), p.y + p.height);
				var cy2 = Math.min(Math.max(b.y, p.y + p.height + 80), p.y + 2 * p.height);

				var dx = b.x - cx;
				var dy1 = b.y - cy1;
				var dy2 = b.y - cy2;

				var d1 = dx * dx + dy1 * dy1;
				var d2 = dx * dx + dy2 * dy2;

				var r = b.radius * b.radius;

				if (r > d1 || r > d2) {
					currentState = states.SCORE;
				}

			}

			if (p.x < -50) {
				this._pipes.splice(i,1);
			}
		}
	},

	draw: function (ctx) {
		for (var i = 0; i < this._pipes.length; i++) {
			var p = this._pipes[i];
			s_pipeSouth.draw(ctx, p.x, p.y);
			s_pipeNorth.draw(ctx, p.x, p.y + p.height + 80)
		}
	}
};

function main () {
	canvas = document.createElement("canvas");
	width = canvas.width = 270;
	height = canvas.height = 1.5 * width;
	ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);

	currentState = states.GAME;

	img = new Image();
	img.onload = initSprites(img);
	img.src = "res/sheet.png";

	for (var i = 0; i < bird.length; i++) {
		bird[i].generateWeights(4);
		bird[i].weights.print();
	}

	init();
}

function init () {
	var loop = function () {
		update();
		render();
		window.requestAnimationFrame(loop);
	}
	window.requestAnimationFrame(loop);
}

function update () {
	console.log(currentState);

	frames++;

	if (currentState == states.GAME){ 
		fgpos = (fgpos - 2) % 14;
		pipes.update();
		for (var j = 0; j < bird.length; j++) {
			bird[j].update();
		}
	}
}

function render () {
	ctx.fillStyle = s_bg.color;
	ctx.fillRect(0, 0, width, height);
	s_bg.draw(ctx, 0, height - s_fg.height - s_bg.height);
	pipes.draw(ctx);
	for (var j = 0; j < bird.length; j++) {
		bird[j].draw(ctx);
	}
	s_fg.draw(ctx, fgpos, height - s_fg.height);
	s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height);

	var width2 = width / 2;
}

main();