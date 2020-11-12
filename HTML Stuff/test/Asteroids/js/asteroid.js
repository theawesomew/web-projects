function Asteroid (p, s, x, y) {
	this.points = p.slice(0);

	this.x = x;
	this.y = y;

	this.size = s;

	this.MaxX = 500;
	this.MaxY = 500;

	this.rotangle = 0.02 * (Math.random() * 2 - 1);
	var r = 2 * Math.PI * Math.random();
	var v = Math.random() + 1;

	this.vel = {
		x: v * Math.cos(r),
		y: v * Math.sin(r)
	}

	this.scale = function (s) {
		for (var i = 0, len = this.points.length; i < len; i++) {
			this.points[i] *= s;
		}
	}

	this.scale(s);

	this.rotate = function (theta) {
		var c = Math.cos(theta);
		var s = Math.sin(theta);

		for (var i = 0, len = this.points.length; i < len; i += 2) {
			var x = this.points[i];
			var y = this.points[i + 1];

			this.points[i] = c * x - s * y;
			this.points[i + 1] = s * x + c * y;
		}
	}
	
	this.hasPoint = function (x, y) {
		var c = false;
		var ox = this.x;
		var oy = this.y;
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


		this.rotate(this.rotangle)
	}
}