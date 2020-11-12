var repeat;
var red, green, blue;
var hexred, hexblue, hexgreen;
var hex;

function ColourPick () {
	repeat = 0;
	while (repeat < 3) {
		red = Math.random() * 256;
		green = Math.random() * 256;
		blue = Math.random() * 256;

		hexred = ('0' + parseInt(red, 10).toString(16)).slice(-2);
		hexblue = ('0' + parseInt(blue, 10).toString(16)).slice(-2);
		hexgreen = ('0' + parseInt(green, 10).toString(16)).slice(-2);

		hex = '#' + hexred + hexblue + hexgreen;

		if(repeat === 0) {
			document.getElementById('colour_1').style.background = hex;
		} else if (repeat === 1) {
			document.getElementById('colour_2').style.background = hex;
		} else if (repeat === 2) {
			document.getElementById('colour_3').style.background = hex;
		} else {
			return;
		}

		console.log(hex);

		repeat++;
	}
}