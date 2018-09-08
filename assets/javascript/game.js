
//Character Object, will house jets and their properties.
var character = {
  hitPoints: -1,
  attackPower: -1,
  counterAttackPower: -1,
  jetName: "potato",
  player: false
  

};

//Constructor function to create Character Objects, arguments number, number, number, string, boolean
function Character(hp, ap, cap, jet, cpu) {
  this.hitPoints = hp;
  this.attackPower = ap;
  this.counterAttackPower = cap;
  this.jetName = jet;
  this.player = cpu;
  
}

var MyJets = 3; //was going to do 4 jets but 9 grid is easier for central battle area.
///var paths = [ 'assets/images/mig21.jpg', 'assets/images/f16.jpg', 'assets/images/typhoon.jpg']

//here's where it happens...
function main(){
  
  $(document).ready(function() {
    buildPage();

  });

}
//Populates my html Grid with selectable fighters and creates jets objects.
function buildPage(){
  
  alert("BuildPageCalled"); 
  console.log("BuildPageCalled")

  //add jets and click events
  $(".grid-item[data-grid~='1'").append("<img src='assets/images/f16.jpg'>").on("click", function() {
  
      let viper = new Character(25,50,100,"F-16 Viper",true);
      
      $("h2").text("You chose the " + viper.jetName);
  });
  
  $(".grid-item[data-grid~='2'").append("<img src='assets/images/mig21.jpg'>").on("click", function() {
      
      let fishbed = new Character(25,25,25,"Mig-21 Fishbed",true);
      
      $("h2").text("You chose the " + fishbed.jetName);
  
  });
  
  $(".grid-item[data-grid~='3'").append("<img src='assets/images/typhoon.jpg'>").on("click", function() {
      
      let typhoon = new Character(100,50,100, "Eurofighter Typhoon", true);
      
      $("h2").text("You chose the " + typhoon.jetName);
  
  });
  

}

function select(selectedJet){
  
}
//Excecute all the things in main.
main();







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