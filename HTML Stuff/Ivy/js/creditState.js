var CreditState = State.extend({
	init: function (game) {
		this._super(game);
		this.frames = 0;
		this.scroll = false;
		this.textCords = [225, 500, 600, 620, 640];
		this.fade = 0;
		this.text = ["Was it really worth it now that they're all gone?", "Created by William Kennedy and Cody Peck", "A special thank you to Mr. Nunn and Mrs. Fitzpatrick", "for their ongoing support of our project and", "facilitating the Socrates and Aristotle programs."];
	},

	handleInputs: function (input) {},

	update: function () {
		this.frames++;

		if (this.scroll === true) {
			for (var i = 0; i < this.textCords.length; i++) {
				this.textCords[i] -= 1;
				console.log(this.textCords[i]);
			}

			if (this.textCords[this.textCords.length-1] < 40) {
				this.game.nextState = States.GAME;
			}
		}

		if (this.frames / 300 === 1) {
			this.scroll = true;
		}
	},

	render: function (ctx) {
		ctx.globalAlpha = this.fade;
		if (this.fade < 1) {
			this.fade += 0.005;
		} else {
			this.fade = 1.0;
		}
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,640,480);
		ctx.strokeStyle = 'white';
		ctx.font = "20px Palatino Linotype";
		for (var i = 0; i < this.textCords.length; i++) {
			ctx.strokeText(this.text[i], (480-(5.4*this.text[i].length))/2, this.textCords[i]);
		}
	}
})