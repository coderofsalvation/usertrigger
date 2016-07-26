// tag class
var tagstore = function(){
  this.data = {}
  this.set = function(tag){
    this.data[tag]=true
  }
  this.get = function(tag){
    return this.data[tag] ? this.data[tag] : false 
  }
  this.unset = function(tag){
    this.data[tag] = false
  }
}

var user = function(opts){
  this.selector = opts.$ || $
  this.reset()
}

user.prototype.reset = function(){
  this.tags = new tagstore()
  this.listeners = []
}

user.prototype.set = function(label, state ){
  if( state ) this.tags.set(label)
  else this.tags.unset(label)
  this.triggerListeners()
}

user.prototype.triggerListeners = function(){
  this.listeners.map( function(listener){
    if( listener.test() ) listener.cb(this)
  })
}

user.prototype.has = function(label, domselector, events){
  var me = this
  var initDomId = function(domselector){
    var target = $(domselector)
    if( !target ) return
    target.on( events, function(e){
      me.tags.set(label,  $(this).val() ? true : false )
      me.triggerListeners()
    })
  }
  if( events && typeof domselector == "string" ) initDomId(domselector)
  if( events && typeof domselector != "string" )
    domselector.map( function(_domselector){
      initDomId(_domselector)
    })
  if( !domselector ) return this.tags.get(label) === true
}

user.prototype.on = function( listener, cb ){
  var me = this
  if( typeof listener == "string" ){
    var label = listener
    listener = function(){ return me.tags.get(label) === true }
  }
  this.listeners.push({test:listener, cb:cb})
}

user.prototype.once = function(fn, context){ 
  var result;
  return function() { 
    if(fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}

