class Knight {
    constructor (x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
    }

    render (ctx) {
        eval(this.colour+'_knight').render(ctx, this.x * TILE_SIZE, this.y * TILE_SIZE);
    }
}