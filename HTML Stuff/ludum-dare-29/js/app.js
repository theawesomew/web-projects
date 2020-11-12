define([
	"engine/gfx/canvas",
	"engine/game",
	"engine/input/inputhandeler",
	"engine/utils/preloader",
	"scene/loadingscene"
], function(Canvas, Game, InputHandeler, PreLoader, LoadingScene) {

	var App = Game.extend({

		canvas: null,
		input: null,

		init: function() {
			this.canvas = new Canvas(16*16, 9*16);
			this.input = new InputHandeler();

			this.input.bindAction("left",    37);
			this.input.bindAction("up",      38);
			this.input.bindAction("right",   39);
			this.input.bindAction("down",    40);
			this.input.bindAction("action",  "space");
			this.input.bindAction("run",     "q");

			PreLoader.load([
				["forest",    "assets/map/waterpalace.json", "assets/img/"],
				["overworld", "assets/map/overworld.json", "assets/img/"],
				["forest2",   "assets/map/forest.json", "assets/img/"],
				["hero",      "assets/img/hero2.png"],
				["title1",    "assets/img/title-01.png"],
				["title2",    "assets/img/title-02.png"],
				["title3",    "assets/img/title-03.png"],
				["title4",    "assets/img/title-04.png"],
				["title5",    "assets/img/title-05.png"],
				["title6",    "assets/img/title-06.png"],
				["m_overworld", "assets/music/overworld.ogg", true],
				["m_title",     "assets/music/title.ogg", true],
				["m_forest",    "assets/music/forest.ogg", true],
				["swosh",       "assets/sfx/swosh2.ogg"]
			]);

			this.changeScene(LoadingScene);
		},

		tick: function(dt) {
			var ctx = this.canvas.ctx;

			this.currentScene.handleInputs(this.input);
			this.currentScene.update(dt);
			this.currentScene.render(this.canvas.ctx);

			this.canvas.flip();
		}
	});


	return App;

});