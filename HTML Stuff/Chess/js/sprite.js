class Sprite {
    constructor (img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render (ctx, x, y) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
            x, y, this.width, this.height);
    }
}

let white_king, white_queen, white_bishop, white_knight, white_rook, white_pawn,
    black_king, black_queen, black_bishop, black_knight, black_rook, black_pawn;


function initSprites (img) {
    white_king = new Sprite(img,0,0,75,78);
    white_queen = new Sprite(img,83,0,75,78);
    white_bishop = new Sprite(img,168,0,75,78);
    white_knight = new Sprite(img,254,0,75,78);
    white_rook = new Sprite(img,340,0,75,78);
    white_pawn = new Sprite(img,420,0,75,78);
    black_king = new Sprite(img,0,88,75,78);
    black_queen = new Sprite(img,83,88,75,78);
    black_bishop = new Sprite(img,168,88,75,78);
    black_knight = new Sprite(img,254,88,75,78);
    black_rook = new Sprite(img,340,88,75,78);
    black_pawn = new Sprite(img,420,88,75,78);
}