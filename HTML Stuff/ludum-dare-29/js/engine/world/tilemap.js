define([
	"engine/utils/util",
	"engine/utils/tmx-parser",
	"engine/utils/math/rect"
], function(util, TMXParser, Rect) {

	var TileMap = Class.extend({

		isLoaded: function() {
			return this.loaded;
		},

		getLayer: function(name) {
			for (var i = 0, len = this.layers.length; i < len; i++) {
				var l = this.layers[i];
				if (l.name === name) {
					return l;
				}
			}
			return null;
		},

		init: function(mapPath, tilesetPath, _loader) {

			this.layers =   [];
			this.tilesets = [];
			this.properties = {};

			this.xTiles = 0;
			this.yTiles = 0;

			this.width =  0;
			this.height = 0;

			this.tileWidth =  0;
			this.tileHeight = 0;

			this._cachLayers = {};
			this._mapCach = null;
			this._loadedimgs = 0;
			this._preloader = null;

			this.loaded = false;
			this.onload = null;
			this.collisionMask = null;

			this.tilesetPath = tilesetPath || "";
			
			this._preloader = _loader;

			if (typeof mapPath !== "string") {
				return this._initMap(mapPath);
			}

			var self = this;
			util.xhrGet(mapPath, function() {
				var d;
				switch (mapPath.split(".").pop()) {
					case "json":
						d = JSON.parse(this.responseText);
						break;
					case "tmx":
						d = TMXParser.parse(this.responseText);
						break;
				}
				self._initMap(d)
			});
		},

		drawLayer: function(ctx, name, x, y, w, h) {
			if (!this.isLoaded()) return;

			if (this._cachLayers[name] == null) {
				var c = document.createElement("canvas");
				c.width = this.width;
				c.height = this.height;

				var _ctx = c.getContext("2d");

				var tw = this.tileWidth;
				var th = this.tileHeight;
				var mw = this.xTiles;

				for (var i = 0, len = this.layers.length; i < len; i++) {
					if (this.layers[i].name !== name) {
						continue;
					}
					
					var d = this.layers[i].data;

					for (var id = 0, dlen = d.length; id < dlen; id++) {

						var _id = d[id];
						if (_id === 0) continue;

						var td = this._getTile(_id);

						var x = ((id % mw)|0) * tw;
						var y = ((id / mw)|0) * th;

						_ctx.drawImage(td.img, td.x, td.y, tw, th, x, y, tw, th);
					}
				}
				var i = new Image();
				i.src = c.toDataURL();
				this._cachLayers[name] = i;
			}

			if (x != null && y == null) {
				var c = x;

				x = c.position.x;
				y = c.position.y;
				w = c.width;
				h = c.height;

			} else {
				x = x || 0;
				y = y || 0;
				w = w || ctx.canvas.width;
				h = h || ctx.canvas.height;
			}

			ctx.drawImage(this._cachLayers[name], x, y, w, h, x, y, w, h);
		},

		getTransitions: function() {

			var data = {}

			var l;
			for (var i = 0, len = this.layers.length; i < len; i++) {
				var l = this.layers[i];
				if (l.name === "transition") {
					break;
				}
			}
			for (var i = 0, len = l.objects.length; i < len; i++) {
				var o = l.objects[i];
				if (o.properties.transition != null) {
					data[o.properties.transition] = new Rect(o.x, o.y, o.width, o.height);

					if (o.properties.pos != null) {
						var sp = o.properties.pos;
						sp = sp.replace(/\s+/g, "");
						sp = sp.split(",");
						data[o.properties.transition].startPos = {
							x: parseInt(sp[0]) * this.tileWidth,
							y: parseInt(sp[1]) * this.tileHeight
						}
					}
				}
			}

			return data;
		},

		getCameraData: function() {
			var data = {};
			data.regions = {};

			var l;
			for (var i = 0, len = this.layers.length; i < len; i++) {
				var l = this.layers[i];
				if (l.name === "camera") {
					break;
				}
			}
			for (var i = 0, len = l.objects.length; i < len; i++) {
				var o = l.objects[i];

				if (o.properties.change != null) {

				} else {
					data.regions[o.name] = new Rect(o.x, o.y, o.width, o.height);
				}
			}

			return data;
		},

		draw: function(ctx, x, y, w, h) {

			if (!this.isLoaded()) return;

			if (this._mapCach == null) {
				c = document.createElement("canvas");
				c.width = this.width;
				c.height = this.height;

				var _ctx = c.getContext("2d");

				var tw = this.tileWidth;
				var th = this.tileHeight;
				var mw = this.xTiles;

				for (var i = 0, len = this.layers.length; i < len; i++) {
					
					if (this.layers[i].type !== "tilelayer") continue;
					
					var d = this.layers[i].data;

					for (var id = 0, dlen = d.length; id < dlen; id++) {

						var _id = d[id];
						if (_id === 0) continue;

						var td = this._getTile(_id);

						var x = ((id % mw)|0) * tw;
						var y = ((id / mw)|0) * th;

						_ctx.drawImage(td.img, td.x, td.y, tw, th, x, y, tw, th);
					}
				}
				var i = new Image();
				i.src = c.toDataURL();
				this._mapCach = i;
			}

			if (x != null && y == null) {
				var c = x;

				x = c.position.x;
				y = c.position.y;
				w = c.width;
				h = c.height;

			} else {
				x = x || 0;
				y = y || 0;
				w = w || ctx.canvas.width;
				h = h || ctx.canvas.height;
			}

			ctx.drawImage(this._mapCach, x, y, w, h, x, y, w, h);
		},

		getRect: function() {
			return new Rect(0, 0, this.width, this.height);
		},

		checkCollision: function(ent) {
			if (this.collisionMask == null) return false;
			var vel = ent.vel;
			var p = ent.position.clone();
			var w2 = ent.bbox.width2, h2 = ent.bbox.height2;
			var tw = this.tileWidth, th = this.tileHeight;
			var modified = false;

			var tx = vel.x > 0 ? p.x + w2 - 1 : p.x - w2;

			var cur = Math.floor(tx/tw);
			var tar = Math.floor((tx + vel.x)/tw);
			
			var ymin = Math.floor((p.y - h2)/ th);
			var ymax = Math.ceil((p.y + h2)/ th);

			if (cur < tar) {
				for (var y = ymin; y < ymax; y++) {
					for (var x = cur; x <= tar; x++) {
						if (this.collisionMask.isSolid(x, y)) {
							vel.x = x*tw - p.x - w2;
							modified = true;
							break;
						}
					}
				}
			} else if (cur > tar) {
				for (var y = ymin; y < ymax; y++) {
					for (var x = cur; x >= tar; x--) {
						if (this.collisionMask.isSolid(x, y)) {
							vel.x = x*tw - p.x + w2 + tw;
							modified = true;
							break;
						}
					}
				}
			}

			var ty = vel.y > 0 ? p.y + h2 - 1 : p.y - h2;

			var cur = Math.floor(ty/th);
			var tar = Math.floor((ty + vel.y)/th);
			
			var xmin = Math.floor((p.x - w2)/ tw);
			var xmax = Math.ceil((p.x + w2)/ tw);

			if (cur > tar) {
				for (var y = cur; y >= tar; y--) {
					for (var x = xmin; x < xmax; x++) {
						if (this.collisionMask.isSolid(x, y)) {
							vel.y = y*th - p.y + h2 + th;
							modified = true;
							break;
						}
					}
				}
			} else {

				for (var y = cur; y <= tar; y++) {
					for (var x = xmin; x < xmax; x++) {
						if (this.collisionMask.isSolid(x, y)) {
							vel.y = y*th - p.y - h2;
							modified = true;
							break;
						}
					}
				}

			}
			return modified;
		},

		_createCollisionMask: function() {
			var l;
			for (var i = 0, len = this.layers.length; i < len; i++) {
				l = this.layers[i];
				if (l.name === "collision") break;
			}
			if (l.name !== "collision") return;

			this.collisionMask = {
				data: l.data,
				width: this.xTiles,
				height: this.yTiles,
				isSolid: function(x, y) {
					x |= 0;
					y |= 0;
					return this.data[x + y*this.width] !== 0;
				}
			};
		},

		_initMap: function(data) {
			var map = data, self = this;

			this.layers = data.layers;
			this.properties = data.properties;

			this.xTiles = map.width;
			this.yTiles = map.height;
			
			this.tileWidth = map.tilewidth;
			this.tileHeight = map.tileheight;

			this.width = this.xTiles * this.tileWidth;
			this.height = this.yTiles * this.tileHeight;

			var len = map.tilesets.length, incLoaded = function() {
				if (++self._loadedimgs === len) {
					self.loaded = true;
					if (self.onload != null) {
						self.onload();
					}
				}
			}

			for (var i = 0; i < len; i++) {

				var ts = map.tilesets[i];

				if (this.tilesetPath !== "") {
					ts.image = ts.image.replace(/^.*[\\\/]/, '');
				}

				var img;
				if (this._preloader != null) {
					img = this._preloader.get(ts.image);
					if (img == null) {
						img = this._preloader.loadImage(ts.image, this.tilesetPath + ts.image, incLoaded);
					} else {
						incLoaded();
					}
				} else {
					img = new Image();
					img.onload = incLoaded();
					img.src = ts.image;
				}

				this._addTileset(img, ts);
			}
			this._createCollisionMask();
		},

		_addTileset: function(img, data) {

			var ts = {
                firstgid: data.firstgid,

                img:       img,
                imgheight: data.imageheight,
                imgwidth:  data.imagewidth,
                name:      data.name,

                xtiles: (data.imagewidth / this.tileWidth)|0,
                ytiles: (data.imageheight / this.tileHeight)|0
			}

			this.tilesets.push(ts);
		},

		_getTile: function(id) {
			var tile = {
				img: null,
				x: 0,
				y: 0
			}

			var ts;
			for (var i = this.tilesets.length - 1; i >= 0; i--) {
				var ts = this.tilesets[i];
				if (ts.firstgid <= id) break;
			}

			id -= ts.firstgid;

			tile.img = ts.img;	
			tile.x = ((id % ts.xtiles)|0) * this.tileWidth;
			tile.y = ((id / ts.xtiles)|0) * this.tileHeight;

			return tile;
		}
	});


	return TileMap;

});