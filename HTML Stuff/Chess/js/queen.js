class Queen {
    constructor (x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
    }

    render (ctx) {
        eval(this.colour+'_queen').render(ctx, this.x * TILE_SIZE, this.y * TILE_SIZE);
    }
}