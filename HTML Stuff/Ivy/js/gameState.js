var GameState = State.extend({
	init: function (game) {
		this._super(game);
		this.characters = [
			new Character('Potgieter', 10, 450, 20, 20, 'cornflowerblue'),
			new Character('John', 50, 410, 80, 80, '#ff751a'),
			new Character('Bill', 150, 450, 100, 20, '#50C878'),
			new Character('Strife', 270, 460, 10, 10, 'teal')
		];

		this.currentPlayer = 0;
		this.player = this.characters[this.currentPlayer];
		this.currentLevel = null;
		this.level = null;
		this.playersNeeded = null;
		this.generateLvl(1);
	},

	generateLvl: function (stage) {
		this.currentLevel = stage;	

		switch (this.currentLevel) {
			case 1:
				this.level = new level(Level.level1);
				this.playersNeeded = 3;
				break;
			case 2:
				this.level = new level(Level.level2);
				this.playersNeeded = 2;
				this.characters[0].finished = false;
				this.characters[2].finished = false;
				this.characters[3].finished = false;
				this.characters[0].x = 10;
				this.characters[0].y = 10;
				this.characters[2].x = 40;
				this.characters[2].y = 10;
				this.characters[3].x = 170;
				this.characters[3].y = 10;
				this.level.set(0, 59, 24);
				this.level.set(4, 31, 0);
				this.level.set(4, 31, 1);
				this.level.set(4, 31, 2);
				this.level.set(4, 31, 3);
				this.player = this.characters[0];
				this.characters.splice(1,1);
				for (var i = 0; i < this.level.switch.length; i++) {
					this.level.switch[i].attach([30,0,30,1,30,2,30,3]);
				}
				break;
			case 3:
				this.level = new level(Level.level3);
				this.playersNeeded = 1;
				this.characters[0].finished = false;
				this.characters[1].finished = false;
				this.characters[0].x = 50;
				this.characters[0].y = 450;
				this.characters[1].x = 80;
				this.characters[1].y = 450;
				this.player = this.characters[0];
				this.level.set(0, 23, 24);
				this.level.set(0, 23, 23);
				this.level.set(0, 23, 22);
				this.level.set(0, 23, 21);
				this.level.set(0, 23, 20);
				this.level.set(0, 23, 19);
				this.level.set(0, 23, 18);
				this.level.set(0, 23, 17);
				this.level.set(0, 23, 16);
				this.level.set(0, 23, 15);
				this.level.set(0, 23, 14);
				this.level.set(0, 23, 13);
				this.level.set(0, 23, 12);
				this.level.set(0, 23, 11);
				this.level.set(0, 23, 10);
				this.level.set(0, 23, 9);
				this.level.set(0, 23, 8);

				this.level.set(4, 26, 33);
				this.level.set(4, 26, 34);
				this.level.set(4, 26, 35);
				this.level.set(4, 26, 36);
				this.level.set(4, 26, 37);
				this.level.set(4, 26, 38);
				this.level.set(4, 26, 39);
				this.level.set(4, 26, 40);
				this.level.set(4, 26, 41);
				this.level.set(4, 26, 42);
				this.level.set(4, 26, 43);
				this.level.set(4, 26, 44);
				this.level.set(4, 26, 45);
				this.level.set(4, 26, 46);
				this.characters.splice(2,1);
				break;
			case 4:
				this.level = new level(Level.level4);
				this.playersNeeded = 1;
				this.characters[0].finished = false;
				this.characters[0].x = 290;
				this.characters[0].y = 450;
				this.player = this.characters[0];
				this.characters.splice(1,1);
				break;
		}
	},

	handleInputs: function (input) {
		if (input.isPressed('z')) {
			this.currentPlayer = (this.currentPlayer + 1) % this.characters.length;
			this.player = this.characters[this.currentPlayer];
		}

		if (this.player.finished) {
			for (var e = 0; e < this.characters.length; e++) {
				if (!this.characters[e].finished) {
					this.player = this.characters[e];
				}
			}
		}

		if (!this.player.finished) {
			if (input.isDown('left')) {
				this.player.vel.x = -2;
			} else if (input.isDown('right')) {
				this.player.vel.x = 2;
			} else {
				this.player.vel.x = 0;
			}
		}

		if (!this.player.isJumping && input.isPressed('space') ||
			!this.player.isJumping && input.isPressed('up')) {
			var height;

			switch (this.player.name) {
				case 'Potgieter':
					height = 6
					break;
				case 'John':
					height = 3
					break;
				case 'Bill':
					height = 7.5
					break;
				case 'Strife':
					height = 7
					break;
			}

			this.player.vel.y = -height;
			this.player.isJumping = true;
		}

		if (this.level.change) {
			var self = this.level;
			self.blocks = [];
			self.end = [];
			self.switch = [];
			self.door = [];
			for (var y = 0; y < self.data.length; y++) {
				for (var x = 0; x < self.data[y].length; x++) {
					var current = self.data[y][x];
					switch (current) {
						case 0:
							break;
						case 1:
							self.blocks.push(new Block(x*10, y*10))
							break;
						case 2:
							self.end.push(new endGoal(x*10, y*10))
							break;
						case 3:
							self.switch.push(new Switch(x*10, y*10))
							break;
						case 4:
							self.door.push(new Door(x*10,y*10))
							break;
					}
				}
			}
			self.change = false;
		}
	},

	update: function () {
		this.player.x += this.player.vel.x;
		var self = this.level;

		for (var i = 0; i < this.characters.length; i++) {
			if (!this.characters.finished) {
				this.characters[i].vel.y += 0.2;
				this.characters[i].y += this.characters[i].vel.y;

				if (this.characters[i].y + this.characters[i].height >= 480) {
					this.characters[i].vel.y = 0;
					this.characters[i].y = 480 - this.characters[i].height;
					this.characters[i].isJumping = false;
				}

				if (this.characters[i].y < 0) {
					this.characters[i].vel.y = 0;
					this.characters[i].y = 0;
				}

				if (this.characters[i].x + this.characters[i].width >= 640) {
					this.characters[i].vel.x = 0;
					this.characters[i].x = 640 - this.characters[i].width;
				}

				if (this.characters[i].x < 0) {
					this.characters[i].vel.x = 0;
					this.characters[i].x = 0;
				}

				for (var j = 0; j < self.blocks.length; j++) {
					if (this.characters[i].collision(self.blocks[j])) {
						this.characters[i].checkBlockCollisionSide(self.blocks[j]);
					}
				}

				for (var l = 0; l < self.door.length; l++) {
					if (this.characters[i].collision(self.door[l])) {
						this.characters[i].checkBlockCollisionSide(self.door[l]);
					}
				}

				for (var p = 0; p < self.switch.length; p++) {
					if (this.characters[i].collision(self.switch[p])) {
						this.level.replaceVal(4, 0);
						if (this.currentLevel === 2) {
							this.level.set(1, 59, 24);
						} else {
							this.level.set(1, 23, 24);
							this.level.set(1, 23, 23);
							this.level.set(1, 23, 22);
							this.level.set(1, 23, 21);
							this.level.set(1, 23, 20);
							this.level.set(1, 23, 19);
							this.level.set(1, 23, 18);
							this.level.set(1, 23, 17);
							this.level.set(1, 23, 16);
							this.level.set(1, 23, 15);
							this.level.set(1, 23, 14);
							this.level.set(1, 23, 13);
							this.level.set(1, 23, 12);
							this.level.set(1, 23, 11);
							this.level.set(1, 23, 10);
							this.level.set(1, 23, 9);
							this.level.set(1, 23, 8);
						}
						self.switch[p].y += 10;
					}
				}
			}
		}

		for (var a = 0; a < this.characters.length; a++) {
			if (this.player !== this.characters[a]) {
				if (!this.characters[a].finished) {
					if (this.player.collision(this.characters[a])) {
						this.player.checkCollisionSide(this.characters[a]);
					}
				}
			}
		}

		for (var n = 0; n < this.characters.length; n++) {
			for (var k = 0; k < self.end.length; k++) {
				if (!this.characters[n].finished) {
					if (this.characters[n].collision(self.end[k])) {
						this.playersNeeded--;
						this.characters[n].finished = true;
					}
				}
			}
		}

		if (this.playersNeeded === 0) {
			if (this.currentLevel === 4) {
				this.game.nextState = States.CREDIT;
			} else {
				this.generateLvl(this.currentLevel+1);
			}
		}
	},

	render: function (ctx) {
		ctx.clearRect(0, 0, 640, 480);
		ctx.fillStyle = '#4688f2';
		ctx.fillRect(this.player.x + (this.player.width-5)/2, this.player.y - 10, 5, 5);
		for (var i = 0; i < this.characters.length; i++) {
			if (!this.characters[i].finished) {
				this.characters[i].render(ctx);
			}
		}
		this.level.render(ctx);
	}
})