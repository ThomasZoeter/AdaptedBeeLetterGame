var spellingbeeloaded = false;

/*
  game works like this:
  x = a word's letters + y distractors
  trial starts with x flowers drawn onscreen, and a target word is
  heard. the bee appears in a random location and flies (slowly at first)
  towards the first letter of target word. if the target is clicked before the
  bee reaches it, a point is scored. if the wrong letter is clicked
  or if the bee gets there first, the number of distractors is decreased
  and speed adjusts constantly
*/

function spellingBee(){
  spellingbeeloaded = true;
  var stimCount = store.get('spellingbee_problems_solved');
  if(!stimCount) stimCount = 0;
  queuesToUpdate['wordstim'] = true;
  logTime('spelling','start');
  var stimQ = stimQueues['wordstim'];

  var bee_start_pos = {'x':250, 'y':250};

  var Nfoils = store.get('spellingbee_foils');
  if(!Nfoils) Nfoils = 0;
  var minFoils = 0;
  var maxFoils = 4;
  var beeFramesUntilArrival = 200; // lower is faster
  var minBeeFrames = 100; // and it changes by 30
  var maxBeeFrames = 300;
  var scoreIncrease = 1;
/*
-------------------------------------------------------------------------------------------------------------
                                                Class: bubble
-------------------------------------------------------------------------------------------------------------
*/

  function bubble(_trial){

    this.trial = _trial;
    this.selected = true;
    this.valueObjects = [];
    this.ang = getRandomInt(-11,11)/5;
  };

  bubble.prototype.init = function(_value,_position,_size,_id){

      var _this = this;

      this.value = _value;
      this.id = _id;
      this.clicked = false; // just-clicked
      this.visited = false; // by bee or player
      //this.posdId = _position.id;
      //console.log(_position);
      this.pos = _position.pos;
      this.size = _size;
      this.grow = false;
      this.container = new PIXI.Container();
      this.trialTimer = new ClockTimer();

      if(Math.random()>.5) {
        this.circle = new PIXI.Sprite(assets.textures.flower1);
      } else {
        this.circle = new PIXI.Sprite(assets.textures.flower2);
      }
      this.circle.width = this.size;
      this.circle.height = this.size;
      this.circle.anchor.x = 0.5;
      this.circle.anchor.y = 0.5;
      this.container.interactive = true;
      this.container.buttonMode = true;
      this.container.mousedown = this.container.touchstart = function(){ click(); }

      function click() {
        _this.click();
      }

      this.container.addChild(this.circle);
      this.circle.x = this.pos.x+this.size/2;
      this.circle.y = this.pos.y+this.size/2;
      this.center = {x: this.circle.x, y: this.circle.y};
      // fill:"#427010", stroke:"#098478" getRandomColor
      var randColor = coolColors[getRandomInt(0,coolColors.length-1)];
      this.cStim =  new PIXI.Text(this.value, {font:"60px Arial",align: 'center', weight:"red", fill: randColor, stroke:"#098478", strokeThickness: 1, });
      this.cStim.anchor.x = 0.5
      this.cStim.anchor.y = 0.5
      this.cStim.x = this.pos.x + this.size*0.5;
      this.cStim.y = this.pos.y + this.size*0.5;

      this.circle.rotation = 0.1;
      this.container.addChild(this.cStim);
      stage.addChild(this.container);
      this.display(false);
  };

  bubble.prototype.click = function(){ //_this,_event

    var correct_click = (this.value.toLowerCase()===this.trial.targetSeq[0].toLowerCase());
    // if correct, play correct sound, stop the bee, and move on
    if(correct_click & !this.clicked) {
      //correct_sound.play();
      this.clicked = true;
      letter_sounds[this.value.toUpperCase()].play();
      this.fade = true;
      this.trial.clock.start(700);
      this.trial.total_clicks += 1;


      var pos = [];
      for (var i=0; i<scoreIncrease; i++) {
        pos.push(this.center);
      }

      score.addScore(pos, scoreIncrease);
      score.setExplosion(this.center, 100,1000);



      correct_sound.play();
    }

    if(!correct_click) { // incorrect: play bad sound and wait
      incorrect_sound.play();
      this.trial.total_clicks += 1;
    }
    return correct_click;
  };

  bubble.prototype.destroy = function(){
      this.container.removeChild(this.circle);
      this.circle.destroy();
      this.circle = [];

      this.container.removeChild(this.cStim);
      this.cStim.destroy();
      this.cStim = [];

      stage.removeChild(this.container);
      this.container.destroy(true);
      this.container = [];

      this.destroyed = true;
  };

  bubble.prototype.display = function(_show){

      if(!_show){
          this.circle.interactive = false;
          this.circle.renderable = false;
          this.container.renderable = false;
          this.destroyed = true;
      }else{
          this.circle.interactive = true;
          this.circle.renderable = true;
          this.container.renderable = true;
          this.destroyed = false;
      }
  };

  bubble.prototype.animate = function(tick){

      if(this.destroyed){
          return;
      };

      if(this.grow) { // target reached
          this.circle.scale.x += .004;
          this.circle.scale.y += .004;
          this.cStim.scale.x += .01;
          this.cStim.scale.y += .01;
      }

      if(this.fade){
          this.circle.alpha -= 0.1;
          this.cStim.alpha -= 0.1;
          this.circle.scale.x += .03;
          this.circle.scale.y += .03;
          if(this.circle.alpha <= 0){
              this.display(false)
          };

      } else{
          this.ang = (this.ang + 0.05) % (Math.PI*2);
          //this.circle.width = this.size + Math.sin(this.ang) * 2;
          //this.circle.height = this.size + Math.sin(this.ang) * 2;
          //this.circle.rotation = Math.sin(this.ang) * 0.02;
          this.container.position.x += .2*Math.cos(this.ang);
          this.container.position.y += .2*Math.sin(this.ang); //* .3; // move bubbles a bit?
      }
  };

/*
-------------------------------------------------------------------------------------------------------------
                                                Class: Trial
-------------------------------------------------------------------------------------------------------------
*/

  function Trial(_stim){

      stimCount++;
      this.starttime = Date.now();
      this.total_clicks = 0;
      this.target = _stim.text; // the target word the player/bee spells
      //this.targetSeq = this.target.replace(/\s+/g, ''); // no spaces
      this.targetSeq = this.target.split('');
      this.targetBubbleIndex = 0; // increase as target word is spelled
      this.targetAudio = new Audio('audio/'+language+'/'+_stim.audio+'.ogg'); // read the word first
      this.lowercase = false;
      // foils lower-cased
      this.lowercase = true;

      this.foils = this.generateFoils(this.target);
      this.origstim = _stim; // in original form to push back on stimulus queue
      this.clock = new ClockTimer();
      this.trialWon = -1;
      this.trialState = "intro";
      this.introState = "playSound";

      this.bubble = [];
      this.matrixAvailable = [];
      this.specs = this.getSpecs();
      this.posMatrix = this.getMatrixPosition();
      this.operation = 0;

      this.AnimationDone = true;
      this.performOperation = false;
      this.countDone = false;

  };

  Trial.prototype.generateFoils = function(target) {
    // sample Nfoils that are NOT in target word
    var foils = [];
    var shl = shuffle(letters.slice());
    while(foils.length<Nfoils) {
      var tmp = shl.pop();
      if(!target.toLowerCase().includes(tmp.text.toLowerCase())) foils.push(tmp.text);
    }
    //console.log(foils);
    return foils;
  };

  Trial.prototype.init = function(){
    // track sequence of locations for bee to travel to
    var bubbleValues = this.targetSeq.slice();
    console.log(bubbleValues)
    for (var i=0; i<this.foils.length; i++){
      if(i < this.posMatrix.length){
        bubbleValues.push(this.foils[i]);
      } else {
        console.log("more foils than can fit on screen..skipping 1");
      }
    }

    for (var i=0; i<bubbleValues.length; i++){
        //var pos = getRandomInt(0,this.posMatrix.length);
        this.bubble.push(new bubble(this));
    }

    // create bubble graphics
    for (var i=0; i<bubbleValues.length; i++){
      var bubval = bubbleValues[i];
      if(this.lowercase) bubval = bubval.toLowerCase();
      this.bubble[i].init(bubval, this.getPos(i), this.specs.stimWidth, i)
    }

    // first bubble is target
    this.targetx = this.bubble[0].circle.x;
    this.targety = this.bubble[0].circle.y + 25;

    // create bee
    this.bee = new PIXI.extras.MovieClip(assets.sprites.bee);
    this.bee.animationSpeed = 0.16;
    this.bee.play();
    this.bee.width = screen_width*.15; //250;
    this.bee.height = this.bee.width*.8; //200;
    this.bee.position.x = bee_start_pos.x;
    this.bee.position.y = bee_start_pos.y;
    this.bee.anchor.y = 0.5;
    this.bee.anchor.x = 0.5;
    stage.addChild(this.bee);

    this.deltax = Math.abs(this.targetx - this.bee.position.x) / beeFramesUntilArrival;
    this.deltay = Math.abs(this.targety - this.bee.position.y) / beeFramesUntilArrival;

    this.spelledWord = '';
    // draw word as it's spelled (and say a final time!)
    this.wordText = new PIXI.Text("", {
      font:"60px Arial",
      align: 'left',
      weight:"bold",
      fill: "#eeeeee",
      stroke:"#eeeeee",
      strokeThickness: 0,
    });
    this.wordText.x = 150;
    this.wordText.y = 20;
    this.wordText.renderable = true;
    stage.addChild(this.wordText)

    this.clock.start(1000);
  };

  Trial.prototype.destroy = function(){

      for(var i = 0; i<this.bubble.length; i++){
          this.bubble[i].destroy();
      }

      stage.removeChild(this.wordText);
      this.wordText.destroy();

      stage.removeChild(this.bee);
      this.bee.destroy();
  };

  Trial.prototype.updateWordText = function(){
    this.wordText.text = this.spelledWord;
  }

  Trial.prototype.getSpecs = function(){
      var obj = {};
      obj.canvasMargin = 30;
      obj.stimWidth = 125;
      obj.margin = 15; //30; // was 15

      obj.width = session.canvas.width-(2*obj.canvasMargin)-obj.stimWidth/2;
      obj.height = session.canvas.height-(2*obj.canvasMargin);

      obj.moduleSize = obj.stimWidth+(obj.margin*2);

      obj.moduleWidthCount = Math.floor(obj.width/obj.moduleSize);
      obj.moduleHeightCount = Math.floor(obj.height/obj.moduleSize);

      obj.widthInter = obj.width/obj.moduleWidthCount;
      obj.heightInter = obj.height/obj.moduleHeightCount;

      obj.marginW = (obj.widthInter - obj.stimWidth)/2;
      obj.marginH = (obj.heightInter - obj.stimWidth)/2;

      return obj;
  };

  Trial.prototype.getMatrixPosition = function(){
    var allPos = [];
    for(var i=0;i<this.specs.moduleWidthCount;i++){
        for(var j=0;j<this.specs.moduleHeightCount;j++){
            offset = j%2;
            var newx = (this.specs.widthInter*i)+this.specs.marginW+this.specs.canvasMargin+((this.specs.widthInter/2)*offset)+getRandomInt(-20,20);
            var newy = (this.specs.heightInter*j)+this.specs.marginH+this.specs.canvasMargin+getRandomInt(-20,20);
            //if(distance(bee_start_pos.x, bee_start_pos.y, newx, newy) > 200) {
              allPos.push({id: i, pos:{ x: newx, y: newy} });
            //}
          }
    }

    for(var i=0; i<allPos.length; i++){
      this.matrixAvailable.push(i);
    }
    return allPos;
  };

  Trial.prototype.getPos = function(_i){
    var aPos = getRandomInt(0,this.matrixAvailable.length);
    var i = this.matrixAvailable[aPos];
    this.matrixAvailable.splice(aPos,1);
    return this.posMatrix[i];
  };

  Trial.prototype.intro = function(){
      switch(this.introState){
          case "playSound":
              if(this.clock.timeOut()){
                  var dest = {};
                  dest.x = session.canvas.width / 2;
                  dest.y = (session.canvas.height/2);
                  this.introState = "spawnBubbles";
              }
              break;

          case "spawnBubbles":
              for(var i = 0; i < this.bubble.length; i++){
                  this.bubble[i].display(true);
              }
              return true;
              break;

      }
      return false;
  };

  Trial.prototype.targetLetterClicked = function() {
    var clicked_target = false;
    for (var i = 0; i < this.bubble.length; i++) {
      if(this.bubble[i].clicked & this.bubble[i].value==this.bubble[this.targetBubbleIndex].value) {
        clicked_target = true;
        this.bubble[i].grow = true;
        this.bubble[i].container.interactive = false;
        this.bubble[i].clicked = false; // reset
        this.bubble[i].visited = true;
      }
    }
    return clicked_target;
  }

  // first still-interactive bubble should be next target
  Trial.prototype.setNextTarget = function() {
    for (var i = 0; i < this.bubble.length; i++) {
      if(this.bubble[i].container.interactive & this.bubble[i].value==this.targetSeq[0]) {
        this.targetBubbleIndex = i;
        this.targetx = this.bubble[i].circle.x;
        this.targety = this.bubble[i].circle.y + 25;
        this.deltax = Math.abs(this.targetx - this.bee.position.x) / beeFramesUntilArrival;
        this.deltay = Math.abs(this.targety - this.bee.position.y) / beeFramesUntilArrival;
        return;
      }
    }
    this.targetBubbleIndex = this.bubble.length;
  }

  // returns true if bee reaches target
  Trial.prototype.moveBee = function() {

    if(!this.clock.timeOut()) { // bee's not moving now (e.g., intro)
      return false;
    }

    // if they have clicked the next target letter, pop and move on
    var clicked_target = this.targetLetterClicked();
    //this.bubble[this.targetBubbleIndex].clicked
    if(clicked_target) {
      this.spelledWord += this.targetSeq.shift();

      if(this.targetSeq.length==0) { // final letter
        console.log("final letter clicked")
        this.finishedState = "endanimation"; // "win"
        this.trialWon = true;
        correct_sound.play();
      } else {
        // set bee destination to first letter that is still interactive
        this.setNextTarget();
      }
      bee_start_pos = this.bee.position;
      return true;
    }

    //if distance from target is <10, pop letter and move on to next
    var dist = distance(this.bee.position.x, this.bee.position.y, this.targetx, this.targety);
    if(dist>=10) {
      if(this.targetx > this.bee.position.x) {
        this.bee.position.x += this.deltax;
      } else {
        this.bee.position.x -= this.deltax;
      }

      if(this.targety > this.bee.position.y) {
        this.bee.position.y += this.deltay;
      } else {
        this.bee.position.y -= this.deltay;
      }

      return false;
    } else { // bee reached next target letter; play it and move to next letter
      if(!this.bubble[this.targetBubbleIndex].visited) {
        this.bubble[this.targetBubbleIndex].visited = true;
        this.bubble[this.targetBubbleIndex].container.interactive = false;
        bee_start_pos = this.bee.position;
        letter_sounds[this.targetSeq[0].toUpperCase()].play();
        this.bubble[this.targetBubbleIndex].grow = true;
        this.bubble[this.targetBubbleIndex].fade = true;
        this.spelledWord += this.targetSeq.shift();
        if(this.targetSeq.length==0) {
          this.finishedState = "endanimation";
          this.trialWon = false;
        } else {
          this.setNextTarget();
          console.log("bee reached non-final letter");
        }
      }
      return true;
    }
  }

  Trial.prototype.storeStim = function() {
    var randAdjust = Math.random() * .1 - .05;
    if(this.wrongClicks < 2) {
      var newpriority = this.origstim.priority + correctPriorityIncr;
    } else {
      var newpriority = this.origstim.priority + .3;
    }
    this.origstim.priority = newpriority + randAdjust;
    return this.origstim;
  };

  Trial.prototype.adjustDifficulty = function(won) {
    if(won) {
      if(Nfoils<maxFoils) Nfoils++;
      if(beeFramesUntilArrival>minBeeFrames) beeFramesUntilArrival -= 30;
    } else {
      if(Nfoils>minFoils) Nfoils--;
      if(beeFramesUntilArrival<maxBeeFrames) beeFramesUntilArrival += 30;
    }
    store.set('spellingbee_foils', Nfoils);

    if(stimCount > 50) scoreIncrease = 2;
    if(stimCount > 100) scoreIncrease = 5;
  }

  Trial.prototype.finished = function() {

    switch(this.finishedState){
      case "endanimation":
        this.adjustDifficulty(this.trialWon);
        store.set('spellingbee_foils', Nfoils);
        store.set('spellingbee_problems_solved', stimCount);
        if(this.trialWon){
          this.clock.start(1500);
          this.finishedState = "win";

        }else{
          this.clock.start(1500);
          this.finishedState = "lose";
        }
        logTrial({"starttime":this.starttime, "endtime":Date.now(), "stimtype":'spellbee', "stim":this.target, "num_foils":this.foils.length, "total_clicks":this.total_clicks, "correct":this.finishedState, "lowercase":this.lowercase});
        break;

      case "lose":
        if(this.clock.timeOut()) {
          this.finishedState = "callNext";
          incorrect_sound.play();
        }
        break;

      case "win":
        if(this.clock.timeOut()) this.finishedState = "callNext";
        break;

      case "callNext":
        return true;
        break;
      }

      return false;
  };

  Trial.prototype.play = function(_updateTime){

        switch(this.trialState){
            case "intro":
                if(this.intro()){
                  this.clock.start(1000);
                  this.targetAudio.play();
                  //console.log("playing: "+this.target);
                  this.trialState = "play";
                }
                break;

            case "play":

                for(var i=0;i<this.bubble.length;i++){
                    this.bubble[i].animate(_updateTime);
                }

                score.displayStar();
                score.displayExplosion();

                var nextLetter = this.moveBee();
                if(nextLetter) {
                  // points, get rid of bubbles, start new trial
                  if(this.targetSeq.length==0) {
                    this.trialState = "finished"; // wait 1000ms for feedback and bubble pops
                    //this.clock.start(1000);
                    this.targetAudio.play();
                    this.setNextTarget();
                  }
                }
                this.updateWordText();
                break;

            case "finished":
                // pop all but the correct one (could do this in moveBee)
                //if(this.clock.timeOut()) {}
                for(var i=1;i<this.bubble.length;i++){
                    this.bubble[i].fade = true;
                }
                for(var i=0;i<this.bubble.length;i++){
                    this.bubble[i].animate(_updateTime);
                }
                score.displayStar();
                score.displayExplosion();

                if(this.finished()){
                    return true;
                }
                break;
            };
            return false;
    };

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

        if(spellingbeeloaded) {
            assets.addSprite("bee",'sprites/bee/bee_fly.json',3);
            assets.addTexture("flower1","sprites/flower1.png");
            assets.addTexture("flower2","sprites/flower2.png");
            assets.addTexture("bg","sprites/backGrounds/flower_background.png");

            for (var i = 0; i < letters.length; i++) {
              assets.addSound(letters[i].text,letters[i].audio + '.ogg', "letters");
            };
            assets.load(onAssetsLoaded);
        } else {
            onAssetsLoaded();
        };

        function onAssetsLoaded(){
          round.init(Trial,stage, stimQ);
          setTimeout(function(){
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
        var MS_PER_UPDATE = 33.3333333;
        var lag = 0;

        function update() {

            if(finishGame){
                logTime("spelling",'stop');
                round.storeSession(stimQ, 'wordstim');
                session.stats.domElement.style.display = "none";
                round.destroy();
                assets.destroy();
                // unlock spelling bee game if enough problems have been done
                if(stimCount > unlockThreshold) _.find(Games, { 'name':'Spelling' }).available = true;
                finishGame = false;
                currentview = new MainMenu();
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
};
