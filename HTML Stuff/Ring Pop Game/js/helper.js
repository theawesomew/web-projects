function Ring (x, y, r, w, c) {
	this.x = x;
	this.y = y;
	this.radius = r;
	this.colour = c;
	this.lWidth = w;
}

Ring.prototype.draw = function (ctx) {
	ctx.strokeStyle = this.colour;
	ctx.lineWidth = this.lWidth;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.stroke();
};