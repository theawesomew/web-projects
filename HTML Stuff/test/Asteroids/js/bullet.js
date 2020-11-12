function Bullet (x, y, angle) {
	this.x = x;
	this.y = y;

	this.MaxX = 500;
	this.MaxY = 500;

	this.shallRemove = false;

	this.vel = {
		x: 5 * Math.cos(angle),
		y: 5 * Math.sin(angle)
	}

	this.update = function () {
		this.prevx = this.x;
		this.prevy = this.y;

		if (this.x < 0 || this.x > this.MaxX || this.y < 0 || this.y > this.MaxY) {
			this.shallRemove = true;
		}

		this.x += this.vel.x;
		this.y += this.vel.y;
	}

	this.render = function (ctx) {
		ctx.beginPath();
		ctx.moveTo(this.prevx, this.prevy);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
	}
}