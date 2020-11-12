define([
	"engine/world/scene",
	"engine/utils/preloader",
	"scene/gamescene",
	"engine/gfx/animation/tween",
	"engine/gfx/animation/tweenmanager"
], function(Scene, PreLoader, GameScene, Tween, TweenManager) {

	function createLayerItem(name) {
		return {
			pos: {
				x: 0,
				y: 0,
				op: 1,
			},
			img: PreLoader.get(name),
			draw: function(ctx) {
				ctx.save();
				if (this.pos.op < 1) {
					ctx.globalAlpha = this.pos.op;
				}
				var x = Math.round(this.pos.x);
				var y = Math.round(this.pos.y);
				ctx.drawImage(this.img, x, y);
				ctx.restore();
			}
		}
	}

	var MenuScene = Scene.extend({

		create: function() {
			this.t1 = createLayerItem("title1");
			this.t2 = createLayerItem("title2");
			this.t3 = createLayerItem("title3");
			this.t4 = createLayerItem("title4");
			this.t5 = createLayerItem("title5");
			this.t6 = createLayerItem("title6");

			this.music = PreLoader.get("m_title");
			this.music.play();

			new Tween(this.t2.pos).set({y: -2}).to({y: 0}, 180);

			new Tween(this.t3.pos).set({y: 0}).to({y: 4}, 180);

			new Tween(this.t4.pos).set({y: 20}).to({y: 0}, 180);

			var self = this;
			new Tween(this.t6.pos)
				.set({op: 0})
				.wait(200)
				.to({op: 1}, 50)
				.wait(60)
				.call(function() {
					self.t5.pos.op = 1;
				});
			this.t5.pos.op = 0;
			this.t5.frames = 0;

		},

		handleInputs: function(input) {
			if (this.t5.pos.op > 0 && input.isPressed("action")) {
				this.music.stop();
				this.game.changeScene(GameScene);
			}
		},

		update: function(dt) {
			if (this.t5.pos.op > 0) {
				this.t5.pos.op = Math.abs(Math.cos(this.t5.frames++/20))+0.001;
			}
			TweenManager.update(1);
		},

		render: function(ctx) {
			this.t1.draw(ctx);
			this.t2.draw(ctx);
			this.t3.draw(ctx);
			this.t4.draw(ctx);
			this.t5.draw(ctx);
			this.t6.draw(ctx);
		}
	});


	return MenuScene;

});