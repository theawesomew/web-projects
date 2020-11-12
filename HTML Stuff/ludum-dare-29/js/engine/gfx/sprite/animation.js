define(function() {

	var Animation = Class.extend({

		init: function(sprites) {
			this._frames =   0;
			this._delays =  [];
			this._sprites = [];
			this._animlength = [];
			this._current = 0;
			this._animseq = [];

			this.playonce = false;
			this.playing = true;
			this.stopat = null;
			this.callback = null;

			for (var i = 0, len = sprites.length; i < len; i++) {
				this._sprites.push(sprites[i][0]);
				this._delays.push(sprites[i][1]);
				this._animseq.push(i);
			}

			this._animlength = this._animseq.length;
			this._current = 0;
		},

		setAnimseq: function(seq) {
			this._animseq = seq;
			this._animlength = seq.length;
		},

		play: function() {
			this.playing = true;
		},

		stop: function() {
			this.playing = false;
		},

		stopAndSet: function(frame) {
			this.stopat = frame;
		},

		playOnce: function(callback) {
			this.playonce = true;
			this.play();
			this._current = 0;
			this.callback = callback;
		},

		update: function() {
			if (!this.playing) return;

			if(++this._frames >= this._delays[this._animseq[this._current]]) {
				this._frames = 0;

				this._current += 1;

				if (this.stopat != null && this._animseq[this._current] === this.stopat && !this.playonce) {
					this.stop();
					this.stopat = null;
				}

				if (this._current >= this._animlength) {
					if (this.playonce) {
						this.stop();
						if (this.callback) {
							this.callback();
						}
						this.playonce = false;
					}
					this._current = 0;
				}
			}
		},

		draw: function(ctx, x, y) {
			this._sprites[this._animseq[this._current]].draw(ctx, x, y);
		}
	});


	return Animation;

});