
const baseArray = ["X","X","X","X","O","O","O","O","X","X","X","X","O","O","O","O"];
var list = [".one",".two",".three",".four",".five",".six",".seven",".eight",".nine",".ten",".eleven",".twelve",".thirteen",".fourteen",".fifteen",".sixteen"];
var numbers = ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen"];
var revealed = [];
var omega = shuffle(baseArray);
labelButtons(omega);
var win = [];
var playerTurn = true;
var p1score = 0;
var p2score = 0;


var checkSystem = [];
var blink = [];



function shuffle(array){
  let shuffledArray = [];
  let usedIndexes = [];

  let i = 0;
  while(i < array.length){
    let randomNumber = Math.floor(Math.random() * array.length);
    if(!usedIndexes.includes(randomNumber)){
      shuffledArray.push(array[randomNumber]);
      usedIndexes.push(randomNumber);
      i++;
    }
  }
  console.log(shuffledArray);
  return shuffledArray;
}



function labelButtons(array){
let i = 0
while(i < array.length){

  var moment = omega[i];
  $(list[i]).text(moment);
  $(list[i]).hide();
  console.log(list[i]);
i++
}
}






$(".btn").click(function(){

  var chosenBox = $(this).attr("id");

if (!revealed.includes("." + chosenBox)){

  $("#" + chosenBox).addClass("pressed");
setTimeout(function () {
  $("#" + chosenBox).removeClass("pressed");
}, 100);
  revealed.push("." + chosenBox);


  $("." + chosenBox).show();
  checkClick(chosenBox);
}
});




$(document).keypress(function(event){
  for (i=0; i<16; i++){
    $("#" + numbers[i]).removeClass("green");
    $("#" + numbers[i]).addClass("blue");
  }
  $("#level-title").text("P1");
  revealed = [];
  omega = shuffle(baseArray);
  labelButtons(omega);
});

$("h1").click(function(){
  for (i=0; i<16; i++){
    $("#" + numbers[i]).removeClass("green");
    $("#" + numbers[i]).addClass("blue");
  }
  $("#level-title").text("P1");
  revealed = [];
  omega = shuffle(baseArray);
  labelButtons(omega);
});









function checkClick(value){
  checkSystem.push(list.indexOf("." + value));
  blink.push(value);

  var uno = checkSystem[0];
  var dos = checkSystem[1];




  if (omega[uno] === "F"){
    gameOver();
  }
  if (omega[dos] === "F"){
    gameOver();
  }





  if (checkSystem.length === 2){

    if (omega[uno] === omega[dos]){
      if (!playerTurn){
    $("#" + value).removeClass("blue");
    $("#"+ blink[0]).removeClass("blue");
    $("#" + value).addClass("red");
    $("#"+ blink[0]).addClass("red");
    p2score++
    $("#level-score").text(p1score + "-" + p2score);
  }else{
    $("#" + value).removeClass("blue");
    $("#"+ blink[0]).removeClass("blue");
    $("#" + value).addClass("green");
    $("#"+ blink[0]).addClass("green");
    p1score++
    $("#level-score").text(p1score + "-" + p2score);
  }

    checkSystem = [];
    blink = [];
    win.push("1","1");






    if (win.length === 16){
      if (p1score > p2score){
      $("#level-title").text("P1 wins!");
    }else if (p2score > p1score){
      $("#level-title").text("P2 wins!");
    }else{
      $("#level-title").text("tie!");
    }
    }

  }else{
    setTimeout(function(){
    $("." + value).hide();
    $(list[uno]).hide();

    if (!playerTurn){
    $("#level-title").text("P1");
    playerTurn = true;
  }else{
    $("#level-title").text("P2");
    playerTurn = false;
  }


    revealed.pop(uno);
    revealed.pop(dos);

    $("#" + value).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + blink[0]).fadeIn(100).fadeOut(100).fadeIn(100);
    blink = [];
  },200);

    checkSystem = [];

  }
  }

}




function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);



  $("#level-title").text("game over, click here to restart");

  checkSystem = [];
  blink = [];
  win = [];
  revealed.push(".one",".two",".three",".four",".five",".six",".seven",".eight",".nine");


}
