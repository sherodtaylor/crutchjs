describe("Events", function (){
  beforeEach(function (){
    object = {count: 0};
    _.extend(object, Crutch.Events);
  });
  describe("On Event", function (){
    it("be able attach events", function (){
      object.on('count', counter);
      function counter(){
        this.count++;
      }
      expect(object._listeners).toEqual({ count: { callback: counter, once: false } });
    });
  });

  describe("Trigger Event", function (){
    it("triggers an event", function (){
      object.on('count', counter);
      function counter(){
        this.count++;
      }
      expect(object.count).toEqual(0);
      object.trigger('count');
      expect(object.count).toEqual(1);
      object.trigger('count');
      expect(object.count).toEqual(2);
      object.trigger('count');
      expect(object.count).toEqual(3);
    });
    it("triggers an event passing multiple variables", function (){
      object.on('count', counter);
      function counter( start, iterations ){
       this.count = this.count || start;
        for ( var i = 0; i < iterations; ++i){
          this.count++;
        }
      }
      object.trigger('count', 1, 4);
      expect(object.count).toEqual(5);
    });
  });

  describe("Off", function (){
    it("removes listener from object", function(){
      object.on('count', counter);
      function counter(){
        this.count++;
      }
      object.trigger('count');
      expect(object.count).toEqual(1);

      object.off('count', object);
      object.trigger('count'); // shouldn't trigger the event
      expect(object.count).toEqual(1);
    });
    it('removes all listeners if the first argument is all', function (){
      object.on('countUp', counterUp);
      object.on('countDown', counterDown);
      function counterUp(){
        this.count++;
      }
      function counterDown(){
        this.count--;
      }
      object.off("all");
      expect(object._listeners).toEqual({});
    });
    it("removes multiple listeners from object", function(){
      object.on('countUp', counterUp);
      object.on('countDown', counterDown);
      function counterUp(){
        this.count++;
      }
      function counterDown(){
        this.count--;
      }
      object.trigger('countUp');
      object.trigger('countUp');
      expect(object.count).toEqual(2);
      object.trigger('countDown');
      expect(object.count).toEqual(1);
      object.trigger('countDown');
      expect(object.count).toEqual(0);

      object.off('countUp', 'countDown');
      object.trigger('count'); // shouldn't trigger the event
      expect(object.count).toEqual(0);
    });
    it("should remove the property from the associative  array", function(){
      object.on('count', counter);
      function counter(){
        this.count++;
      }
      object.off('count');
      expect(object._listeners.hasOwnProperty("count")).toBe(false);
    });
  });

  describe("Once Method", function (){
    it("removes listener from object after it has been triggered", function(){
      object.once('count', counter);
      function counter(){
        this.count++;
      }
      object.trigger('count');
      expect(object.count).toEqual(1);

      object.trigger('count');
      object.trigger('count');
      object.trigger('count');

      expect(object.count).toEqual(1);
    });
    it("should remove the property from the passociative  array after its been triggered once", function(){
      object.once('count', counter);
      function counter(){
        this.count++;
      }

      object.trigger("count");
      expect(object._listeners.hasOwnProperty("count")).toBe(false);
    });
  });

  describe("ListenTo Event", function (){
    it("be able attach events to other objects", function (){
      var obj2 = { name: 'obj2' };
      _.extend(obj2, Crutch.Events);
      object.listenTo( obj2, 'count', function (){
        object.count++;
      });
      obj2.trigger('count');
      expect(object.count).toEqual(1);
      expect(obj2.hasOwnProperty("_listeners")).toBe(true);
    });
  });

  describe("listenOnce Event", function (){
    it("attaches an event to another object", function (){
      var obj2 = { name: 'obj2' };
      _.extend(obj2, Crutch.Events);
      object.listenOnce( obj2, 'count', function (){
        object.count++;
      });
      obj2.trigger('count');
      expect(object.count).toEqual(1);
      // It shouldn't trigger
      obj2.trigger('count');
      expect(object.count).toEqual(1);
    });
  });
});
