var BallDragger = {};

BallDragger.initialize = function(gameBoard) {
  var ballSource, ball, resultsDisplay;
  resultsDisplay = gameBoard.find("#results");

  function scoreGame(){
    var ballDestination = gameBoard.find("#ball-destination");
    var ballPosition = ball.offset();
    var destinationPosition = ballDestination.offset();
    var ballHeight, ballWidth, destinationHeight, destinationWidth;

    ballHeight = ball.height();
    ballWidth = ball.width();

    destinationHeight = ballDestination.height();
    destinationWidth =  ballDestination.width();

    // console.log(ballPosition);
    // console.log(destinationPosition);

    var inside = (ballPosition.left >= destinationPosition.left) &&
                  (ballPosition.top >= destinationPosition.top) &&
                  ((ballPosition.top + ballHeight) <= (destinationPosition.top + destinationHeight));

    inside ? resultsDisplay.text("You Win!") : resultsDisplay.text("You Lose!"); 
  }

  function createBall() {
    ball = $("<div class='ball'></div>");
    ball.draggable({
      containment: "#field",
      stop: scoreGame
    });
    return ball;
  }

  ballSource = gameBoard.find("#ball-source");
  function setBallInSource(){
    if(!ball) {
      ball = createBall();
      gameBoard.find("#field").append(ball);
    }

    ball.css("left", ballSource.offset().left + 10);
    ball.css("top", ballSource.offset().top + 10);

  }


  return {
    start: setBallInSource,
    scoreGame: scoreGame
  };
};
