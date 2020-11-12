function createGrid () {
	this.grid = null;
}

createGrid.prototype.init = function (d, c, r) {
	this.grid = [];
	for(var x = 0; x < c; x++) {
		this.grid.push([]);
		for (var y = 0; y < r; y++) {
			this.grid[x].push(d);
		}
	}
}

createGrid.prototype.set = function (val, x, y) {
	this.grid[x][y] = val;
};

createGrid.prototype.get = function (x, y) {
	return this.grid[x][y];
};

createGrid.prototype.checkSurround = function (x, y) {
	var count = 0;

	for (var offx = -1; offx <= 1; offx++) {
		for (var offy = -1; offy <= 1; offy++) {
			var dx = x + offx;
			var dy = y + offy;

			if (dx >= 0 && dy >= 0 && dx <= cols-1 && dy <= rows-1) {
				if (this.get(dx, dy) === states.alive) {
					if (offx === 0 && offy === 0) {
						count = count;
					} else {
						count++;
					}
				}
			}
		}
	}

	return count;
};

