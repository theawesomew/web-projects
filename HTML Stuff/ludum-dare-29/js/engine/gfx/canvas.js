define(function() {

	var Canvas = Class.extend({

		canvas: null,
		width: null,
		height: null,
		ctx: null,

		renderCanvas: null,

		init: function(width, height, view, scale) {
			this.canvas = view || document.createElement("canvas");
			this.width  = this.canvas.width = width || 16*20;
			this.height = this.canvas.height = height || 9*20;

			this.ctx = this.canvas.getContext("2d");

			this.ctx.width = this.width;
			this.ctx.height = this.height;
			this.ctx.clearAll = function(color) {
				if (color != null) {
					this.save();
					this.fillStyle = color;
					this.fillRect(0, 0, this.width, this.height);
					this.restore();
				} else {
					this.clearRect(0, 0, this.width, this.height);
				}
			}

			this.renderCanvas = document.createElement("canvas");
			this.setScale(scale);

			document.body.appendChild(this.renderCanvas);
		},

		setScale: function(scale) {
			var s;
			if (scale == null) {
				s = (window.innerWidth / this.width)|0;
				s = Math.min((window.innerHeight / this.height)|0, s);
			}
			var w = this.renderCanvas.width = this.width * s;
			var h = this.renderCanvas.height = this.height * s;

			var rctx = this.renderCanvas.getContext("2d");

			rctx['imageSmoothingEnabled']       = false;
			rctx['mozImageSmoothingEnabled']    = false;
			rctx['oImageSmoothingEnabled']      = false;
			rctx['webkitImageSmoothingEnabled'] = false;
			rctx['msImageSmoothingEnabled']     = false;

			var self = this;
			this.flip = function() {
				rctx.drawImage(self.canvas, 0, 0, w, h);
			}
		},

		flip: function() {}
	});

	
	return Canvas;

});