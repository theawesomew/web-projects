define([
	"engine/utils/math/vec2",
	"engine/utils/math/rect"
], function(Vec2, Rect) {

	var Entity = Class.extend({

		init: function(x, y, width, height) {
			this.position = new Vec2(x || 0, y || 0);
			this.vel = new Vec2();

			this.bbox = new Rect();
			this.setBBox(width, height);
		},

		setPos: function() {
			var x, y;
			if (arguments.length === 1) {
				x = arguments[0].x;
				y = arguments[0].y;
			} else {
				x = arguments[0];
				y = arguments[1];
			}
			x += this.bbox.width2 + 4;
			y += this.bbox.height2 + 4;
			this.position.setp(x, y);
			return this;
		},

		getPos: function() {
			var p = this.position.clone();
			p.x |= 0;
			p.y |= 0;
			return p;
		},

		getVel: function() {
			return this.vel.clone();
		},

		setBBox: function(width, height) {
			this.bbox.width  = this.width  = width  || 10;
			this.bbox.height = this.height = height || 10;
			this.bbox.width2  = this.width/2;
			this.bbox.height2 = this.height/2;
			return this;
		},

		getBBox: function() {
			var p = this.getPos();
			return this.bbox;
		},

		update: function(dt) {

		},

		draw: function(ctx) {

		},

		drawBBox: function(ctx) {
			var p = this.getPos();
			ctx.fillRect(p.x-this.bbox.width2, p.y-this.bbox.height2, this.width, this.height);
		}
	});

	Entity.Type = {
		Player: 0,
		Enemy: 1
	}


	return Entity;

});