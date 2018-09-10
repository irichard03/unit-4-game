//Executes on page ready.
$(document).ready(function() {

  //define the character class for my jets.
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
  //create instances of the character class for each jet and gamestate for conditioanls.
  var viper = new Character(4,2,2,"F-16 Viper",false,false,"assets/images/f16.jpg",true);
  var fishbed = new Character(4,2,1,"Mig-21 Fishbed",false,false,"assets/images/mig21.jpg",true);
  var typhoon = new Character(4,2,3, "Eurofighter Typhoon", false,false,"assets/images/typhoon.jpg",true);
  var player;
  var enemy;
  var gameState = "newGame";    //process is  - pickPlane - pickOpponent1 - fight  - pickOpponent2 - resolve - win/lose
  

  debug();
//Start of execution.

  buildPage();      //setup 3x3 grid and defines space for player, opponent, and combat. 
  
  
  selectAirCraft(); //create onclick events to capture plane selection.
  

//end of execution

//interal functions

//Setup the page, poulating grid.
function buildPage(){
  

  for(var i = 1; i <= 9; i++){
    $(".grid-container").append("<div class='grid-item' id='grid" + i + "'>");
    $("#" + i).text(i);

  }
 
  //set aside the grid for specific functions. Splash ONe and Two were going to hold destroyed oppoenents, but I changed lay out.
  $("#grid1").attr("id","player");
  $("grid2").attr("id","combatZone");
  $("#grid3").attr("id","enemy");
  $("#grid7").attr("id","splashOne");
  $("#grid9").attr("id","splashTwo");

 //populates selectable jets in the grid middle row.
  $("#grid4").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
  $("#grid5").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'>");
  $("#grid6").append("<img src='" + typhoon.path + "' alt='typhoon' id='typhoon'>");

  //sets inital gamestate so the pickPlane function can called multiple times to select player, opponent, and opponent 2.
  gameState="pickPlane";
}

  //function to pick player and opponent, set info text under player grid and enemy grid, and controls clearing grid after selection.
function selectAirCraft(){
  //conditional, if not picking player's aircraft, you're pickign your opponent in this function.
  if(gameState === "pickOpponent2"){
    $("h3").text(enemy.jetName + "was shot down, Choose next Opponent.");
  }

  //This is my nasty on click function that has to be done for each image, I was originally using attributes to select but I was messing up the syntax so I went back to class and
  $("#grid4").on("click", function() {
    
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#player").append("<p id='playerText'>" + viper.jetName + "</p><p id='playerHP'>HP: " + viper.hitPoints + "</p><p id='playerAP'>AP: " + viper.attackPower + "</p><p id='playerLog'>Log</p>");
      viper.player = true;
      player = viper;
      $("#grid4").off();
      $("#grid4").empty();
      gameState = "pickOpponent1";
      $("h3").text("Choose Opponent.");
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#enemy").append("<p id='enemyText'>" + viper.jetName + "</p><p id='enemyHP'>HP: " + viper.hitPoints + "</p><p id='enemyAP'>AP: " + viper.counterAttackPower + "</p><p id='enemyLog'>Log</p>");
      viper.enemey = true;
      enemy = viper;
      $("#grid4,#grid5,#grid6").off();
      gameState = "pickOpponent2";
      $("#grid4").empty();
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#enemy").append("<p id='enemyText'>" + viper.jetName + "</p><p id='enemyHP'>HP: " + viper.hitPoints + "</p><p id='enemyAP'>AP: " + viper.counterAttackPower + "</p><p id='enemyLog'>Log</p>");
      viper.enemey = true;
      enemy = viper;
      $("#grid4").off();
      gameState = "resolve";
      $("#grid4").empty();
      fight();
    }
    
   
  });

  $("#grid5").on("click", function() {
    
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'>");
      $("#player").append("<p id='playerText'>" + fishbed.jetName + "</p><p id='playerHP'>HP: " + fishbed.hitPoints + "</p><p id='playerAP'>AP: " + fishbed.attackPower + "</p><p id='playerLog'>Log</p>");
      fishbed.player = true;
      player = fishbed;
      $("#grid5").off();
      gameState = "pickOpponent1";
      $("#grid5").empty();
      $("h3").text("Choose Opponent.");
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + fishbed.path + "' alt='mig-21' id='fisbed'>");
      $("#enemy").append("<p id='enemyText'>" + fishbed.jetName + "</p><p id='enemyHP'>HP: " + fishbed.hitPoints + "</p><p id='enemyAP'>AP: " + fishbed.counterAttackPower + "</p><p id='enemyLog'>Log</p>");
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
      $("#enemy").append("<p id='enemyText'>" + fishbed.jetName + "</p><p id='enemyHP'>HP: " + fishbed.hitPoints + "</p><p id='enemyAP'>AP: " + fishbed.counterAttackPower + "</p><p id='enemyLog'>Log</p>");
      fishbed.enemey = true;
      enemy = fishbed;
      $("#grid5").off();
      gameState = "resolve";
      $("#grid5").empty();
      fight();
    }
    
  });

  $("#grid6").on("click", function() {
    
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#player").append("<p id='playerText'>" + typhoon.jetName + "</p><p id='playerHP'>HP: " + typhoon.hitPoints + "</p><p id='playerAP'>AP: " + typhoon.attackPower + "</p><p id='playerLog'>Log</p>");
      typhoon.player = true;
      player = typhoon;
      $("#grid6").off();
      gameState = "pickOpponent1";
      $("#grid6").empty();
      $("h3").text("Choose Opponent.");
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#enemy").append("<p id='enemyText'>" + typhoon.jetName + "</p><p id='enemyHP'>HP: " + typhoon.hitPoints + "</p><p id='enemyAP'>AP: " + typhoon.counterAttackPower + "</p><p id='enemyLog'>Log</p>");
      typhoon.enemey = true;
      enemy = typhoon;
      $("#grid4,#grid5,#grid6").off();
      gameState = "pickOpponent2";
      $("#grid6").empty();
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#enemy").append("<p id='enemyText'>" + typhoon.jetName + "</p><p id='enemyHP'>HP: " + typhoon.hitPoints + "</p><p id='enemyAP'>AP: " + typhoon.counterAttackPower + "</p><p id='enemyLog'>Log</p>");
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

  $("#grid2").append("<button id='attack' type='button' onClick='missileAttack()'>Fire Missile</button>");
  $("h3").text("" + player.jetName + " vs. " + enemy.jetName + "");
  

  $("#attack").on("click", function(){
    enemy.hitPoints -= player.attackPower;
    $("#enemyHP").text("HP:" + enemy.hitPoints + "");
    $("#enemyLog").text("Hit, takes " + player.attackPower + "damage.");
    if(enemy.hitPoints <= 0){
      
      player.attackPower = player.attackPower * 2;
      $("#playerLog").text("Attack power doubled!");
      $("#playerAP").text("AP: " + player.attackPower + "");
      
      //disable attack button and pick another opponent. No counterattacking while being shot down.
      if(gameState != "resolve"){
        $("#grid2").empty();
        $("#enemy").empty();
        
        selectAirCraft();
      }
      //Win condition is met, write to message, and display win image.
      else if(gameState === "resolve"){
        $("h3").text(enemy.jetName + "loses " + player.attackPower + " hp.\n" + enemy.jetName + " was shot down!\nCongratulations " + player.jetName + " pilot," + " you're the top ACE!");
        $("#grid2,#grid5,#grid4,#grid6,#player,#enemy").empty();
        $("#grid2").append("<img src='assets/images/ace.jpg'>");
      }

    }

    //counter attack & lose condtions
    if(enemy.hitPoints > 0){
      player.hitPoints -= enemy.counterAttackPower;
      $("#playerHP").text("HP:" + player.hitPoints + "");
      $("#playerLog").text("Hit, takes " + enemy.counterAttackPower + " damage.");

      $("h3").text(player.jetName + "fires a missle, " + enemy.jetName + "loses " + player.attackPower + " hp.\n" + enemy.jetName + " has " + enemy.hitPoints + " remaining.");
      
      //$("#player#Text").text(player.jetName + "<br>HP: " + player.hitPoints + "<br>AP: " + player.attackPower);
      if(player.hitPoints <= 0){
        $("h3").text(enemy.jetName + " fires a missle at you, you take " + enemy.counterAttackPower + " points of damage, and are shot down!\nYou Lose!!!!");
        $("h3").css("animation-iteration-count","0");
      
       $("#grid2,#enemy,#player").empty();
      
       $("#grid2").append("<img src='assets/images/MiG29crash.jpg' alt='mig 29 exploding at uk airshow'>");
       $("#grid5,#grid4,#grid6").empty();
       

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