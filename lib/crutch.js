(function (){

  var root = this;

  var Crutch = root.Crutch = {};
  // For convenience and less typing
  var
      ArrayProto = Array.prototype,
      ObjProto = Object.prototype;

 // Some Methods
  var
      concat = ArrayProto.concat,
      slice = ArrayProto.slice,
      push = ArrayProto.push,
      toString = ObjProto.toString,
      hasProp = ObjProto.hasOwnProperty;

  // Extending used to extend an object
  extend = function(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key))
        child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }
     ctor.prototype = parent.prototype;
     child.prototype = Object.new(ctor);
     child.__super__ = parent.prototype;
     return child;
  };

  var Events = Crutch.Events = {
    on: function ( event, callback, context ){
      var listeners;
      listeners = this.hasOwnProperty("_listeners") && this._listeners || ( this._listeners = {});
      listeners[event] = { callback: callback };
      return this;
    },
    trigger: function ( event ){
      if ( !this._listeners[event] ) return false;
      args = slice.call(arguments, 1);
      callback = this._listeners[event].callback;
      callback.apply(this, args);
    },

    off: function ( event ){
      delete this._listeners[event];
    }
  };
})();
