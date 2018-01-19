var bubblegameloaded = false;

// for color randomization in bee game and maybe others
var nonblueColors = ["#DE1B1B","#CBE32D","#D9853B","#FFE658","#DF3D82","#7D1935","#551A8B","#99FF66"];
var coolColors = ['#355dff', '#1037b7', '#00186b', '#6f2fc4', '#ffffff'] // non-pink non-yellow
/*
  game works like this:
  x = target + distractors
  trial starts with x bubbles drawn onscreen, and a target letter is
  heard. then the bee appears in a random location and flies
  (slowly at first) towards the target. if the target is clicked before the
  bee reaches it, a point is scored (more for faster?). if the wrong
  bubble is popped or if the bee gets there first, (or bee gets a point?)
  number of distractors increases after 3 (1?) right, and speed adjusts constantly
*/

function bubbleLetters(){
  bubblegameloaded = true;
  var stimCount = store.get('bee_problems_solved');
  if(!stimCount) stimCount = 0;
  var stimtype = 'alphabetstim'; // or wordstim or shapestim
  // practice letters at first, then sometimes do shapes or short words

  if(stimCount>5) { // fast switch for judges; slower for kids
    if(Math.random()<.7) {
      stimtype = 'shapestim';
    } else {
      stimtype = 'wordstim';
    }
  }
  queuesToUpdate[stimtype] = true;
  logTime(stimtype,'start');
  var stimQ = stimQueues[stimtype];

  var bee_start_pos = {'x':250, 'y':250};

  var Nfoils = store.get('num_bee_foils');
  if(!Nfoils) Nfoils = 4; //change to 1 if normal version, 4 if adapted constant and 8 if increased adapted constant
  var minFoils = 4; //change to 1 if normal version, 4 if adapted constant and 8 if increased adapted constant
  var maxFoils = 4; //change to 8 if normal version, 4 if adapted constant and 8 if increased adapted constant
  var beeFramesUntilArrival = 200; // lower is faster
  var minbeeFrames = 100; // and it changes by 10
  var maxbeeFrames = 300;
  var scoreIncrease = 1;
  var scoreDecrease = -1;
  
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

      this.value = _value; // stim object
      this.id = _id;
      this.clicked = false;
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
      if(stimtype=="alphabetstim") {
        if(this.trial.lowercase) this.value.text = this.value.text.toLowerCase();
        this.cStim =  new PIXI.Text(this.value.text, {font:"60px Arial",align: 'center', weight:"red", fill: randColor, stroke:"#098478", strokeThickness: 1, });
      } else if(stimtype=="shapestim") {
        this.cStim = new PIXI.Sprite(assets.textures[this.value.id]);
        console.log("shape: "+this.value);
        this.cStim.width = this.size*.6;
        this.cStim.height = this.size*.6;
      } else if(stimtype=="wordstim") {
        if(this.trial.lowercase) this.value.text = this.value.text.toLowerCase();
        this.cStim =  new PIXI.Text(this.value.text, {font:"40px Arial",align: 'center', weight:"red", fill: randColor, stroke:"#098478", strokeThickness: 1, });
      }
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

    var correct_click = (this.value.id===this.trial.origstim.id);
    // if correct, play correct sound, stop the bee, and move on
    if(correct_click & !this.clicked) {
      correct_sound.play();
      this.trial.total_clicks += 1;
    }
    if(!correct_click) { // incorrect: play bad sound and wait
      incorrect_sound.play();
      this.trial.total_clicks += 1;
    }
    this.clicked = true;
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
      this.target = _stim.text; // the target letter the bee approaches
      
      if(stimtype=="alphabetstim") {
        this.targetAudio = letter_sounds[_stim.audio];
        //_stim.audio;
      } else { // shape or word
        this.targetAudio = new Howl({
          src: ['audio/'+language+'/'+_stim.audio+'.ogg'],
          autoplay: false
        });
      }
      this.lowercase = false;
      // eventually mix in some lower case letters
      if(stimCount>10 & Math.random()<.5) this.lowercase = true;

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

   //2 versions. Version 1 is original, version 2 has letters classified as neighbors.
   //Use a specific version by commenting out the other one

   //start version 1
   /* 
    // sample Nfoils that are NOT the target
    //return ['B','C','D'];
    var foils = [];
    if(stimtype=="alphabetstim") {
      var shl = shuffle(letters.slice());
    } ///else if(stimtype=="shapestim") {
      var shl = shuffle(shapes.slice());
    } else if(stimtype=="wordstim") {
      // want to just sample some from the stimQ..but not pop and re-push
      //var shl = _.find(words, function(o) { return o.text.length < 4; });
      //console.log("found "+shl.length+" words with length <4");
      var shl = shuffle(words.slice(0,100));
    } /else {
      console.log("invalid stimtype: "+stimtype);
    }
    if(shl.length<Nfoils) Nfoils = shl.length-1;
    //alert(shl);
    while(foils.length<Nfoils) {
      var tmp = shl.pop();
      if(tmp.text!=target) foils.push(tmp);
    }
    //console.log(foils);
    return foils;

    //end version 1

    //start version 2
    
*/


    
    var foils = [];
    
    
    //var classification = [["خ", "ح", "ج", "غ", "ع"],["ث", "ت ", "ب", "ن ", "ط"],["ز", "د", "ر", "ذ", "ل "],["ص", "ش", "س", "ض ", "م"],["ق", "ق", "ي", "و", "ظ"]];
    var arrays = specialletters.length;
    var contains = 5;
   // alert(target);
    var cls = specialletters.slice();
      for(var i=0; i < arrays; i++){
        for(var j=0; j < contains; j++){         
          if(cls[i][j].text == target){
            if(stimtype=="alphabetstim") var shl = shuffle(cls[i].slice()); 
            else console.log("invalid stimtype: "+stimtype);
           // if(shl.length<Nfoils) Nfoils = shl.length-1;
            
            while(foils.length<Nfoils) {
              var tmp = shl.pop();
              if(tmp.text!=target) foils.push(tmp);
              }          
          }
        }
      }
    
      
    
    return foils;



//end version 2

    
  };

  Trial.prototype.init = function(){
    // need to track the target's location so the bee can go to it
    var bubbleValues = [this.origstim]; // was this.target, which is stim.text
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

    this.clock.start(1000);
  };

  Trial.prototype.destroy = function(){

      for(var i = 0; i<this.bubble.length; i++){
          this.bubble[i].destroy()
      }

      stage.removeChild(this.bee);
      this.bee.destroy();
  };

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

  Trial.prototype.moveBee = function() {
    if(!this.clock.timeOut()) { // bee's not moving now (e.g., intro)
      return false;
    }
    // if they have clicked the target, they won
    if(this.bubble[0].clicked) {
      this.finishedState = "endanimation"; // "win"
      this.trialWon = true;
      this.bubble[0].grow = true;
      bee_start_pos = this.bee.position;
      var pos = [];
      for (var i=0; i<scoreIncrease; i++) {
        pos.push(this.bubble[0].center);
      }
      score.addScore(pos, scoreIncrease);
      score.setExplosion(this.bubble[0].center, 100,1000);
      return true;
    }

    //if distance from target is <10, person loses
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
    } else { // bee won!

      incorrect_sound.play();
      bee_start_pos = this.bee.position;
      this.bubble[0].grow = true;
      this.finishedState = "endanimation";
      this.trialWon = false;
      //score.addScore(scoreDecrease);
      return true;
    }
  }

  Trial.prototype.storeStim = function() {
    var randAdjust = Math.random() * .1 - .05;
    if(this.trialWon) {
      if(this.wrongClicks < 2 /*&& !(this.text == "ج" || this.text == "ب"|| this.text == "ر"|| this.text == "س"|| this.text == "ي")*/) { ///add part to adapt priority of certain letters 
        var newpriority = this.origstim.priority + correctPriorityIncr;
     // } else if(this.text == "ج" || this.text == "ب"|| this.text == "ر"|| this.text == "س"|| this.text == "ي"){/////add part to adapt priority of certain letters
     //   var newpriority = this.origstim.priority - 0.01;                                                      /////add part to adapt priority of certain letters
      } else {
        var newpriority = this.origstim.priority + incorrectPriorityIncr;
      }
    } else {
      var newpriority = this.origstim.priority + .1; // Math.log(this.wrongClicks+1) or -.1
    }
    this.origstim.priority = newpriority + randAdjust;
    return this.origstim;
  };

  Trial.prototype.adjustDifficulty = function(won) {
    if(won) {
      if(Nfoils<maxFoils) Nfoils++;
      if(beeFramesUntilArrival>minbeeFrames) beeFramesUntilArrival -= 20;
    } else {
      if(Nfoils>minFoils) Nfoils--;
      if(beeFramesUntilArrival<maxbeeFrames) beeFramesUntilArrival += 20;
    }
    store.set('num_bee_foils', Nfoils);

    if(stimCount > 100) {
      scoreIncrease = 5;
    } else if(stimCount > 50) {
      scoreIncrease = 2;
    } else {
      scoreIncrease = 1; //Math.ceil(stimCount / 10);
    }
  }

  Trial.prototype.finished = function() {

    switch(this.finishedState){
      case "endanimation":
        this.adjustDifficulty(this.trialWon);
        store.set('num_bee_foils', Nfoils);
        store.set('bee_problems_solved', stimCount);
        if(this.trialWon){
          this.clock.start(1500);
          this.finishedState = "win";

        }else{
          this.clock.start(1500);
          this.finishedState = "lose";
        }
        logTrial({"starttime":this.starttime, "endtime":Date.now(), "stimtype":'bee', "stim":this.target, "num_foils":this.foils.length, "total_clicks":this.total_clicks, "correct":this.finishedState, "lowercase":this.lowercase});
        break;

      case "lose":
        //console.log("bee won!"); // make it swell?
        if(this.clock.timeOut()) this.finishedState = "callNext";
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
                    this.clock.start(1500);
                    this.targetAudio.play();
                    //console.log("playing: "+this.target);
                    this.trialState = "play";
                }
                break;

            case "play":
                for(var i=0;i<this.bubble.length;i++){
                    this.bubble[i].animate(_updateTime);
                }

                var beeReachedTarget = this.moveBee();

                if(beeReachedTarget) { // computer wins!
                  // points, get rid of bubbles, start new trial

                  this.trialState = "finished"; // wait 1000ms for feedback and bubble pops              
                  score.addScore(scoreDecrease);
                }
                break;

            case "finished":
                // pop all but the correct one (could do this in moveBee)
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

        if(bubblegameloaded) {
            //assets.addSprite("bee",'sprites/bee/bee_fly.json',3);
            assets.addSprite("bee",'sprites/bee/bee_fly.json',3);
            //assets.addTexture("bubble","img/bubble.png");
            assets.addTexture("flower1","sprites/flower1.png");
            assets.addTexture("flower2","sprites/flower2.png");
            /*
            for (var i = 0; i < shapes.length; i++) {
              assets.addTexture(shapes[i].id,"svgs/shapes/"+shapes[i].image+".png");
            }
            */
            //assets.addTexture("bg","sprites/backGrounds/BackGround-05.png");
            assets.addTexture("bg","sprites/backGrounds/flower_background.png");

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
                //console.log("ending bubbleLetters");
                logTime("alphabet",'stop');
                round.storeSession(stimQ, 'alphabetstim');
                session.stats.domElement.style.display = "none";
                round.destroy();
                assets.destroy();
                finishGame = false;
                currentview = new MainMenu(); // assets?
                //bubblegameloaded = false; // or does leaving it on prevent re-loading assets?
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

