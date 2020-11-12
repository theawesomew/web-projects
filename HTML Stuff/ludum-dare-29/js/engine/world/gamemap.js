define([
	"engine/utils/math/vec2",
	"engine/utils/preloader"
], function(Vec2, PreLoader) {

	var GameMap = Class.extend({

		init: function(name) {
			this.setMap(name);
		},

		setMap: function(name) {
			this.map = PreLoader.get(name);

			if (this.bgsound != null) {
				this.bgsound.stop();
			}
			if (this.map.properties.music != null) {
				this.bgsound = PreLoader.get(this.map.properties.music);
				this.bgsound.play();
			}

			this.transitions = this.map.getTransitions();
			this.camData = this.map.getCameraData();
		},

		getMap: function() {
			return this.map;
		},

		getStartPos: function() {
			var sp = this.map.properties.startpos;

			if (sp != null) {
				sp = sp.replace(/\s+/g, "");
				sp = sp.split(",");
				var x = parseInt(sp[0]) * this.map.tileWidth;
				var y = parseInt(sp[1]) * this.map.tileHeight;
				return new Vec2(x, y);
			}
			return new Vec2();
		},

		update: function(ent, camera) {

			var p = ent.getPos(), camchange = false;;

			for (var k in this.transitions) {
				var t = this.transitions[k];
				if (t.within(p.x, p.y)) {
					this.setMap(k);
					if (t.startPos != null) {
						ent.setPos(t.startPos.x, t.startPos.y);
					} else {
						ent.setPos(this.getStartPos());
					}
					camchange = true;
				}
			}

			if (!camera.isWithin(ent) || camchange) {
				p = ent.getPos();
				for (var k in this.camData.regions) {
					var r = this.camData.regions[k];
					if (r.within(p.x, p.y)) {
						camera.setBounds(r);
						break;
					}
				}
			}
		}
	});


	return GameMap;

});