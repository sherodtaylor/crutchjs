(function (){

  var root = this;

  var Crutch = root.Crutch = {};
  // For convenience and less typing
  var
      ArrayProto = Array.prototype,
      ObjProto = Object.prototype;

 // Some Internal Methods
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

  var each = function ( obj, callback, context ){
    if ( ObjProto.toString(obj) === "[object Array]" ){
      for ( var i = 0; i < obj.length; ++i ){
        callback.call(context, obj[i], i, obj);
      }
    } else if ( typeof obj === "object"){
      for ( var prop in obj ){
        callback.call(context, obj[prop], prop, obj);
      }
    }
  };

  var Events = Crutch.Events = {
    on: function ( event, callback, context ){
      var listeners;
      var ctx =  context || this;
      listeners = ctx.hasOwnProperty("_listeners") && ctx._listeners || ( ctx._listeners = {});
      listeners[event] = { callback: callback, once: false };
      return this;
    },
    trigger: function ( event ){
      if ( !this._listeners[event] ) return false;
      args = slice.call(arguments, 1);
      callback = this._listeners[event].callback;
      callback.apply(this, args);
      if ( this._listeners[event].once ){
        this.off( event );
      }
    },
    off: function (){
      var obj,
          context,
          args = slice.call(arguments, 0);
      if ( typeof args[( args.length - 1 )] !== 'string' ){
        context = args[( args.length - 1 )];

      }
      obj = context || this;
      debugger;
      if ( !obj._listeners ) return false;
      if ( args[0] === 'all' ){
        each(obj._listeners, function  ( val, key){
          delete obj._listeners[key];
        });
      } else {
        each(args, function ( val ){
          if ( typeof val === "object" ) return false;
          delete obj._listeners[val];
        });
      }
    },
    once: function ( event, callback, context ){
      var listeners;
      var ctx =  context || this;
      listeners = ctx.hasOwnProperty("_listeners") && ctx._listeners || ( ctx._listeners = {});
      listeners[event] = { callback: callback, once: true };
    },
    listenTo: function ( obj, event, callback ){
      Events.on(event, callback, obj);
    },
    listenOnce: function ( obj, event, callback ){
      Events.once(event, callback, obj);
    }
  };
})();
