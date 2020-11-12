function Canvas (width, height) {
	this.canvas = document.createElement('canvas'); 
	this.canvas.width = width;
	this.canvas.height = height;
	this.canvas.style = 'background: #000;';
	this.ctx = this.canvas.getContext('2d');
	document.body.appendChild(this.canvas);
}

Canvas.prototype.drawPolygon = function (p, x, y) {
	p = p.points;

	this.ctx.lineWidth = 2;
	this.ctx.beginPath();
	this.ctx.moveTo(p[0] + x, p[1] + y);
	for (var i = 2, len = p.length; i < len; i += 2) {
		this.ctx.lineTo(p[i] + x, p[i + 1] + y);
	}
	this.ctx.stroke();
};

Canvas.prototype.clear = function () {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};