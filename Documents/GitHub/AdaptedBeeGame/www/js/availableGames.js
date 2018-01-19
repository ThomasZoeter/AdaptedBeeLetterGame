// initialized in first session
// availability updated in adaptiveAI upon game exit
// e.g., Addition unlocked after 3 correct counting problems
// (low threshold for judging)
var unlockThreshold = 3; // problems to be solved per game to unlock the next

// spellingBee unlocked after 3 correct bubbleLetters
var Games = [


    {
      name: "Alphabet",
      available: true,
      callFunction: "bubbleLetters",
      icon: "img/Menu/icons/flower.png"
    }
  
];

function updateAvailableGames() {
  // counting unlocks addition/subtraction
  var counting_problems_solved = store.get("numbers_problems_solved");
  if(counting_problems_solved > unlockThreshold) _.find(Games, { 'name':'Addition' }).available = true;
  // add/sub unlocks multiplication
  var ant_problems_solved = store.get("ant_problems_solved");
  if(ant_problems_solved > unlockThreshold) _.find(Games, { 'name':'Multiply' }).available = true;
  // alphabet unlocks spelling bee
  var bee_problems_solved = store.get("bee_problems_solved");
  if(bee_problems_solved > unlockThreshold) {
    _.find(Games, { 'name':'Spelling' }).available = true;
    _.find(Games, { 'name':'WordFind' }).available = true;
  }

  // when online, enable hidden dashboard and data sync button: press bottom middle 5x
  //if(navigator.onLine) _.find(Games, { 'name': "Dashboard"}).available = true;

}
