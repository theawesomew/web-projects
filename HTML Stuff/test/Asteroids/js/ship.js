function Ship (p, x, y) {
	this.points = p.slice(0);

	this.x = x;
	this.y = y;

	this.MaxX = 500;
	this.MaxY = 500;

	this.angle = 0;

	this.visible = true;

	this.vel = {
		x: 0,
		y: 0
	}

	this.shoot = function () {
		var b = new Bullet(this.points[0] + this.x, this.points[1] + this.y, this.angle);
		b.MaxX = this.MaxX;
		b.MaxY = this.MaxY;
		return b;
	}

	this.addVel = function () {
		if (this.vel.x * this.vel.x + this.vel.y * this.vel.y < 20 * 20) {
			this.vel.x += 0.05 * Math.cos(this.angle);
			this.vel.y += 0.05 * Math.sin(this.angle);
		}
	}

	this.collide = function (a) {
		for (var i = 0, len = this.points.length - 2; i < len; i += 2) {
			var x = this.points[i] + this.x;
			var y = this.points[i + 1] + this.y;

			if (a.hasPoint(x, y)) {
				return true;
			}

			return false;
		}
	}

	this.scale = function (s) {
		for (var i = 0, len = this.points.length; i < len; i++) {
			this.points[i] *= s;
		}
	}

	this.rotate = function (theta) {
		var c = Math.cos(theta);
		var s = Math.sin(theta);

		for (var i = 0, len = this.points.length; i < len; i += 2) {
			var x = this.points[i];
			var y = this.points[i + 1];

			this.points[i] = c * x - s * y;
			this.points[i + 1] = s * x + c * y;
		}

		this.angle += theta;
	}
	
	this.hasPoint = function (ox, oy, x, y) {
		var c = false;
		var p = this.points;
		var len = p.length;
		for (var i = 0, j = len-2; i < len; i += 2) {
			var px1 = p[i] + ox, px2 = p[j] + ox,
		 	py1 = p[i+1] + oy, py2 = p[j+1] + oy;

			if (( py1 > y != py2 > y ) && ( x < (px2-px1) * (y-py1) / (py2-py1) + px1 )) {
				c = !c;
			}
			j = i;
		}
		return c;
	}

	this.update = function () {
		this.x += this.vel.x;
		this.y += this.vel.y;

		this.vel.x *= 0.99;
		this.vel.y *= 0.99;

		if (this.x < 0) {
			this.x = this.MaxX;
		} else if (this.x > this.MaxX) {
			this.x = 0;
		}

		if (this.y < 0) {
			this.y = this.MaxY;
		} else if (this.y > this.MaxY) {
			this.y = 0;
		}	
	}
}