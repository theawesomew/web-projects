var Ship = Polygon.extend({
	MaxX: null,
	MaxY: null,

	init: function (p, pf, s, x, y) {
		this._super(p);

		this.flames = new Polygon(pf);
		this.flames.scale(s);

		this.drawFlames = false;
		this.visible = true;

		this.x = x;
		this.y = y;

		this.scale(s);

		this.angle = 0;

		this.vel = {
			x: 0,
			y: 0
		}
	},

	collide: function (astr) {
		
		if (!this.visible) {
			return false;
		}

		for (var i = 0, len = this.points.length - 2; i < len; i += 2) {
			var x = this.points[i] + this.x;
			var y = this.points[i + 1] + this.y;

			if (astr.hasPoint(x, y)) {
				return true;
			}

			return false;
		}
	},

	shoot: function () {
		var b = new Bullet(this.points[0] + this.x, this.points[1] + this.y, this.angle);
		b.MaxX = this.MaxX;
		b.MaxY = this.MaxY;
		return b;
	},

	addVel: function () {
		if (this.vel.x * this.vel.x + this.vel.y * this.vel.y < 20 * 20) {
			this.vel.x += 0.05 * Math.cos(this.angle);
			this.vel.y += 0.05 * Math.sin(this.angle);
		}

		this.drawFlames = true;
	},

	rotate: function (theta) {
		this._super(theta);

		this.flames.rotate(theta);
		this.angle += theta;
	},

	update: function () {
		this.x += this.vel.x;
		this.y += this.vel.y;

		this.vel.x *= 0.99;
		this.vel.y *= 0.99;

		if (this.x > this.MaxX) {
			this.x = 0;
		} else if (this.x < 0) {
			this.x = this.MaxX;
		}

		if (this.y > this.MaxY) {
			this.y = 0;
		} else if (this.y < 0) {
			this.y = this.MaxY;
		}
	},

	draw: function (ctx) {
		if (!this.visible) {
			return;
		}
		ctx.drawPolygon(this, this.x, this.y);
		if (this.drawFlames) {
			ctx.drawPolygon(this.flames, this.x, this.y);
			this.drawFlames = false;
		}
	}
});