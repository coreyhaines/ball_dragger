describe("Checking to see if user wins", function() {
  describe("Ball is not in the destination", function() {
    it("sets the result to 'You Lose!'", function() {
      var gameBoard = $("#game-template").clone();
      var ballDragger = BallDragger.initialize(gameBoard); 

      ballDragger.start();

      var ball = gameBoard.find(".ball");
      gameBoard.find("#ball-source").append(ball);

      ballDragger.scoreGame();

      expect(gameBoard.find("#results").text()).toEqual("You Lose!");
    });
  });
});
