var Board = Class.extend({
	rows: 8,
	cols: 8,

	init: function (width, height) {
		this.width = width;
		this.height = height;
		this._data = [];

		for (var y = 0; y < this.rows; y++) {
			this._data.push([]);
			for (var x = 0; x < this.cols; x++) {
				if (y === 0 || y === this.rows-1) {
					switch (true) {
						case (x === 0 || x === this.cols-1):
							this._data[y].push(Piece.CASTLE)
							break;
						case (x === 1 || x === this.cols-2):
							this._data[y].push(Piece.KNIGHT);
							break;
						case (x === 2 || x === this.cols-3):
							this._data[y].push(Piece.BISHOP);
							break;
						case (x === 3):
							this._data[y].push(Piece.QUEEN);
							break;
						case (x === 4):
							this._data[y].push(Piece.KING);
							break;
					}
				} else if (y === 1 || y === this.rows-2) {
					this._data[y].push(Piece.PAWN);
				} else {
					this._data[y].push(Piece.EMPTY);
				}
			}
		}
	},

	set: function (val, x, y) {
		this._data[y][x] = val;
	},

	get: function (x, y) {
		return this._data[y][x];
	},

	render: function (ctx) {
		var size = this.width/this.cols;
		for (var y = 0; y < this.rows; y++) {
			for (var x = 0; x < this.cols; x++) {
				var n = y % 2 === 0 ? y*this.cols+x+1 : y*this.cols+x;
				switch (true) {
					case (n % 2 == 0):
						ctx.fillStyle = 'black';
						break;
					case (n % 2 != 0):
						ctx.fillStyle = 'white';
						break;
				} 
				ctx.fillRect(x * size, y * size, size, size);
			}
		}
	}
})