define([
	"engine/world/scene",
	"engine/utils/preloader",
	"engine/world/stage",
	"engine/entity/player",
	"engine/gfx/camera",
	"engine/entity/bat",
	"engine/gfx/sprite/spritecutter",
	"engine/world/gamemap"
], function(Scene, PreLoader, Stage, Player, Camera, Bat, SpriteCutter, GameMap) {

	var GameScene = Scene.extend({

		create: function() {
			this.currentmap = new GameMap("overworld");

			this.camera = new Camera(this.game.canvas);

			var sprites = SpriteCutter.crop(PreLoader.get("hero"), 16, 32, null, -25);
			this.player = new Player(sprites, PreLoader.get("swosh"));

			this.player.setPos(this.currentmap.getStartPos());

			this.stage = new Stage();
			this.stage.addChild(this.player);
			this.camera.follow(this.player.position);
		},

		handleInputs: function(input) {
			this.player.handleInputs(input, this.camera);
		},

		update: function(dt) {
			this.stage.update(dt, this.currentmap.getMap());

			this.currentmap.update(this.player, this.camera);
		},

		render: function(ctx) {
			this.camera.set();

			var map = this.currentmap.getMap();

			map.drawLayer(ctx, "bg", this.camera);

			this.stage.draw(ctx);
			map.drawLayer(ctx, "fg", this.camera)

			this.camera.restore();
		}

	});


	return GameScene;

});