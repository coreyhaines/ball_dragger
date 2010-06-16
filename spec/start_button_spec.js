describe("pressing start button", function() {
  it("creates a ball in the source", function() {
    var gameBoard = $("#game-template").clone();
    var source = gameBoard.find("#ball-source");

    var ballDragger = BallDragger.initialize(gameBoard); 

    ballDragger.start();

    expect(source.find(".ball").length).toEqual(1);
  });

  describe("ball has moved", function() {
    it("resets ball into source", function() {
      var gameBoard = $("#game-template").clone();
      var source = gameBoard.find("#ball-source");

      var ballDragger = BallDragger.initialize(gameBoard); 

      ballDragger.start();

      var ball = source.find(".ball");
      ball.remove();

      ballDragger.start();

      expect(gameBoard.find(".ball").length).toEqual(1);
    });
  });
});

