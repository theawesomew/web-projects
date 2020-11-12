// Sprites

var 

s_bird,
s_bg,
s_fg,
s_pipeNorth,
s_pipeSouth,
s_text,
s_score,
s_splash,
s_buttons,
s_numberS,
s_numberB;


function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x*2;
	this.y = y*2;
	this.width = width*2;
	this.height = height*2;
};
Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, this.width, this.height);
};

function initSprites(img) {

	s_bird = [
		new Sprite(img, 156, 115, 17, 12),
		new Sprite(img, 156, 128, 17, 12),
		new Sprite(img, 156, 141, 17, 12)
	];
	
	s_bg = new Sprite(img,   0, 0, 138, 114);
	s_bg.color = "#70C5CF";
	s_fg = new Sprite(img, 138, 0, 112,  56);
	
	s_pipeNorth = new Sprite(img, 251, 0, 26, 200);
	s_pipeSouth = new Sprite(img, 277, 0, 26, 200);
	
	s_text = {
		FlappyBird: new Sprite(img, 59, 114, 96, 22),
		GameOver:   new Sprite(img, 59, 136, 94, 19),
		GetReady:   new Sprite(img, 59, 155, 87, 22)
	}
	s_buttons = {
		Rate:  new Sprite(img,  79, 177, 40, 14),
		Menu:  new Sprite(img, 119, 177, 40, 14),
		Share: new Sprite(img, 159, 177, 40, 14),
		Score: new Sprite(img,  79, 191, 40, 14),
		Ok:    new Sprite(img, 119, 191, 40, 14),
		Start: new Sprite(img, 159, 191, 40, 14)
	}

	s_score  = new Sprite(img, 138,  56, 113, 58);
	s_splash = new Sprite(img,   0, 114,  59, 49);

	s_numberS = new Sprite(img, 0, 177, 6,  7);
	s_numberB = new Sprite(img, 0, 188, 7, 10);

	s_numberS.draw = s_numberB.draw = function(ctx, x, y, num, centre, offset) {
		num = num.toString();
		var step = this.width + 2;
		if(centre){
			x = centre - num.length * step/2 - 2;
		}
		if(offset) {
			x += step * (offset - num.length);
		}
		for (var i = 0, len = num.length; i < len; i++) {
			var n = parseInt(num[i]);
			ctx.drawImage(img, step*n, this.y, this.width, this.height,
				x, y, this.width, this.height)
			x += step;
		}
	}
}

// Bird

function Bird (x, y, indx) {
	this.x = x;
	this.y = y;
	this.index = indx;
	this.frame = 0;
	this.velocity = 0;
	this.animation = [0,1,2,1];
	this.rotation = 0;
	this.radius = 12;
	this.gravity = 0.25;
	this._jump = 4.6;
	this.isDead = false;
	this.currentScore = 0;
	this.currentFitness = 0;

	this.jump = function () {
		this.velocity = -this._jump;
	}

	this.update = function () {
		this.frame = frames % 5 === 0 ? 1 : 0;
		this.frame %= this.animation.length;

		this.velocity += this.gravity;
		this.y += this.velocity;

		if (this.y >= height - s_fg.height - 10) {
			this.isDead = true;
		}
		
		if (this.y <= 0) {
			this.y = 0;
		}

		if (this.velocity >= this.jump) {
			this.frame = 1;
			this.rotation = Math.min(Math.PI/2, rotation + 0.3);
		} else {
			this.rotation = -0.3;
		}
	}

	this.draw = function (ctx) {
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.rotate(this.rotation);
		var n = this.animation[this.frame];
		s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2);
		ctx.restore();
	}
}
