describe("Model", function (){
  describe("It inherits from Events", function (){
    it("has event methods", function (){
      var model = new Crutch.Model();
      expect(model.on).toEqual(Crutch.Events.on);
      expect(model.off).toEqual(Crutch.Events.off);
      expect(model.once).toEqual(Crutch.Events.once);
      expect(model.listenTo).toEqual(Crutch.Events.listenTo);
      expect(model.listenOnce).toEqual(Crutch.Events.listenOnce);
    });
  });
});
