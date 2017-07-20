var TILE_WIDTH = 100,
    TILE_HEIGHT = 83;
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // generating a random value for the movement speed of the enemey.
    this.speed = (Math.floor(Math.random() * player.difficulty[0]) + player.difficulty[1]);
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    //when the enemy reaches the end of the screen, its will be set back to the start.
    //--> the x value will be set back to 0 and a new speed will be randomly set.
    if (this.x > 400) {
        this.x = 0;
        this.speed = (Math.floor(Math.random() * player.difficulty[0]) + player.difficulty[1]);
    }
    /* collision detection. when the player occupies the same space as an enemy,
       player will be set back to starting position and points will be deducted until points are zero*/
    if (((this.x > player.x - 80) && (this.x < player.x + 80)) && this.y === player.y) {
        if (player.points > 0) player.points--;
        player.y = 400;
        player.x = 200;
        $('h2').text('Points: ' + player.points + ' --- Level: ' + player.lvl);
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Rock = function() {
    this.sprite = 'images/Rock.png';
    this.x = (Math.round(Math.random() * (4 - 0) + 0)) * 100;
    this.y = -20;
};

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.difficulty = [100, 50];
    this.points = 0;
    this.lvl = 1;
};

Player.prototype.lvlUp = function() {
    this.difficulty[0] += 15;
    this.difficulty[1] += 15;
    this.lvl++;
    switch (this.lvl) {
        case 3:
            if (!musicOff) $('audio').attr('src', 'sounds/muh2.wav');
            break;
        case 5:
            if (!musicOff) $('audio').attr('src', 'sounds/muh3.wav');
            break;
        case 7:
            if (!musicOff) $('audio').attr('src', 'sounds/muh4.wav');
            break;
    }
    if (this.lvl === 3) rock[1] = new Rock();
    if (this.lvl === 4) rock[2] = new Rock();
    rock[0] = new Rock();
};

Player.prototype.update = function() {
    // when player makes it to the water, he gets 1 point and is set back to start
    if (this.y < 0) {
        this.points++;
        player.lvlUp();
        $('h2').text('Points: ' + this.points + ' --- Level: ' + this.lvl);
        this.y = 400;
        this.x = 200;

    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// takes the key code and, if the player is not moving out of the field, moves the player
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'up':
            if (rock[1]) {
                if (((rock[0].x === this.x) || (rock[1].x === this.x)) && (this.y === 68)) break;
            }
            if (rock[1] && rock[2]) {
                if (((rock[0].x === this.x) || (rock[1].x === this.x) || (rock[2].x === this.x)) && (this.y === 68)) break;
            }
            if ((rock[0].x === this.x) && (this.y === 68)) break;

            this.y -= TILE_HEIGHT;
            break;
        case 'down':
            if (this.y !== 400) this.y += TILE_HEIGHT;
            break;
        case 'right':
            if (this.x !== 400) this.x += TILE_WIDTH;
            break;
        case 'left':
            if (this.x !== 0) this.x -= TILE_WIDTH;
            break;

    }
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var player = new Player(200, 400)
var rock = [new Rock()];
var enemy1 = new Enemy(0, 68);
var enemy2 = new Enemy(0, 151);
var enemy3 = new Enemy(0, 234);

var allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
var musicOff = false;
$('button').click(function() {
    if (musicOff) {
        musicOff = false;
        $('button').text('music off');
        $('audio').attr('src', 'sounds/muh.wav');
    } else {
        musicOff = true;
        $('button').text('music on');
        $('audio').attr('src', '');
    }
});