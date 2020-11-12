function Bird (x, y) {
	this.x = x;
	this.y = y;
	this.radius = 12;
	this.animation = [0,1,2,1];
	this.frame = 0;
	this.velocity = 0;
	this.gravity = 0.2;
	this.rotation = 0;
	this._jump = 4.6;
	this.weights = null;

 	this.generateWeights = function (x) {
 		var _w = []
 		for (var i = 0; i < x; i++) {
 			_w.push(Math.random());
 		}
 		this.weights = tf.tensor(_w, [_w.length, 1]);
 	}

	this.jump = function () {
		this.velocity = -this._jump;
	};

	this.update = function () {
		var n = 10;
		this.frame += frames % n === 0 ? 1 : 0;
		this.frame %= this.animation.length;

		this.velocity += this.gravity;
		this.y += this.velocity;

		if (this.y >= height - s_fg.height - this.radius) {
			this.y = height - s_fg.height - this.radius;
			console.log('dead');
		}

		if (this.velocity >= this._jump) {
			this.rotation = Math.min(Math.PI/2, this.rotation + 0.3);
		} else {
			this.rotation = -0.3;
		}

		if (this.y <= 0) {
			this.y = 0;
		}

		if (frames % Math.round(50 * Math.random()) === 0) {
			this.jump();
		}
	};

	this.draw = function (ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		var n = this.animation[this.frame];
		s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2);
		ctx.restore();
	};
}