var Character = Class.extend({
	init: function (n, x, y, w, h, c) {
		this.name = n;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.colour = c;
		this.density = 400;
		this.mass = (w * h) / this.density;
		this.vel = {
			x: 0,
			y: 0
		}
		this.isJumping = false;
		this.finished = false;
	},

	collision: function (a) {
		return a.x < this.x + this.width && 
			   this.x < a.x + a.width && 
			   a.y < this.y + this.height && 
			   this.y < a.y + a.height;
	},

	checkCollisionSide: function (b) {
		var ab = this.y + this.height,
			ar = this.x + this.width,
			bb = b.y + b.height,
			br = b.x + b.width,

			tc = ab - b.y,
			bc = bb - this.y,
			lc = ar - b.x,
			rc = br - this.x;

			// Bottom is touching something
			if (tc < bc && tc < lc && tc < rc) {
				this.vel.y = 0;
				this.y = b.y - this.height;
				this.isJumping = false;
			} 

			// Top is touching something
			if (bc < tc && bc < lc && bc < rc){
				b.vel.y = 0;
				b.y = this.y - b.height;
				this.y = b.y + b.height;
			}

			// Right side is touching something
			if (lc < rc && lc < tc && lc < bc) {
				this.x = b.x - this.width;
			} 

			// Left side is touching something
			if (rc < lc && rc < tc && rc < bc) {
				this.x = b.x + b.width;
			}
	},

	checkBlockCollisionSide: function (b) {
		var ab = this.y + this.height,
			ar = this.x + this.width,
			bb = b.y + b.height,
			br = b.x + b.width,

			tc = ab - b.y,
			bc = bb - this.y,
			lc = ar - b.x,
			rc = br - this.x;

			// Bottom is touching something
			if (tc < bc && tc < lc && tc < rc) {
				this.vel.y = 0;
				this.y = b.y - this.height;
				this.isJumping = false;
			} 

			// Top is touching something
			if (bc < tc && bc < lc && bc < rc){
				b.vel.y = 0;
				this.vel.y = 0;
				this.y = b.y + b.height;
			}

			// Right side is touching something
			if (lc < rc && lc < tc && lc < bc) {
				this.x = b.x - this.width;
			} 

			// Left side is touching something
			if (rc < lc && rc < tc && rc < bc) {
				this.x = b.x + b.width;
			}
	},
 
	render: function (ctx) {
		ctx.shadowBlur = 0;
		ctx.shadowColor = null;
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
})