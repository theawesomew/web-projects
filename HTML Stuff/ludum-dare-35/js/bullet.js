var Bullet = Class.extend({

	MaxX: 600,
	MaxY: 337,

	init: function (x, y, vely, w, h, colour) {
		this.x = x;
		this.y = y;
		this.vely = vely;
		this.width = w;
		this.height = h;
		this.colour = colour;

		this.shallRemove = false;
	},

	update: function () {
		this.y += this.vely;

		if (this.x >= this.MaxX || this.x < 0 || this.y >= this.MaxY || this.y < 0) {
			this.shallRemove = true;
		}
	},

	render: function (ctx) {
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
})