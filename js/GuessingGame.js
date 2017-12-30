function generateWinningNumber(){
 return Math.floor((Math.random() * 100) + 1);
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
   while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
     return array;
}


function Game(playersGuess,pastGuesses){
  this.playersGuess=null;
  this.pastGuesses=[]; 
  this.winningNumber=generateWinningNumber();

}


Game.prototype.difference=function(){
  if(this.winningNumber>this.playersGuess){
      return this.winningNumber-this.playersGuess;
  } 
  else{
    return this.playersGuess-this.winningNumber;
  } 
  
};

Game.prototype.isLower=function(){
    if(this.playersGuess<this.winningNumber){
      return true;
    }
    return false;
  }
 Game.prototype.playersGuessSubmission=function(num){
    if(num<1||num>100||typeof num !=='number'){
        throw("That is an invalid guess.");
    }else{
        this.playersGuess=num;
        return this.checkGuess();
    } 
 } 

Game.prototype.checkGuess = function() {

    if(this.playersGuess===this.winningNumber) {
       $('#hint, #submit').prop("disabled",true);
        $('#subtitle').text("Press the Reset button to play again!")
        return 'You Win!';
    }else if(this.pastGuesses.indexOf(this.playersGuess) > -1){
        return 'You have already guessed that number.';
    }else {
        this.pastGuesses.push(this.playersGuess);
        $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
        if(this.pastGuesses.length === 5) {
          $('#hint, #submit').prop("disabled",true);
          $('#subtitle').text("Press the Reset button to play again!")
          return 'You Lose.';
        }else {

              if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }

              if(this.difference() < 10){
                  return'You\'re burning up!';
              }else if(this.difference()< 25){
                  return'You\'re lukewarm.';
              } else if(this.difference()< 50){
                  return'You\'re a bit chilly.';
              } else if(this.difference()< 100){
                  return'You\'re ice cold!';
              }
        }
       
    }//end of else 
}//end of functiom
    
function newGame(){
    return newGame = new Game();
}

Game.prototype.provideHint=function(){
    var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
}


function makeAGuess(game) {
    var guess = $('#player-input').val();
    //$("p").text("submit called"+guess);
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    //$("p").text("output is  :: "+output);
    $('#title').text(output);
}

$(document).ready(function() {
    var game = new Game();

    $("p").text("Page Loadded");
    
    $('#submit').click(function(e) {
      $("p").text("On submit called");
       makeAGuess(game);
    })

    $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           $("p").text("On Enter called");
           makeAGuess(game);
        }
    })

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    });

    $('#reset').click(function() {
        $("p").text("Hello World reset function!");
        //game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        game = new Game();
        $('#hint, #submit').prop("disabled",false);

    })
})









