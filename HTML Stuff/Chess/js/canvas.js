class Canvas {
    constructor (width, height) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    animate (loop) {
        var l = function () {
            loop();
            window.requestAnimationFrame(l);
        }
        window.requestAnimationFrame(l);
    }
}