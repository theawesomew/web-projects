var InputHandeler = Class.extend({
	init: function () {
		this.down = [];
		this.pressed = [];

		var self = this;

		window.addEventListener('keydown', function (evt) {
			self.down[evt.keyCode] = true;
		});
		window.addEventListener('keyup', function (evt) {
			delete self.down[evt.keyCode];
			delete self.pressed[evt.keyCode];
		});
	},

	isDown: function (code) {
		return this.down[code];
	},

	isPressed: function (code) {
		if (this.pressed[code]) {
			return false;
		} else if (this.down[code]) {
			return this.pressed[code] = true;
		} else {
			return false;
		}
	}
})