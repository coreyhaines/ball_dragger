function pressStartButton(){
}
describe("playing the game", function() {
  describe("pressing the start button", function() {
    it("creates a ball in the source", function() {
      pressStartButton();

      var ball = ballSource.find(".ball");
      expect(ball.length).toEqual(1);
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
