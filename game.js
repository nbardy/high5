//Pass in : initial gameData, an update function, a canvas object, a draw function of the form f(gameData, cavnas)
function gameInstance(gameData, updateFunction, canvas, drawFunc) {

   //Store initial game data
   this.gameData = gameData;
   this.drawFunc = drawFunc;
   this.canvas = canvas;
 
   //Creates a new worker to update the state of the game
   //and a listener to monitor the data sent back
   this.updateWorker = new Worker('updateWorker.js'); 
   this.updateWorker.postMessage({'command': 'initiate', 'gameData': gameData, 'updateFunction': updateFunction.toString()});

   //Listens for the update workers data
   this.updateHandler = function(e) {
   //If message is not update end
      if(e.data.command == 'update') {
         self.gameData = e.data.gameData;
      } 
   };
   //Add Event Listener
   var self = this;
   this.updateWorker.addEventListener('message', self.updateHandler, false);

   //Start begins the update worker and draw functions
   this.start = function() {
      this.updateWorker.postMessage({'command': 'start'});
      //Start drawInterval
      var self = this;
      this.drawInterval = setInterval(function () {
         //Deep copy current data to keep it static during drawing
         self.drawData = JSON.parse(JSON.stringify(self.gameData));
         self.drawFunc(self.drawData, self.canvas);
      });
   };
   
   //Stop kills the game and erases all data
   this.stop = function(){
      this.updateWorker.postMessage({'command': 'stop'});
      clearInterval(this.drawInterval);
   };

   //Pause halts execution and saves current game state
   this.pause = function() {
      this.updateWorker.postMessage({'command': 'pause'});
      clearInterval(this.drawInterval);
   };
}

