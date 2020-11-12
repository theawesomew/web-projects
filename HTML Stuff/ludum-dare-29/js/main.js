require.config = {
	baseUrl: "js",
	paths: {
		js: "../js",
		lib: "lib",
		engine: "engine"
	}
}

define(["lib/class"], function() {
	require(["app"], function(App) {
		new App().run();
	});
});