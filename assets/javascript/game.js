//Executes on page ready.
$(document).ready(function() {

  //define the character class for my jets. I don't think I ever used alive property for anything.
  var character = {
    hitPoints: -1,
    attackPower: -1,
    counterAttackPower: -1,
    jetName: "potato",      //used in messages
    player: false,
    enmey: false,
    path: "",               //TAKE IN FILE PATH
    alive: true,            
  }
  //create instances of the character class for each jet and gamestate for conditioanls.
  var viper = new Character(20,15,20,"F-16 Viper",false,false,"assets/images/f16.jpg",true);
  var fishbed = new Character(40,15,10,"Mig-21 Fishbed",false,false,"assets/images/mig21.jpg",true);
  var typhoon = new Character(30,20,15, "Eurofighter Typhoon", false,false,"assets/images/typhoon.jpg",true);
  var player;
  var enemy;
  var gameState = "newGame";    //process is  - pickPlane - pickOpponent1 - fight  - pickOpponent2 - resolve - win/lose
  

  //debug(); 
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
 
  //set aside the grid for specific functions. Splash ONe and Two were going to hold destroyed oppoenents,but I just remove them now.
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
  //conditional, I didn't get timeout function to work so I have to be creative with messages in either player log or header as I haven't figure out how to time them.
  if(gameState === "pickOpponent2"){
    $("h3").text(enemy.jetName + "was shot down, Choose next Opponent.");
  }

  //This is my nasty on click function that has to be done for each image, I was originally using attributes to select but I was messing up the syntax so I went back to class and ID
  //I started to lose track of what exists since it's not in the index.html.  I should have used a function to get the selection then pass it into a single on click function so I didn't have to
  //write the same 3 code blocks 3 times.

  $("#grid4").on("click", function() {
    
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#player").append("<p id='playerText'>" + viper.jetName + "</p><p id='playerHP'>HP: " + viper.hitPoints + "</p><p id='playerAP'>AP: " + viper.attackPower + "</p><p id='playerLog'>***</p>");
      viper.player = true;
      player = viper;
      $("#grid4").off();
      $("#grid4").empty();
      gameState = "pickOpponent1";
      $("h3").text("Choose Opponent.");
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#enemy").append("<p id='enemyText'>" + viper.jetName + "</p><p id='enemyHP'>HP: " + viper.hitPoints + "</p><p id='enemyAP'>AP: " + viper.counterAttackPower + "</p><p id='enemyLog'>***</p>");
      viper.enemey = true;
      enemy = viper;
      $("#grid4,#grid5,#grid6").off();
      gameState = "pickOpponent2";
      $("#grid4").empty();
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + viper.path + "' alt='f-16' id='viper'>");
      $("#enemy").append("<p id='enemyText'>" + viper.jetName + "</p><p id='enemyHP'>HP: " + viper.hitPoints + "</p><p id='enemyAP'>AP: " + viper.counterAttackPower + "</p><p id='enemyLog'>***</p>");
      viper.enemey = true;
      enemy = viper;
      $("#grid4").off();
      gameState = "resolve";
      $("#grid4").empty();
      fight();
    }
    
   
  });

  //This handles the mig 21

  $("#grid5").on("click", function() {
    
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + fishbed.path + "' alt='mig-21' id='fishbed'>");
      $("#player").append("<p id='playerText'>" + fishbed.jetName + "</p><p id='playerHP'>HP: " + fishbed.hitPoints + "</p><p id='playerAP'>AP: " + fishbed.attackPower + "</p><p id='playerLog'>***</p>");
      fishbed.player = true;
      player = fishbed;
      $("#grid5").off();
      gameState = "pickOpponent1";
      $("#grid5").empty();
      $("h3").text("Choose Opponent.");
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + fishbed.path + "' alt='mig-21' id='fisbed'>");
      $("#enemy").append("<p id='enemyText'>" + fishbed.jetName + "</p><p id='enemyHP'>HP: " + fishbed.hitPoints + "</p><p id='enemyAP'>AP: " + fishbed.counterAttackPower + "</p><p id='enemyLog'>***</p>");
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
      $("#enemy").append("<p id='enemyText'>" + fishbed.jetName + "</p><p id='enemyHP'>HP: " + fishbed.hitPoints + "</p><p id='enemyAP'>AP: " + fishbed.counterAttackPower + "</p><p id='enemyLog'>***</p>");
      fishbed.enemey = true;
      enemy = fishbed;
      $("#grid5").off();
      gameState = "resolve";
      $("#grid5").empty();
      fight();
    }
    
  });

  //this handles the eurofighter typhoon.
  $("#grid6").on("click", function() {
    
    if(gameState === "pickPlane"){
      $("#player").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#player").append("<p id='playerText'>" + typhoon.jetName + "</p><p id='playerHP'>HP: " + typhoon.hitPoints + "</p><p id='playerAP'>AP: " + typhoon.attackPower + "</p><p id='playerLog'>***</p>");
      typhoon.player = true;
      player = typhoon;
      $("#grid6").off();
      gameState = "pickOpponent1";
      $("#grid6").empty();
      $("h3").text("Choose Opponent.");
    }
    else if(gameState === "pickOpponent1"){
      $("#enemy").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#enemy").append("<p id='enemyText'>" + typhoon.jetName + "</p><p id='enemyHP'>HP: " + typhoon.hitPoints + "</p><p id='enemyAP'>AP: " + typhoon.counterAttackPower + "</p><p id='enemyLog'>***</p>");
      typhoon.enemey = true;
      enemy = typhoon;
      $("#grid4,#grid5,#grid6").off();
      gameState = "pickOpponent2";
      $("#grid6").empty();
      fight();
    }
    else if(gameState === "pickOpponent2"){
      $("#enemy").append("<img src='" + typhoon.path + "' alt='Typhoon' id='typhoon'>");
      $("#enemy").append("<p id='enemyText'>" + typhoon.jetName + "</p><p id='enemyHP'>HP: " + typhoon.hitPoints + "</p><p id='enemyAP'>AP: " + typhoon.counterAttackPower + "</p><p id='enemyLog'>***</p>");
      typhoon.enemey = true;
      enemy=typhoon;
      $("#grid6").off();
      gameState = "resolve";
      $("#grid6").empty();
      fight();
      

    }
    
    
  });

  
}
//function to settle attack and counter attack, writes to enemy or player log during combat because I didn't figure out a way to separate attack and counterattack messages
//so counter attack/attack would be overwritten by messages.
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


//function I used to add debug values.
function debug(){
  console.log(viper);
  console.log(fishbed);
  console.log(typhoon);
}


});


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