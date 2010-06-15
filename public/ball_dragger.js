var BallDragger = {};

BallDragger.initialize = function(gameBoard) {
  var ball = $("<div class='ball'></div>");
  return {
    start: function() { gameBoard.find("#ball-source").append(ball); }
  };
};
