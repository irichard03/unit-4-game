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
  var viper = new Character(6,2,1,"F-16 Viper",false,false,"assets/images/f16.jpg",true);
  var fishbed = new Character(6,2,1,"Mig-21 Fishbed",false,false,"assets/images/mig21.jpg",true);
  var typhoon = new Character(6,2,2, "Eurofighter Typhoon", false,false,"assets/images/typhoon.jpg",true);
  var player;
  var enemy;
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
  $("#grid1").attr("id","player");
  $("grid2").attr("id","combatZone");
  $("#grid3").attr("id","enemy");
  $("#grid7").attr("id","splashOne");
  $("#grid9").attr("id","splashTwo");

  //populate fighters
  $("#grid4").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
  $("#grid5").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'>");
  $("#grid6").append("<img src='" + typhoon.path + "' alt='typhoon' id='typhoon'>");


  //alert("Buildpage ran!");
  //debug();
  gameState="pickPlane";

}

function selectAirCraft(){
  
  $("#grid4").on("click", function() {
    //alert("YOU CLICKED ME");
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#player").append("<p>" + viper.jetName + "<br>HP: " + viper.hitPoints + "<br>AP: " + viper.attackPower + "</p>");
      viper.player = true;
      player = viper;
      $("#grid4").off();
      gameState = "pickOpponent1";
      $("#grid4").empty();
      $("h3").text("Choose Opponent.");
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#enemy").append("<p>" + viper.jetName + "<br>HP: " + viper.hitPoints + "<br>AP: " + viper.attackPower + "</p>");
      viper.enemey = true;
      enemy = viper;
      $("#grid4,#grid5,#grid6").off();
      gameState = "pickOpponent2";
      $("#grid4").empty();
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#enemy").append("<p>" + viper.jetName + "<br>HP: " + viper.hitPoints + "<br>AP: " + viper.attackPower + "</p>");
      viper.enemey = true;
      enemy = viper;
      $("#grid4").off();
      gameState = "resolve";
      $("#grid4").empty();
      fight();
    }
    
   
  });

  $("#grid5").on("click", function() {
    //alert("YOU CLICKED ME");
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'>");
      $("#player").append("<p>" + fishbed.jetName + "<br>HP: " + fishbed.hitPoints + "<br>AP: " + fishbed.attackPower + "</p>");
      fishbed.player = true;
      player = fishbed;
      $("#grid5").off();
      gameState = "pickOpponent1";
      $("#grid5").empty();
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + fishbed.path + "' alt='mig-21' id='fisbed'>");
      $("#enemy").append("<p>" + fishbed.jetName + "<br>HP: " + fishbed.hitPoints + "<br>AP: " + fishbed.attackPower + "</p>");
      fishbed.enemey = true;
      enemy = fishbed;
      $("#grid4,#grid5,#grid6").off();
      $("#fishbed").css("border","red");
      gameState = "pickOpponent2";
      $("#grid5").empty();
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'>");
      $("#enemy").append("<p>" + fishbed.jetName + "<br>HP: " + fishbed.hitPoints + "<br>AP: " + fishbed.attackPower + "</p>");
      fishbed.enemey = true;
      enemy = fishbed;
      $("#grid5").off();
      gameState = "resolve";
      $("#grid5").empty();
      fight();
    }
    
  });

  $("#grid6").on("click", function() {
    //alert("YOU CLICKED ME");
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#player").append("<p>" + typhoon.jetName + "<br>HP: " + typhoon.hitPoints + "<br>AP: " + typhoon.attackPower + "</p>");
      typhoon.player = true;
      player = typhoon;
      $("#grid6").off();
      gameState = "pickOpponent1";
      $("#grid6").empty();
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#enemy").append("<p>" + typhoon.jetName + "<br>HP: " + typhoon.hitPoints + "<br>AP: " + typhoon.attackPower + "</p>");
      typhoon.enemey = true;
      enemy = typhoon;
      $("#grid4,#grid5,#grid6").off();
      gameState = "pickOpponent2";
      $("#grid6").empty();
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#enemy").append("<p>" + typhoon.jetName + "<br>HP: " + typhoon.hitPoints + "<br>AP: " + typhoon.attackPower + "</p>");
      typhoon.enemey = true;
      enemy=typhoon;
      $("#grid6").off();
      gameState = "resolve";
      $("#grid6").empty();
      fight();

    }
    
    
  });

  
}

function fight(){
  $
  
  
  //alert("Fight called!");
  alert(player.jetName + " vs. " + enemy.jetName);
  $("#grid2").append("<button id='attack' type='button' onClick='missileAttack()'>Fire Missile</button>");

  $("#attack").on("click", function(){
    enemy.hitPoints -= player.attackPower;
  
    //check enemy hit points...
    //if < 0 provide message, double attack power
    if(enemy.hitPoints <= 0){
      alert(player.jetName + "fires a missle, " + enemy.jetName + "loses " + player.attackPower + " hp.\n" + enemy.jetName + " was shot down!");
      player.attackPower *= 2;
      //disable attack button and pick another opponent.
      if(gameState != "resolve"){
        $("#grid2").empty();
        $("#enemy").empty();
        selectAirCraft();
      }
      else if(gameState === "resolve"){
        alert("Congratulations " + player.jetName + " pilot," + " you're the top ACE!");
        $("#grid2,#grid5,#grid4,#grid6,#player,#enemy").empty();
        $("#grid2").append("<img src='assets/images/ace.jpg'>");
      }

    }
    if(enemy.hitPoints > 0){
      alert(player.jetName + "fires a missle, " + enemy.jetName + "loses " + player.attackPower + " hp.\n" + enemy.jetName + " has " + enemy.hitPoints + " remaining.");
      player.hitPoints -= enemy.counterAttackPower;
      if(player.hitPoints <= 0){
        alert(enemy.jetName + "fires a missle at your " + player.jetName + ", you take " + enemy.counterAttackPower + " points of damage, and are shot down!\nYou Lose!!!!");
       // $("#grid2").empty();
       $("#grid2,#enemy,#player").empty();
      // $("#enemy").empty();
      // $("#player").empty();
       $("#grid2").append("<img src='assets/images/MiG29crash.jpg' alt='mig 29 exploding at uk airshow'>");
       $("#grid5,#grid4,#grid6").empty();
       // $("h1").text("YOU LOSE.");
       // $("#enemy").empty();

      }
    }  
  });
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
 *To do: 

 change cap and ap to fit requirements:

                  damage      counter damage            hp      2 kill f16  2 kill mig  2 kill typhoon
    mig           1                 1                   6                    
    f16           2                 1                   4
    typhoon       2                 2                   6





 * 
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