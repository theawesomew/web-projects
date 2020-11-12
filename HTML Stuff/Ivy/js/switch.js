var Switch = Class.extend({
	init: function (x, y) {
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.active = false;
		this.attached = null;
		this.vel = {
			x: 0,
			y: 0
		}
	},

	attach: function (data) {
		this.attached = data;
	},

	render: function (ctx) {
		ctx.shadowBlur = 0;
		ctx.shadowColor = null;
		ctx.fillStyle = "darkblue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	} 
})