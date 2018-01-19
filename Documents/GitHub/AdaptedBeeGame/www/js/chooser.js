var MainMenu = function() {
  clickStart('container-exp','container-chooser');
  logTime('menu','start');
  theme_song.play();
};

function Start(){
  // requires availableGames.js:Games, containing the updatable list of games
 // updateAvailableGames();

  var finished = 0;
  for(var i = Games.length-1; i >= 0; i--){
    if(Games[i].available && Games[i].icon){
      finished++;
    }
  }

  // hide task and show chooser
  var containerMainMenu = document.getElementById("icons");
  var totalWidth = 0;
  var allAvailable = [];
  var biggest = 0;
  var counter = 0;

  var iconsPerLine = 5;
  var margin = 0.1;

  for(var i = Games.length-1; i >= 0; i--){

    // only add it if they have made enough progress to get to it!
    if(Games[i].available) {

      Games[i].callFunction = eval(Games[i].callFunction);

      if(Games[i].icon) {

        var game = new Image();
        game.src = Games[i].icon
        game.id = i;
        game.style.display = "none"

        game.onload = function(){
          counter++;

          console.log( "loaded", this);
          console.log("finished:", finished,counter )

          totalWidth = totalWidth + this.naturalWidth

          if(biggest < this.naturalHeight ){
            biggest = this.naturalHeight;
          }

          if(finished == counter){
             arrangeSize();
          }

        }

      } else {

        var game = document.createElement("div");
        game.id = i;
        game.innerHTML = "<p>"+Games[i].name+"</p>";

      }

      game.className = "MenuButton";

      var gameClick = function(){

        theme_song.stop();
        logTime('menu','stop');
        document.getElementById("container-exp").style.height = window.innerHeight;
        session.setRenderer();
        clickStart('container-chooser','container-exp');
        console.log(">>>>>>>>>>>>>>>>>")
        currentview = new Games[this.id].callFunction();
        console.log(currentview)

      }

      game.onclick = gameClick;
      containerMainMenu.insertBefore(game, containerMainMenu.children[0]);
      allAvailable.push(game);

    }
  }

  var dashboard = document.createElement("dashBoard");
  var dashClickCount = 0;
  dashBoard.onclick = function(){
    dashClickCount++;
    if(dashClickCount > 5){

      dashClickCount = 0;
      //logTime('menu','stop');
      //document.getElementById("container-exp").style.height = window.innerHeight
      clickStart('container-chooser','container-exp');
      currentview = new Games[Games.length-1].callFunction();
    }
  }

  window.onresize = arrangeSize

  function arrangeSize(){

    containerMainMenu.style.paddingRight = window.innerWidth * margin
    containerMainMenu.style.paddingLeft = window.innerWidth * margin
    var iconSize = (window.innerWidth/iconsPerLine) * (1-(2*margin))

    console.log(window.innerWidth)

    for(var i = allAvailable.length-1; i >= 0; i--){

      allAvailable[i].style.display = "block";
      allAvailable[i].style.width = iconSize;
      allAvailable[i].style.height = iconSize;

    }

  }

  if(!PIXIInitialized){

      session = new CanvasSession();
      assets = new Assets();
      score = new gameScore();

      assets.addTexture('star',"sprites/star/star.png")
      session.init();
      PIXIInitialized = true;

  }

  currentview = new MainMenu();
}
