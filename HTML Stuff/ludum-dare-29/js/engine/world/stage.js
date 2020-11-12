define(function() {

	var Stage = Class.extend({

		init: function() {
			this.childs = [];
		},

		addChild: function(ent, tag) {
			if (tag) {
				ent.__tag = tag;
			}
			this.childs.push(ent);
		},

		removeChild: function(ent) {
			var idx = this.childs.indexOf(ent);
			if (idx !== -1) {
				this.childs.splice(idx, 1);
			}
		},

		removeChildsWithTag: function(tag) {
			for (var i = 0, len = this.childs.length; i < len; i++) {
				if (this.childs[i].__tag === tag) {
					this.childs.splice(i, 1);
					i--;
					len--;
				}
			}
		},

		update: function(dt, map) {
			for (var i = 0, len = this.childs.length; i < len; i++) {
				this.childs[i].update(dt, map);
			}
		},

		draw: function(ctx) {
			for (var i = 0, len = this.childs.length; i < len; i++) {
				this.childs[i].draw(ctx);
			}
		}
	});


	return Stage;

});