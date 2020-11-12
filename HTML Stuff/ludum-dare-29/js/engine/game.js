define(function() {

	var NO_CHANGE = 0;

	var Game = Class.extend({

		currentScene: null,
		nextScene: NO_CHANGE,


		init: function() {},

		run: function() {

			var rAF = (window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame  ||
				window.mozRequestAnimationFrame 	||
				window.oRequestAnimationFrame 		||
				window.msRequestAnimationFrame);

			var self = this;
			var last = 0;
			var l = function(time) {

				var delta = time - last;
				last = time;

				if (self.nextScene !== NO_CHANGE) {
					self.setScene(self.nextScene);
					self.nextScene = NO_CHANGE;
				}

				self.tick(delta);

				rAF(l);
			};
			rAF(l);
		},

		changeScene: function(scene) {
			this.nextScene = scene;
		},

		setScene: function(scene) {
			if (this.currentScene !== null) {
				this.currentScene.destroy();
			}
			this.currentScene = new scene(this);
		},

		tick: function(dt) {
			throw new Error("Tick function should be overwrited in children class");
		}
	});


	return Game;

});