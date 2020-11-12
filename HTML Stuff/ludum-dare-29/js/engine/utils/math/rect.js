define(function() {

	var Rect = Class.extend({

		init: function(x, y, width, height) {
			var t = arguments.length > 2;
			this.x = t ? x : 0;
			this.y = t ? y : 0;
			this.width = t ? width : x;
			this.height = t ? height : y;
		},

		set: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;

			return this;
		},

		clone: function() {
			return new Rect(this.x, this.y, this.width, this.height);
		},

		fill: function(ctx) {
			ctx.fillRect(this.x, this.y, this.width, this.height);
		},

		stroke: function(ctx) {
			ctx.strokeRect(this.x+0.5, this.y+0.5, this.width-1, this.height-1);
		},

		within: function(x, y) {
			return this.x < x && x < this.x + this.width && this.y < y && y < this.y + this.height;
		},

		intersect: function(other) {
			var ax = this.x,
				ay = this.y,
				aw = this.width,
				ah = this.height,

				bx = other.x,
				by = other.y,
				bw = other.width,
				bh = other.height;

			return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
		}
	});


	return Rect;

});