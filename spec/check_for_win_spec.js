beforeEach(function() {
  this.addMatchers({
    toBeInside: function(inThis) {
      var actual = $(this.actual),
          actualPosition = actual.position(),
          actualHeight = actual.height,
          inThisPosition = inThis.position(),
          inThisHeight = inThis.height;
          inside = false;

        console.log("ball");
        console.log(actualPosition);
        console.log("container");
        console.log(inThisPosition);


      inside = (actualPosition.left >= inThisPosition.left) &&
                  (actualPosition.top >= inThisPosition.top) &&
                  ((actualPosition.top + actualHeight) <= (inThisPosition.top + inThisHeight));

      return inside;
    }
  });
});
describe("Checking to see if user wins", function() {
  var cachedGameBoard, gameBoard, field, 
      source, destination, ballDragger;

  beforeEach(function() {
    cachedGameBoard = $("#game-template");
    gameBoard = cachedGameBoard.clone();
    cachedGameBoard.remove();
    $("body").prepend(gameBoard);

    field = gameBoard.find("#field");
    source = field.find("#ball-source");
    destination = field.find("#ball-destination");

    ballDragger = BallDragger.initialize(gameBoard); 
  });

  afterEach(function() {
    gameBoard.remove();
    $("body").prepend(cachedGameBoard);
  });

  describe("Ball is not in the destination", function() {
    var ball;
    beforeEach(function(){

      ballDragger.start();

      ball = gameBoard.find(".ball");
    });
    it("sets the result to 'You Lose!'", function() {
      ball.css("left", source.offset().left);
      ball.css("top", source.offset().top);

      ballDragger.scoreGame();

      expect(gameBoard.find("#results").text()).toEqual("You Lose!");
    });

    describe("on the sides of the destination", function(){
      var destinationPosition;
      beforeEach(function() {
        destinationPosition = destination.offset();
      });

      function putBallAt(left, top){
        ball.css("left", left);
        ball.css("top", top);
      }
      it("fails for above", function() {
        putBallAt(destinationPosition.left, destinationPosition.top - ball.height+10);

        ballDragger.scoreGame();

        expect(gameBoard.find("#results").text()).toEqual("You Lose!");
      });

      it("fails for below", function() {
        putBallAt(destinationPosition.left, destinationPosition.top + destination.height() + 100);

        ballDragger.scoreGame();

        expect(gameBoard.find("#results").text()).toEqual("You Lose!");
      });

      it("fails for left", function() {
        putBallAt(destinationPosition.left - ball.width - 10, destinationPosition.top);

        ballDragger.scoreGame();

        expect(gameBoard.find("#results").text()).toEqual("You Lose!");
      });

      it("fails for right", function() {
        // console.log(destinationPosition.left + destination.width()+ 10);
        putBallAt(destinationPosition.left + destination.width()+ 10, destinationPosition.top);

        ballDragger.scoreGame();

        expect(gameBoard.find("#results").text()).toEqual("You Lose!");
      });
    });
  });

  describe("Ball is in the destination", function() {
    it("sets the result to 'You Win!'", function() {
      var ball;
      ballDragger.start();

      ball = field.find(".ball");
      
      ball.css("left", destination.offset().left + 1);
      ball.css("top", destination.offset().top + 1);
      // console.log("destination offset:")
      // console.log("top:")
      // console.log(destination.offset().top)
      // console.log("left:")
      // console.log(destination.offset().left)


      expect(ball).toBeInside(field.find("#ball-destination"));


      ballDragger.scoreGame();

      // expect(gameBoard.find("#results").text()).toEqual("You Win!");
    });
  });
});
