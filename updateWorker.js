self.addEventListener('message', function (e) {
   if (e.data.command == 'initiate') {
      self.gameData = e.data.gameData;
      self.updateFunction = eval("(" + e.data.updateFunction + ")");
   }
   else if (e.data.command == 'start') {
      self.isRunning = true;
      //Start update function return
      self.updateInterval = setInterval( function () {
         self.gameData = self.updateFunction(self.gameData);
         self.postMessage({'command': 'update', 'gameData': self.gameData}); }
         , 0);
   }
   else if (e.data.command == 'stop') {
      //Kill worker
      clearInterval(self.updateInterval);
      self.close();
   }
   else if (e.data.command == 'pause') {
      clearInterval(self.updateInterval);
      self.isRunning = false;
   }
});
