describe("pressing start button", function() {
  it("creates a ball in the source", function() {
    var gameBoard = $("#game-template").clone();
    var source = gameBoard.find("#ball-source");

    var ballDragger = BallDragger.initialize(gameBoard); 

    ballDragger.start();

    expect(source.find(".ball").length).toEqual(1);
  });
});
