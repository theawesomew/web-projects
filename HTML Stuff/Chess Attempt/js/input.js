var InputHandeler = Class.extend({
	init: function () {
		window.addEventListener("mousdown", this.onpress(evt));
	},

	onpress: function (evt, tar) {
		var el = evt.target;

		if (el === tar) {
			var x = evt.clientX - el.offsetLeft;
			var y = evt.clientY - el.offsetTop;

			return [x,y];
		}
	}
})