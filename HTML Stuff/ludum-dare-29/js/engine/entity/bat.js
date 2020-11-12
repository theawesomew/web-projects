define([
	"engine/entity/entity",
	"engine/utils/math/vec2"
], function(Entity, Vec2) {

	var Bat = Entity.extend({

		init: function(x, y, player) {
			this._super(x, y, null);

			this.type = Entity.Type.Enemy;
			this.power = 10;

			this.pl = player;
			this.vel = new Vec2();
		},

		update: function(dt) {
			this.position.addv(this.vel);
			this.vel.scl(0.98);

			if (this.vel.len2() <= 0.01 && this.pl.getPos().subv(this.getPos()).len2() < 50*50) {
				this.vel = this.pl.getPos().subv(this.getPos()).nor().scl(2);
			}
		},

		draw: function(ctx) {
			var v = this.getPos();
			ctx.fillRect(v.x, v.y, 10, 10);
		}
	});


	return Bat;

});