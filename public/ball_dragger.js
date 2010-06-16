var BallDragger = {};

BallDragger.initialize = function(gameBoard) {
  var ballSource, ball, resultsDisplay;
  resultsDisplay = gameBoard.find("#results");

  function scoreGame(){
    resultsDisplay.text("You Lose!"); 
  }

  ball = $("<div class='ball'></div>");
  ball.draggable({
    containment: "#field",
    stop: scoreGame
  });

  ballSource = gameBoard.find("#ball-source");
  function setBallInSource(){
    ballSource.append(ball); 
  }


  return {
    start: setBallInSource,
    scoreGame: scoreGame
  };
};
