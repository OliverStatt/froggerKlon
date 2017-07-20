/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on the player and enemy objects
 */

var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        /* requestAnimationFrame function is used to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {
        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }


    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
        rock.forEach(function(rock) {
            rock.render();
        });
    }

    function reset() {}

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Rock.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);