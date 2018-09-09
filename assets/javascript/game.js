//Executes on page ready.
$(document).ready(function() {

  //define the character class
  var character = {
    hitPoints: -1,
    attackPower: -1,
    counterAttackPower: -1,
    jetName: "potato",
    player: false,
    enmey: false,
    path: "",
    alive: true,
  }
  //create instances of the character class for each jet.
  var viper = new Character(25,50,100,"F-16 Viper",false,false,"assets/images/f16.jpg",true);
  var fishbed = new Character(25,25,25,"Mig-21 Fishbed",false,false,"assets/images/mig21.jpg",true);
  var typhoon = new Character(100,50,100, "Eurofighter Typhoon", false,false,"assets/images/typhoon.jpg",true);
  var gameState = "newGame";    //process is newGame - pickPlane - pickOpponent1 - fight  - pickOpponent2 - resolve - win/lose
  

  debug();
//Start of execution.

  buildPage();      //setup 3x3 grid and defines space for player, opponent, and combat. 
  
  
  selectAirCraft(); //create onclick events to capture plane selection.
  

//end of execution

//interal functions

function buildPage(){
  

  for(var i = 1; i <= 9; i++){
    $(".grid-container").append("<div class='grid-item' id='grid" + i + "'>");
    $("#" + i).text(i);

  }
 
  //define areas
  $("#grid4").attr("id","player");
  $("grid5").attr("id","combatZone");
  $("#grid6").attr("id","enemy");
  $("#grid7").attr("id","splashOne");
  $("#grid9").attr("id","splashTwo");

  //populate fighters
  $("#grid1").append("<img src='" + viper.path + "' alt='f-16' id='viper'><p>1</p>");
  $("#grid2").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'><p>2</p>");
  $("#grid3").append("<img src='" + typhoon.path + "' alt='typhoon' id='typhoon'><p>3</p>");


  alert("Buildpage ran!");
  //debug();
  gameState="pickPlane";

}

function selectAirCraft(){
  
  $("#grid1").on("click", function() {
    alert("YOU CLICKED ME");
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      viper.player = true;
      $("#grid1").off();
      gameState = "pickOpponent1";
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      viper.enemey = true;
      $("#grid1").off();
      gameState = "pickOpponent2";
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      viper.enemey = true;
      $("#grid1").off();
      gameState = "resolve";
    }
    
    $("#grid1").empty();
  });

  $("#grid2").on("click", function() {
    alert("YOU CLICKED ME");
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'>");
      fishbed.player = true;
      $("#grid2").off();
      gameState = "pickOpponent1";
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + fishbed.path + "' alt='mig-21' id='fisbed'>");
      fishbed.enemey = true;
      $("#grid2").off();
      gameState = "pickOpponent2";
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'>");
      fishbed.enemey = true;
      $("#grid2").off();
      gameState = "resolve";
    }
    
    $("#grid2").empty();
  });

  $("#grid3").on("click", function() {
    alert("YOU CLICKED ME");
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      typhoon.player = true;
      $("#grid3").off();
      gameState = "pickOpponent1";
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      typhoon.enemey = true;
      $("#grid3").off();
      gameState = "pickOpponent2";
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      typhoon.enemey = true;
      $("#grid3").off();
      gameState = "resolve";
    }
    
    $("#grid3").empty();
  });

  
}

function fight(){
  alert("Fight called!");
  $("#grid5").append("<button id='attack'>Fire Missile</button>");
}

function debug(){
  console.log(viper);
  console.log(fishbed);
  console.log(typhoon);
}


});
//external functions

//Constructor function to create Character Objects, arguments number, number, number, string, boolean, boolean
function Character(hp, ap, cap, jet, good, bad, pic, status) {
  this.hitPoints = hp;
  this.attackPower = ap;
  this.counterAttackPower = cap;
  this.jetName = jet;
  this.player = good;
  this.enemey = bad;
  this.path = pic;
  this.alive = status;  
}





/**
 * 
 *  Here's how the app works:

   * When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.

   * The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.

   * The player chooses an opponent by clicking on an enemy's picture.

   * Once the player selects an opponent, that enemy is moved to a `defender area`.

   * The player will now be able to click the `attack` button.
     * Whenever the player clicks `attack`, their character damages the defender. The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 
     * The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.

3. The player will keep hitting the attack button in an effort to defeat their opponent.

   * When the defender's `HP` is reduced to zero or below, remove the enemy from the `defender area`. The player character can now choose a new opponent.

4. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's `HP` falls to zero or below.

##### Option 2 Game design notes

* Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

* Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
  * For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
* The enemy character only has `Counter Attack Power`. 

  * Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

* The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.

* No characters in the game can heal or recover Health Points. 

  * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.

* Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

 */