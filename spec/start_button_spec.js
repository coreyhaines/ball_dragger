beforeEach(function() {
  this.addMatchers({
    toBeInside: function(inThis) {
      var actual = $(this.actual),
          actualPosition = actual.offset(),
          actualHeight = actual.height,
          inThisPosition = inThis.offset(),
          inThisHeight = inThis.height;
          inside = false;

      inside = (actualPosition.left >= inThisPosition.left) &&
                  (actualPosition.top >= inThisPosition.top) &&
                  ((actualPosition.top + actualHeight) <= (inThisPosition.top + inThisHeight));

      return inside;
    }
  });
});
describe("pressing start button", function() {
  it("creates a ball in the source", function() {
    var gameBoard = $("#game-template").clone();
    var source = gameBoard.find("#ball-source");

    var ballDragger = BallDragger.initialize(gameBoard); 

    ballDragger.start();

    expect(gameBoard.find("#field .ball")).toBeInside(source);
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

      expect(gameBoard.find("#field .ball").length).toEqual(1);
    });
  });
});

