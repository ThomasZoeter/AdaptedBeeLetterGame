// simple memory game in which the player tries to find the matching tile:
// might be upper- and lower-case (A-a), numeral to number word (1-one),
// picture-word (all of the stimuli should also be heard aloud), shape-name,
// and even simple math problems (1+1=2)
// TBD: include other stimulus types

function memory(){

  var self = this;
  logTime("memory",'start');
  var stimCount = store.get("memory_rounds_solved");
  if(!stimCount) stimCount = 0;

  var ncol = store.get("memory_columns");
  if(!ncol) ncol = 3;

  var nrow = 2; // start with 2x3 (3 pairs), increase to 4x4 or 4x5 max
  var Npairs = (ncol*nrow)/2;
  //var maxRows = 5; // 4*5 = 10 pairs...
  var maxCols = 6;

  var maxRoundTime = 100; // maximum seconds/round
  var minRoundTime = 20;
  var roundTime = store.get('memory_round_time');
  if(!roundTime) roundTime = 60; // time given to complete: adjust for difficulty
  var nCount = roundTime;

  var scoreIncrease = 1;
  var scoreDifferential = 0;
  var game_loaded = true;

  var stimSize;
  var renderer;
  var first_tile;
  var second_tile;
  self.flippedTiles = [];
  self.gameGrid;
  var pause_timer;
  var defaultImage;
  var progressBarContainer;
  var progressBarTimer;
  var timer;
  var timer_txt;

  var pairsFinished = (ncol * nrow) / 2;

  self.tiles = [];

  queuesToUpdate['alphabetstim'] = true;
  var stimQ = stimQueues['alphabetstim'];

  /*
  -------------------------------------------------------------------------------------------------------------
                                                  Class: Tile
  -------------------------------------------------------------------------------------------------------------
  */

  var Tile = function(trial, x, y, stim) {
    var _this = this;
    this.trial = trial;
    this.x = x;
    this.y = y;
    this.stim = stim;
    this.container = new PIXI.Container();
    this.container.position.x = x;
    this.container.position.y = y;
    this.container.interactive = true;
    this.container.buttonMode = true;
    this.container.mousedown = this.container.touchstart = function(){ click(); }
    self.gameGrid.addChild(this.container)
    this.clicked = false;
    this.width = stimSize;
    this.height = stimSize;

    function click() {
      _this.click();
    }

    this.shell = {
      "open" : new PIXI.Sprite(assets.textures["shellOpen"]),
      "closed" : new PIXI.Sprite(assets.textures["shell"]),
      "text" : new PIXI.Text(this.stim.text, {font:"40px Arial", fill:"#FFFFFF"}),
      "isFaceUp" : false,
    }


    this.shell.closed.width = this.width;
    this.shell.closed.height = this.width*1.4;
    this.shell.closed.width = this.height*1.4;

    this.shell.open.width = this.width;
    this.shell.open.height = this.width*1.4;
    this.shell.open.width = this.height*1.4;
    this.shell.open.renderable = false;

    this.shell.text.position.x = ((stimSize*1.4) + 5) / 2;
    this.shell.text.position.y = ((stimSize*1.4) + 4) / 2;
    this.shell.text.anchor.x = 0.5;
    this.shell.text.anchor.y = 0.5;


    this.container.addChild(this.shell.open)
    this.container.addChild(this.shell.text)
    this.container.addChild(this.shell.closed)

  };

  Tile.prototype.drawFaceDown = function() {

    this.shell.open.renderable = false;
    this.shell.text.renderable = false;
    this.shell.closed.renderable = true;
    this.isFaceUp = false;

  }

  Tile.prototype.drawFaceUp = function() {

    this.shell.open.renderable = true;
    this.shell.text.renderable = true;
    this.shell.closed.renderable = false;
    this.isFaceUp = true;

  }

  Tile.prototype.click = function(){


    if (self.flippedTiles.length < 2 && !this.isFaceUp) {

        this.drawFaceUp();
        self.flippedTiles.push(this);

        if (self.flippedTiles.length === 2) {
            this.numTries++;
            if (self.flippedTiles[0].stim.id === self.flippedTiles[1].stim.id) {
                self.flippedTiles[0].isMatch = true;
                self.flippedTiles[1].isMatch = true;
                //console.log(this.stim);
                assets.sounds.letters[this.stim.audio].play();
            }
            //delayStartFC = frameCount;
            //loop(); // audio and score stuff
            this.trial.handle_click();
        }
    }

    var foundAllMatches = true;

    for (var i = 0; i < self.tiles.length; i++) {
        foundAllMatches = foundAllMatches && self.tiles[i].isMatch;
    }

    if (foundAllMatches) {
        // end round and go on to next
        // var feedback = new Howl({
        //   src: ['audio/'+language+'/feedback/'+'very_good'+'.ogg'],
        //   autoplay: true,
        //   onend: function() {
        //     console.log("next trial");
        //     console.log(this.trialState);
        //   }
        // });
        this.trialState = "finished";
        //text("You found them all in " + numTries + " tries!", 20, 375);
    }
  }

  Tile.prototype.destroy = function(){
      //this.container.removeChild(this.circle);
      //this.circle.destroy();
      //this.circle = [];
      stage.removeChild(this.container);
      this.container.destroy(true);
      this.container = [];
      this.destroyed = true;
  };


  /*
  -------------------------------------------------------------------------------------------------------------
                                                  Class: Trial
  -------------------------------------------------------------------------------------------------------------
  */

  function Trial(_stim){
    this.stim = _stim; // although we need (ncol*nrow) / 2 stimuli -- not just one
    this.trialState = "play";
    this.clock = new ClockTimer();
    stimCount += 1;
    store.set("memory_rounds_solved", stimCount);
  }

  Trial.prototype.setboardSpecs = function () {

    nCount = roundTime; // time given to complete: adjust for difficulty
    pairsFinished = (ncol * nrow) / 2;

    this.boardMargin = {
      "hor" : (window.innerWidth * 0.1) + 10,
      "top" : (window.innerHeight * 0.1) + 10,
      "bot" : (window.innerHeight * 0.3) + 10,
    };

    if((window.innerWidth - (2*  this.boardMargin.hor))/ncol < (window.innerHeight -   this.boardMargin.bot -   this.boardMargin.top)/nrow){
      stimSize = (window.innerWidth - (2*  this.boardMargin.hor))/ncol
    }else{
      stimSize = (window.innerHeight - this.boardMargin.bot - this.boardMargin.top)/nrow
    }
  };

  Trial.prototype.destroy = function() {

    timer.stop()
    console.log(timer)
    timer = ""

    var bg;

    function deleteChildren(_child,_parent){

      if(_child.children.length > 0){
          while(_child.children.length > 0){
            deleteChildren(_child.children[0],_child)
          }
      }

      if(_child.id == "bg"){
        bg = _parent.removeChild(_child)
      }else{
        _parent.removeChild(_child)
        _child.destroy()
      }
    }

    while(stage.children.length > 0){

      deleteChildren(stage.children[0],stage)

    }

    if(bg) stage.addChild(bg)
  };

  Trial.prototype.init = function() {
    this.setboardSpecs();
    this.origstim = [];
    this.numTries = 0; // N pairs should take <N^2 and more than 2*N clicks
    pairsFinished = (ncol * nrow) / 2;
    var pairs = [];
    for (var i = 0; i < pairsFinished; i++) {
      var s_low = stimQ.pop();
      this.origstim.push(s_low);
      s_low.text = s_low.text.toLowerCase();
      var s_up = $.extend(true, {}, s_low);
      s_up.text = s_up.text.toUpperCase();
      pairs.push(s_low);
      pairs.push(s_up);

    }

    nCount = roundTime;
  	//Game Grid container for all Tiles.
  	self.gameGrid = new PIXI.Container();
  	stage.addChild(self.gameGrid);

  	for (var x=1; x<=ncol; x++) {

  		for (var y=1; y<=nrow; y++) {

        var random_card = Math.floor(Math.random()*pairs.length);
        var stim = pairs[random_card];
  			pairs.splice(random_card,1);

        var xPos = this.boardMargin.hor + ((x-1) * (window.innerWidth - (2*  this.boardMargin.hor))/ncol)
        var yPos = this.boardMargin.top + ((y-1) * (window.innerHeight - this.boardMargin.bot - this.boardMargin.top)/nrow)

        //console.log("00", xPos, yPos);

        var tmp = new Tile(this, xPos, yPos, stim);
        self.tiles.push(tmp);

      }

  	}

    for(var i=0; i<self.tiles.length; i++) {
      self.tiles[i].drawFaceDown();
      //console.log(self.tiles[i])
    }

  	this.drawTimerBar();
  	//requestAnimationFrame( update );
  }

  Trial.prototype.play = function(_updateTime){

    //console.log(this.trialState);

      switch(this.trialState){
          case "play":

              score.displayStar();
              score.displayExplosion();

              break;

          case "finished":

              for(var i=1;i<(nrow*ncol);i++){
                  self.tiles[i].fade = true;
              }

              score.displayStar();
              score.displayExplosion();

              if(this.finished()){
                  self.flippedTiles = []
                  return true;
              }
              break;
          };
          return false;
  };

  Trial.prototype.finished = function() {
    //console.log(this.finishedState);

      switch(this.finishedState){
          case "endanimation":
              this.adjustDifficulty(this.trialWon);
              if(this.trialWon){
                  this.clock.start(1500);
                  this.finishedState = "win";
                  console.log("finished-win");
              }else{
                  this.clock.start(1500);
                  this.finishedState = "lose";
                  console.log("finished-lose");
              }
              break;

          case "lose":
              console.log("time ran out");
              if(this.clock.timeOut()) {
                this.finishedState = "callNext";
              }
              break;

          case "win":
              if(this.clock.timeOut()) {
                this.finishedState = "callNext";
              }
              break;

          case "callNext":
              return true;
              break;
      }

      return false;
  };

  Trial.prototype.handle_click = function() {
    // only gets called when two tiles have been clicked
  		//Check if we have a pair or not.
  		if (self.flippedTiles[0].stim.id === self.flippedTiles[1].stim.id) {
  			console.log("PAIR FOUND")

        var pos1 = {
          x : self.flippedTiles[0].x + (self.flippedTiles[0].height * 0.7),
          y : self.flippedTiles[0].y + (self.flippedTiles[0].height * 0.7),
        }
        var pos2 = {
          x : self.flippedTiles[1].x + (self.flippedTiles[1].height * 0.7),
          y : self.flippedTiles[1].y + (self.flippedTiles[1].height * 0.7),
        }

        score.addScore( [pos1], 1, 1200, false, 2 );
        score.setExplosion( pos1, 100, 1000 )
        score.addScore([pos2], 1, 1200, false, 2 );
        score.setExplosion( pos2, 100, 1000 )

        console.log(self.flippedTiles[0])

  			if(pairsFinished != 1) {

          correct_sound.play();
          this.finishedState = "endanimation";
          pairsFinished--;
  				setTimeout(remove_tiles, 1000);
  				console.log("remaining pairs: " + pairsFinished);

  			} else {
          this.trialWon = true;
          this.trialState = "finished";
  				timer.stop();
          // ToDo: delay 1000ms for correct_sound
          //verbal_audio_feedback(true);
          setTimeout(function() {
  				  stage.removeChild(progressBarTimer);
  				  timer_txt.text = ''; // play kazi nzuri / "Well Done!";
  				  stage.removeChild(self.gameGrid);
          }, 1000);

  				//showWinnerSpriteSheet();
  			}

  		} else {
        assets.sounds.wrong[0].play();
  			setTimeout(reset_tiles, 1000);
  		}
  }

  Trial.prototype.drawTimerBar = function(){

    var progressBarTimerBG = new PIXI.Graphics();
    progressBarTimerBG.beginFill(0xe69782);
    progressBarTimerBG.drawRect(0, 0, 250, 20);
    progressBarTimerBG.position.y = window.innerHeight * 0.9;
    progressBarTimerBG.position.x = (window.innerWidth/2) - 125;
    stage.addChild(progressBarTimerBG);

  	progressBarTimer = new PIXI.Graphics();
  	progressBarTimer.beginFill(0x752e1b);
  	progressBarTimer.drawRect(0, 0, 250, 20);
  	progressBarTimer.position.y = window.innerHeight * 0.9;
  	progressBarTimer.position.x = (window.innerWidth/2) - 125;
  	stage.addChild(progressBarTimer);

  	timer_txt = new PIXI.Text(roundTime, {font:"40px Arial", fill:"#752e1b"});
  	timer_txt.position.y = window.innerHeight * 0.9 - 50;
  	timer_txt.position.x = (window.innerWidth/2) - 15;
  	stage.addChild(timer_txt);
  	timer = new Timer(1000, roundTime); // 1 second * 60 times
    timer.addEventListener(TimerEvent.TIMER, onTick)
    var _this = this
    timer.addEventListener(TimerEvent.TIMER_COMPLETE, function(){ _this.onTimerComplete() })
    timer.start();

  }

  Trial.prototype.adjustDifficulty = function(won) {
    if(won) {
      scoreDifferential++;
      if(scoreDifferential>2 & roundTime<maxRoundTime) {
        roundTime = roundTime - 5; // less time
        if(scoreDifferential>3 & ncol<maxCols) {
          ncol++; // another row
          scoreDifferential = 0;
        }
      }
    } else {
      scoreDifferential--;
      if(scoreDifferential<1) {
        roundTime = roundTime + 5;
        if(scoreDifferential<-1 & ncol>3){
          ncol--;
          scoreDifferential = 0;
        }
      }
    }
    store.set("memory_round_time", roundTime);
    store.set("memory_columns", ncol);
  }


  Trial.prototype.storeStim = function() {
    var rand_adjust = Math.random() * .1 - .05;
    if(this.numTries<Math.pow(Npairs)) {
      var deltaPriority = correctPriorityIncr;
    } else {
      var deltaPriority = .6;
    }
    for (var i = 0; i < this.origstim.length; i++) {
      this.origstim[i].priority += deltaPriority + rand_adjust;
      stimQ.push(this.origstim[i]);
    }
    console.log("stimQ length: "+stimQ.size());
    this.stim.priority += deltaPriority;
    return this.stim;
  };

  function onTick(event){
  	nCount--;
  	timer_txt.text = nCount;
  	progressBarTimer.scale.x = 1 - event.target.currentCount / 60;
  }

  Trial.prototype.onTimerComplete = function(){

    this.trialWon = false;
    this.trialState = "finished"
    this.finishedState = "endanimation"
  	timer_txt.text = "Try again!"; // feedback in that language
    verbal_audio_feedback(false);
    // timeout for a few seconds and then a new round -- with more time, and maybe fewer tiles
  }

  function reset_tiles() {
    for (var i = 0; i < self.flippedTiles.length; i++) {
       self.flippedTiles[i].drawFaceDown();
    }
    self.flippedTiles = [];
  }

  function remove_tiles() {
    for (var i = 0; i < self.flippedTiles.length; i++) {
  	   self.gameGrid.removeChild(self.flippedTiles[i].container);
    }
  	self.flippedTiles = [];
  }

  function showWinnerSpriteSheet() {
  	//To be done.
  }

  //-------------------------------------------
  // Global functions and variables
  //-------------------------------------------

  // create the root of the scene graph and main classes
  var stage = new PIXI.Container();
  var round = new Round();
  score.stage = stage;

  this.destroy = function(){
      finishGame = true;
      session.hide()
  };

  //---------------------------------------loading assets

  if(game_loaded) {

      assets.addTexture("shell","sprites/shells/shell.png");
      assets.addTexture("shellOpen","sprites/shells/shellOpen.png");
      assets.addTexture("bg","sprites/backGrounds/bg-memory.png");

      for (var i = 0; i < letters.length; i++) {
        assets.addSound(letters[i].audio,letters[i].audio + '.ogg', "letters");
      };

      assets.addSound("wrong",'wrong.ogg');
      assets.addSound("correct1",correctSounds[0][0].audio + '.ogg');
      assets.load(onAssetsLoaded);

  } else {
      onAssetsLoaded();
  };

  function onAssetsLoaded(){

    // maybe select a random type of stimQ?
    // - definitely want shapes, could do number/quantity and small addition/subtraction
    // or the type the user hasn't played in a while?

    round.init(Trial, stage, stimQ);

    //init(pairs);
    setTimeout(function(){
        console.log("starting the game!");
        session.show();
        update();
    });
  };

      //---------------------------------------LOOP
      var statsBol = false;
      if(statsBol){
          session.stats.domElement.style.display = "block";
      };

      var finishGame = false;
      var previousTime = Date.now();
      var MS_PER_UPDATE = 16.66667;
      var lag = 0;

      function update() {

          if(finishGame){
              logTime("memory",'stop');
              round.storeSession(stimQ, "alphabetstim")
              session.stats.domElement.style.display = "none";
              round.destroy(); // error here gameDefinitions:316
              assets.destroy();
              finishGame = false;
              currentview = new MainMenu();
              game_loaded = false;
              return;
          }

          if(statsBol) session.stats.begin();

          //update position based on expected frame rate
          var current = Date.now();
          var elapsed = current - previousTime;
          previousTime = current;
          lag = lag + elapsed;

          while (lag >= MS_PER_UPDATE){
            round.play(lag/MS_PER_UPDATE);
            lag = lag - MS_PER_UPDATE;
          }

          // render the stage
          session.render(stage);
          requestAnimationFrame(update);
          if(statsBol) session.stats.end();

      }
}
