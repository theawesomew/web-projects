var Canvas = Class.extend({
	init: function (width, height) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width = width;
		this.canvas.height = this.height = height;
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);
	},

	animate: function (loop) {
		var rf = (function () {
			return window.requestAnimationFrame ||
				   window.webkitRequestAnimationFrame ||
				   window.mozRequestAnimationFrame ||
				   window.oRequestAnimationFrame ||
				   window.msRequestAnimationFrame ||

				   function (cb, el) {
				   		window.setTimeout(cb, 1000/60);
				   }
		})();

		var self = this;
		var l = function () {
			loop();
			rf(l, self.canvas);
		}
		rf(l, self.canvas);
	}
})