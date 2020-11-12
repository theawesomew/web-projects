function InputHandeler () {
	this.down = [];
	this.pressed = [];


	var self = this;

	window.addEventListener("keydown", function (e){
		self.down[e.keyCode] = true;
	});

	window.addEventListener("keyup", function (e){
		delete self.down[e.keyCode];
		delete self.pressed[e.keyCode];
	});
}

InputHandeler.prototype.isDown = function (code) {
	return this.down[code];
};

InputHandeler.prototype.isPressed = function (code) {
	if (this.pressed[code]) {
		return false;
	} else if (this.down[code]) {
		return this.pressed[code] = true;
	}
	return false;
};