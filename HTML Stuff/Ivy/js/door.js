var Door = Class.extend({
	init: function (x, y) {
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.vel = {
			x: 0,
			y: 0
		}
	},

	render: function (ctx) {
		ctx.shadowBlur = 0;
		ctx.shadowColor = null;
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
})