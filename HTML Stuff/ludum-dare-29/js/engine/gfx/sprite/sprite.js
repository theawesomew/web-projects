define(function() {

	var Sprite = Class.extend({

		init: function(img, x, y, width, height, ox, oy) {
			this.img = img;
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;

			this.ox = ox || -width/2;
			this.oy = oy || -height/2;
		},

		draw: function(ctx, x, y) {
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x+this.ox, y+this.oy, this.width, this.height);
		}
	});


	return Sprite;

});