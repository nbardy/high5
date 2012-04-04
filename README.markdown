High5
-----
A simple HTML5 canvas game framework

How To Use
----------
1.Including the game file `<script src='games.js'></script>` and place 'updateWorker.js' in the same directory as game.js.
2.Create a game instance calling the `gameInstance(` function and then run with `gameInstance.start()`

Requirements
-----------
A modern brower, test on Chromium 17.0.963.79.
Should work with any browser supporting canvas and web workers.

How to Use (Detailed)
---------------------
1. Create an `udpate` function which accepts one paramter and returns a parameter of the same type:

    update = function(gameData) { 
       //Update game data ...

       return newGameData;
    }
 
   Your update function should be able to handle any data it returns itself

2. Create a `draw` function which accepts two paramaters, the same type of data your update function is handling and a canvas element
   
    draw = function(gameData, canvas) {
       //draw stuff to canvas ...
    }

3. Create a new gameInstance by passing in the functions you create a canvas and an initial set of data. 
    game = gameInstance(initialGameData, update, draw, canvas);
   
   The initial set of data should agian be the same type your update and draw functions handle.
   The canvas should be one you fetch from the DOM with something like `document.getElementById('myGameCanvas')`

4. Start the game with:
    game.start();

5. Enjoy

