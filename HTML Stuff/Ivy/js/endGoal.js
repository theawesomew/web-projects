var endGoal = Class.extend({
	init: function (x, y) {
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
	},

	render: function (ctx) {
		ctx.shadowBlur = 10;
		ctx.shadowColor = 'white';
		ctx.fillStyle = 'white';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
})