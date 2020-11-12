var level = Class.extend({
	init: function (data) {
		this.data = data;
		this.blocks = [];
		this.end = [];
		this.switch = [];
		this.door = [];
		this.change = false;

		for (var y = 0; y < this.data.length; y++) {
			for (var x = 0; x < this.data[y].length; x++) {
				var current = this.data[y][x];
				switch (current) {
					case 0:
						break;
					case 1:
						this.blocks.push(new Block(x*10, y*10))
						break;
					case 2:
						this.end.push(new endGoal(x*10, y*10))
						break;
					case 3:
						this.switch.push(new Switch(x*10, y*10))
						break;
					case 4:
						this.door.push(new Door(x*10,y*10))
						break;
				}
			}
		}
	},

	get: function (x, y) {
		return this.data[y][x];
	},

	set: function (val, x, y) {
		this.data[y][x] = val;
		this.change = true;
	},

	replaceVal: function (value, value2) {
		for (var y = 0; y < this.data.length; y++) {
			for (var x = 0; x < this.data[y].length; x++) {
				if (this.get(x, y) == value) {
					this.set(value2, x, y);
					console.log(this.get(x,y));
				}
			}
		}
	},

	render: function (ctx) {
		for (var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].render(ctx);
		}

		for (var j = 0; j < this.end.length; j++) {
			this.end[j].render(ctx);
		}

		for (var k = 0; k < this.switch.length; k++) {
			this.switch[k].render(ctx);
		}

		for (var l = 0; l < this.door.length; l++) {
			this.door[l].render(ctx);
		}
	}
})