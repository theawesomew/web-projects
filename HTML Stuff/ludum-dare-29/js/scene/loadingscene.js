define([
	"engine/world/scene",
	"engine/utils/preloader",
	"scene/menuscene"
], function(Scene, PreLoader, MenuScene) {

	var LoadingScene = Scene.extend({

		create: function() {

			var w = this.game.canvas.width;

			this.bar = {
				width: w/2,
				height: 2,
				x: (w - w/2)/2,
				y: (this.game.canvas.height - 2)/2,
				progress: 0,
				color: "#fff"
			}

		},

		update: function(dt) {
			var target = PreLoader.progress();
			this.bar.progress += target >= 1 ? 1 : (target - this.bar.progress)*0.01;
			this.bar.progress = Math.min(1, this.bar.progress);

			if (this.bar.progress >= 1) {
				this.game.changeScene(MenuScene);
			}
		},

		render: function(ctx) {
			ctx.save();

			ctx.clearAll("#000");

			ctx.fillStyle = this.bar.color;
			ctx.fillRect(this.bar.x, this.bar.y, this.bar.progress*this.bar.width, this.bar.height);

			ctx.restore();
		}

	});


	return LoadingScene;

});