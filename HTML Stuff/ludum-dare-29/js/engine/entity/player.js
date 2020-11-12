define([
	"engine/entity/entity",
	"engine/utils/math/vec2",
	"engine/utils/math/rect",
	"engine/gfx/sprite/animation"
], function(Entity, Vec2, Rect, Animation) {

	var States = {
		STAND:     0,
		WALK:      1,
		RUN:       2,
		ATTACK:    3,
		KNOCKBACK: 4
	}
	var DIR = {
		LEFT: 2,
		UP: 4,
		RIGHT: 8,
		DOWN: 16
	}

	var Player = Entity.extend({

		init: function(spr, sound) {
			this._super(96*16, 39*16, 8, 8);

			this.anim = {
				"stand-down": new Animation([
					[spr[0], 100]
				]),
				"stand-right": new Animation([
					[spr[5], 100]
				]),
				"stand-left": new Animation([
					[spr[9],  100]
				]),
				"stand-up": new Animation([
					[spr[13], 100]
				]),
				"walk-down": new Animation([
					[spr[0], 8],
					[spr[1], 8],
					[spr[2], 8],
					[spr[3], 8]
				]),
				"walk-right": new Animation([
					[spr[4], 8],
					[spr[5], 8],
					[spr[6], 8],
					[spr[7], 8]
				]),
				"walk-left": new Animation([
					[spr[8],  8],
					[spr[9],  8],
					[spr[10], 8],
					[spr[11], 8]
				]),
				"walk-up": new Animation([
					[spr[12], 8],
					[spr[13], 8],
					[spr[14], 8],
					[spr[15], 8]
				]),
				"attack-down": new Animation([
					[spr[16], 4],
					[spr[17], 4],
					[spr[18], 4],
					[spr[19], 4]
				]),
				"attack-right": new Animation([
					[spr[20], 4],
					[spr[21], 4],
					[spr[22], 4],
					[spr[23], 4]
				]),
				"attack-left": new Animation([
					[spr[24], 4],
					[spr[25], 4],
					[spr[26], 4],
					[spr[27], 4]
				]),
				"attack-up": new Animation([
					[spr[28], 4],
					[spr[29], 4],
					[spr[30], 4],
					[spr[31], 4]
				])
			};

			this.speed = 1;
			this._dir = new Vec2();
			this._kbvel = new Vec2();
			this._flick = 0;

			this.state = States.KNOCKBACK;

			this._atksfx = sound;

			this.dir = "down";
			this.atkdir = "";
		},

		handleInputs: function(input, camera) {
			this._dir.set(0, 0);

			if (input.isDown("left")) {
				this._dir.x -= 1;
				this.dir = "left";
			}
			if (input.isDown("up")) {
				this._dir.y -= 1;
				this.dir = "up";
			}
			if (input.isDown("right")) {
				this._dir.x += 1;
				this.dir = "right";
			}
			if (input.isDown("down")) {
				this._dir.y += 1;
				this.dir = "down";
			}

			if (input.isPressed("action") && this.state !== States.ATTACK) {
				this.state = States.ATTACK;
				this.atkdir = this.dir;
				camera.setSound2D(this._atksfx, this.getPos());
				this._atksfx.play();
				var self = this;
				this.anim["attack-" + this.dir].playOnce(function() {
					self.atkdir = "";
				});
			}

			this.vel = this._dir.scl(this.speed);
		},

		update: function(dt, map) {


			switch (this.state) {
				case States.STAND:
					break;
				case States.ATTACK:
					this.vel.set(0, 0);
					return;
				case States.KNOCKBACK:
					this._kbvel.scl(0.9);
					this.vel = this._kbvel.clone();
					if (this._kbvel.len2() <= 0.001) {
						this.state = States.STAND;
					}
					break;
			}

			if (this.state !== States.KNOCKBACK) {
				this.state = States.STAND;
				if (this.vel.len2() > 0) {
					this.state = States.WALK;
				}
			}
			map.checkCollision(this);
			this.position.addv(this.vel);
			this.position.round();

			this._flick -= this._flick > 0 ? 1 : 0;
		},

		draw: function(ctx) {
			var p = this.getPos();
			if (this._flick % 6 > 3) return;

			var a;
			switch (this.state) {
				case States.STAND:
					a = "stand-" + this.dir;
					break;
				case States.WALK:
					a = "walk-" + this.dir;
					break;
				case States.RUN:
					a = "run-" + this.dir;
					break;
				case States.ATTACK:
					a = "attack-" + this.atkdir;
					break;
				case States.KNOCKBACK:
					a = "stand-" + this.dir;
					break;
			}
			
			this.anim[a].update();
			if (this.state === States.ATTACK && this.atkdir === "") {
				this.state = States.STAND;
				a = "stand-" + this.dir;
			}
			this.anim[a].draw(ctx, p.x, p.y);
		}
	});


	return Player;

});