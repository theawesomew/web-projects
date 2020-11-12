define([
	"engine/gfx/sprite/sprite"
], function(Sprite) {

	var instance = null;

	var SpriteCutter = Class.extend({

		init: function() {
			if (instance != null) {
				throw new Error("Cannot initate more than one SpriteCutter!");
			}
		},

		crop: function(img, twidth, theight, ox, oy) {
			ox = ox || null;
			oy = oy || null;

			var iw = img.width;
			var ih = img.height;

			var xtiles = (iw / twidth)|0;
			var ytiles = (ih / theight)|0;

			var sprites = [];
			for (var y = 0; y < ytiles; y++) {
				for (var x = 0; x < xtiles; x++) {
					sprites.push(new Sprite(img, x*twidth, y*theight, twidth, theight, ox, oy));
				}
			}
			return sprites;
		}
	});

	SpriteCutter.getInstance = function() {
		if (instance === null) {
			instance = new SpriteCutter();
		}
		return instance;
	}


	return SpriteCutter.getInstance();

});