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

  simpExtend = function ( child ){
    each( slice.call(arguments, 0), function ( parent ){
      for (var key in parent) {
        if (hasProp.call(parent, key))
          child[key] = parent[key];
      }
    });
  };

  // Extend the prop of obj
  fullExtend = function(child, parent) {
    for (var key in parent) {
      if (hasProp.call(parent, key))
        child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }
     ctor.prototype = parent.prototype;
     child.prototype = Object.create(ctor);
     child.__super__ = parent.prototype;
     return child;
  };

  // Internal Utility Function
  var each = function ( obj, callback, context ){
    if ( obj instanceof Array  ){
      for ( var i = 0; i < obj.length; ++i ){
        callback.call(context, obj[i], i, obj);
      }
    } else if ( typeof obj === "object"){
      for ( var prop in obj ){
        if ( ObjProto.hasOwnProperty.call(obj, prop) ) {
          callback.call(context, obj[prop], prop, obj);
        }
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

    /*
     * Off deletes listeners or events. It can be passed multiple arguments.
     */

    off: function (){
      var obj,
          context,
          args = slice.call(arguments, 0);
      if ( typeof args[( args.length - 1 )] === 'object' ){
        context = args[( args.length - 1 )];
      }
      obj = context || this;
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

    /*
     * Once is passed an event name , callback, and context is optional
     * It removes the listener after the callback has been triggered
     */
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

  /*
   * Model
   */

  var Model = Crutch.Model = function ( attributes ){
    var defaults;
  };

  // Model inherits from Events
  simpExtend(Model.prototype, Events, {
    initialize: function (){},

    extends: fullExtend,

    toJSON: function (){
      var attrClone = slice( this.attributes, 0 );
      return attrClone;
    }
  });
})();
