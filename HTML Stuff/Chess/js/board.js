// This class is designated to create the chess board

Piece = {
    EMPTY: 0,
    PAWN: 1,
    ROOK: 2,
    KNIGHT: 3,
    BISHOP: 4,
    QUEEN: 5,
    KING: 6
}

class Board {
    // The board requires a size parameter (in pixels)
    constructor (size) {
        // Finds the pixel width and height of the board given it has to be an 8x8 grid
        this.tileWidth = size/8;
        this.width = this.height = size;
        // Creates an array of pieces on the board
        this.pieces = [];

        for (var y = 0; y < 8; y++) {
            this.pieces.push([]);
            for (var x = 0; x < 8; x++) {
                if (y === 0 || y === 7) {
                    let colour = y === 7 ? 'white' : 'black';
                    switch (true) {
                        case x === 0 || x === 7:
                            this.pieces[y].push(new Rook(x, y, colour));
                            break;
                        case x === 1 || x === 6:
                            this.pieces[y].push(new Knight(x, y, colour));
                            break;
                        case x === 2 || x === 5:
                            this.pieces[y].push(new Bishop(x, y, colour));
                            break;
                        case x === 3:
                            this.pieces[y].push(new Queen(x, y, colour));
                            break;
                        default:
                            this.pieces[y].push(new King(x, y, colour));
                            break;
                    }
                } else if (y === 1 || y === 6) {
                    let colour = y === 6 ? 'white' : 'black';
                    this.pieces[y].push(new Pawn(x, y, colour));
                } else {
                    this.pieces[y].push(new Empty(x,y));
                }
            }
        }
    }

    render (ctx) {
        for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 8; x++) {
                if (x % 2 === (y+1)%2) {
                    ctx.fillStyle = "cornflowerblue";
                    ctx.fillRect(x * this.tileWidth, y*this.tileWidth, this.tileWidth, this.tileWidth);
                }
                ctx.font = "30px Arial"
                this.pieces[y][x].render(ctx);
            }
        }
    }
}