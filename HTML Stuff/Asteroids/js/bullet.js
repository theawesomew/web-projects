var Bullet = Class.extend({

	MaxX: null,
	MaxY: null,

	init: function (x, y, angle) {
		this.x = x;
		this.y = y;

		this.shallRemove = false;

		this.vel = {
			x: 5 * Math.cos(angle),
			y: 5 * Math.sin(angle)
		}
	},

	update: function () {
		this.prevx = this.x;
		this.prevy = this.y;

		if (0 > this.x || this.x > this.MaxX ||
		0 > this.y || this.y > this.MaxY) {
			this.shallRemove = true;
		}

		this.x += this.vel.x;
		this.y += this.vel.y;
	},

	draw: function (ctx) {
		ctx.beginPath();
		ctx.moveTo(this.prevx, this.prevy);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
	}
})