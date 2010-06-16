describe("playing the game", function() {
  var gameBoard, field, startButton, ballSource, ballDestination, results, ballDragger;

  function pressStartButton(){
    startButton.click();
  }

  function dragBallTo(thisContainer){
    var destination, ball, dx, dy;
    destination = thisContainer.offset();
    ball = field.find(".ball");
    ballPosition = ball.offset();

    dx = destination.left - ballPosition.left + 5;
    dy = destination.top - ballPosition.top + 5;

    ball.simulate("drag", {
      dx: dx,
      dy: dy
    });

    thisContainer.append(ball);
    ballDragger.scoreGame();
  }

  beforeEach(function() {
    gameBoard = $("#game").clone();
    field = gameBoard.find("#field");
    ballSource = field.find("#ball-source");
    ballDestination = field.find("#ball-destination");
    results = gameBoard.find("#results");
    startButton = gameBoard.find("#start-button");

    ballDragger = BallDragger.initialize(gameBoard);

    startButton.click(ballDragger.start);
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
