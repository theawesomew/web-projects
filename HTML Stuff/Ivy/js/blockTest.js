var Block = Class.extend({
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
		ctx.fillStyle = '#888'
		ctx.fillRect(this.x, this.y, 10, 10);
	}
})