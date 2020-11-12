var 

canvas,
ctx,
width,
height,
img,

fgpos = 0,
frames = 0,
score = 0,
best = 0,
distance = 0,
deadBirds = 0,

genetics,

allDead = false,

currentstate,
states = {
	Menu: 0, Game: 1, GameOver: 2
},

birds = [],
pipes = {
	_pipes: [],
		
	reset: function () {
		this._pipes = [];
	},
	
	update: function (){
		if(frames % 100 === 0 || frames === 0){
			var _y = height - (s_pipeSouth.height + s_fg.height + 120 + 200 * Math.random());
			this._pipes.push({
				x: 450,
				y: _y,
				width: s_pipeSouth.width,
				height: s_pipeSouth.height
			});
		}
		for (var i = 0, len = this._pipes.length; i < len; i++){
			var p = this._pipes[i];
			for (var j = 0, len2 = birds.length; j < len2; j++) {
				var bird = birds[j];
				if (i === 0){
					score += p.x === bird.x ? 1 : 0;
				
					var cx = Math.min(Math.max(bird.x, p.x), p.x + p.width);
					var cy1 = Math.min(Math.max(bird.y, p.y), p.y + p.height);
					var cy2 = Math.min(Math.max(bird.y, p.y + p.height + 80), p.y + 2 * p.height + 80);
					
					var dx = bird.x - cx;
					var dy1 = bird.y - cy1;
					var dy2 = bird.y - cy2;
					
					var d1 = dx * dx + dy1 * dy1;
					var d2 = dx * dx + dy2 * dy2;
					
					var r = bird.radius * bird.radius;
				
					if(r > d1 || r > d2){
						bird.isDead = true;
					}
				}
			}
			
			p.x -= 2;
			if(p.x < -50){
				this._pipes.splice(i, 1);
				i--;
				len--;
			}
			
		}
	},
	
	draw: function (ctx) {
		for(var i = 0, len = this._pipes.length; i < len; i++){
			var p = this._pipes[i];
			s_pipeSouth.draw(ctx, p.x, p.y);
			s_pipeNorth.draw(ctx, p.x, p.y + 80 + p.height);
		}
	}
};

function createBirds (n) {
	for (var i = 0; i < n; i++) {
		var _y = genetics.random(0,300)
		birds.push(new Bird(60, _y, i));
	}
}

function main () {
	canvas = document.createElement("canvas");
	width = canvas.width = 320;
	height = canvas.height = 480;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);

	currentstate = states.Game;
	
	genetics = new GeneticAlgorithm(20,4);
	genetics.reset();
	genetics.createPopulation();
	
	// Generate the birds
	createBirds(genetics.max_units);

	img = new Image();
	img.onload = function () {
		initSprites(this);
		run();
	}
	img.src = 'res/spritesheet.png';
}

function run () {
	var rf = (function (){
		return window.requestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||

				function (cb, el) {
					window.setTimeout(cb, 1000/60);
				}	   
		})();

	var loop = function (){
		update();
		render();
			
		rf(loop, canvas);
	}
	rf(loop, canvas);
}

function update () {
	if (currentstate === states.Game) {
		best = Math.max(best, score);
		
		fgpos = (fgpos - 2) % 14;
	
		pipes.update();
	
		for (var i = 0, len = birds.length; i < len; i++) {
			var b = birds[i];
		
			b.update();
		
			if (b.isDead) {
				genetics.population[b.index].fitness = b.fitness;
				genetics.population[b.index].score = b.score;
			}
		
			if (!b.isDead) {
				b.fitness = distance;
				b.score = score;
				
				genetics.activateBrain(b, pipes._pipes[0]);
			}
		}
		
		for (var j = 0, len2 = birds.length; j < len2; j++) {
			var b = birds[j]
			if (b.isDead) {
				deadBirds++;
				if (deadBirds === birds.length) {
					currentstate = states.GameOver;
				}
			}
		}
		
		deadBirds = 0;
	
		frames++;
		distance += 2;
	}
	
	if (currentstate === states.GameOver) {
		genetics.evolvePopulation();
		genetics.iteration++;
		frames = 0;
		score = 0;
		distance = 0;
		birds.splice(0,birds.length);
		createBirds(genetics.max_units);
		deadBirds = 0;
		pipes.reset();	
		currentstate = states.Game;
	}
}

function render () {
	ctx.clearRect(0,0,width,height);

	ctx.fillStyle = s_bg.color;
	ctx.fillRect(0,0,width,height);

	s_bg.draw(ctx, 0, height - s_bg.height);
	s_bg.draw(ctx, s_bg.width, height - s_bg.height);

	
	for (var i = 0, len = birds.length; i < len; i++) {
		var b = birds[i];
		if (!b.isDead) {
			b.draw(ctx);
		}
	}
	pipes.draw(ctx);

	s_fg.draw(ctx, fgpos, height - s_fg.height);
	s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height);
	
	ctx.fillStyle = 'white';
	ctx.fillText("Score: " + score/birds.length, 240, 10);
	ctx.fillText("Best: " + best/birds.length, 240, 20);
	ctx.fillText("Generation: " + genetics.iteration, 240, 30);
}

main();
