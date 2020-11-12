var Canvas = Class.extend({
	init: function (width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);
	},

	clear: function () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
})