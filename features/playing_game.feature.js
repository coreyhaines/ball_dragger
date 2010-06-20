describe("playing the game", function() {
  var cachedGameBoard, gameBoard, field, startButton, ballSource, ballDestination, results, ballDragger;

  function pressStartButton(){
    startButton.click();
  }

  function dragBallTo(thisContainer){
    var destination, ball, dx, dy;
    destination = thisContainer.offset();
    ball = field.find(".ball");
    ballPosition = ball.offset();

    dx = destination.left - ballPosition.left;
    dy = destination.top - ballPosition.top;

    ball.simulate("drag", {
      dx: dx,
      dy: dy
    });

  }

  beforeEach(function() {
    cachedGameBoard = $("#game");
    gameBoard = cachedGameBoard.clone();

    cachedGameBoard.replaceWith(gameBoard);
    field = gameBoard.find("#field");
    ballSource = field.find("#ball-source");
    ballDestination = field.find("#ball-destination");
    results = gameBoard.find("#results");
    startButton = gameBoard.find("#start-button");

    ballDragger = BallDragger.initialize(gameBoard);

    startButton.click(ballDragger.start);
  });

  afterEach(function() {
    gameBoard.replaceWith(cachedGameBoard);
  });

  describe("pressing the start button", function() {
    it("creates a ball in the source", function() {
      pressStartButton();

      var ball = ballSource.find(".ball");
      expect(ball.length).toEqual(1);
    });

    describe("pressing twice", function() {
      it("resets the ball to the source", function() {
        pressStartButton();

        dragBallTo(ballDestination);

        pressStartButton();

        var ball = ballSource.find(".ball");
        expect(ball.length).toEqual(1);
      });
    });
  });
  
  describe("dragging the ball", function() {
    describe("not ending up in the destination", function() {
      it("says 'You Lose!'", function() {
        pressStartButton();

        dragBallTo(ballSource);

        expect(results.text()).toContain("You Lose!");
      });
    });

    describe("ending up in the destination", function() {
      it("says 'You Win'", function() {
        pressStartButton();

        dragBallTo(ballDestination);

        expect(results.text()).toContain("You Win!");
      });
    });
  });
});
