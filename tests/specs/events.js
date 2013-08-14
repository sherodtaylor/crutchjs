describe("Events", function (){
  describe("On Event", function (){
    it("be able attach events", function (){
      object = {count: 0};
      _.extend(object, Crutch.Events);
      object.on('count', counter);
      function counter(){
        this.count++;
      };
      expect(object._listeners).toEqual({ count: { callback: counter} });
    });
  });
  describe("Trigger Event", function (){
    it("triggers an event", function (){
      object = {count: 0};
      _.extend(object, Crutch.Events);
      object.on('count', counter);
      function counter(){
        this.count++;
      };
      expect(object.count).toEqual(0);
      object.trigger('count');
      expect(object.count).toEqual(1);
      object.trigger('count');
      expect(object.count).toEqual(2);
      object.trigger('count');
      expect(object.count).toEqual(3);
    });
    it("triggers an event passing multiple variables", function (){
      object = {count: 0};
      _.extend(object, Crutch.Events);
      object.on('count', counter);
      function counter( start, iterations ){
       this.count = this.count || start;
        for ( var i = 0; i > iterations; ++i){
          this.count++;
        }
      };
      object.trigger('count', 1, 4);
      expect(object.count).toEqual(5);
    });
  });
});
