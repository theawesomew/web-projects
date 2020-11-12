var Player = Class.extend({

	MaxX: 600,
	MaxY: 337,

	init: function (x, y) {
		this.x = x;
		this.y = y;

		this.width = 30;
		this.height = 40;

		this.vel = {
			x: 0,
			y: 0
		}
	},

	update: function () {
		this.x += this.vel.x;
		this.y += this.vel.y;

		if (this.x + 30 >= this.MaxX) {
			this.x = this.MaxX - 30;
		} else if (this.x <= 0) {
			this.x = 0;
		}

		if (this.y + 40 >= this.MaxY) {
			this.y = this.MaxY - 40;
		} else if (this.y <= 0) {
			this.y = 0;
		}
	},

	render: function (ctx) {
		ctx.fillStyle = "#fff";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
});