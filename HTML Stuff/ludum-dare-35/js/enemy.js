var Enemy = Class.extend({
	init: function (x, y, vely) {
		this.x = x;
		this.y = y;

		this.width = 20;
		this.height = 20;

		this.vel = {
			x: 0,
			y: vely
		}
	},

	update: function () {
		this.y += this.vel.y;
	},

	render: function (ctx) {
		ctx.fillStyle = "#fff";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
})