var Nanocomponent = require('nanocomponent')
var nanologger = require('nanologger')
var assert = require('assert')

module.exports = Microcomponent

function Microcomponent (name) {
  if (!(this instanceof Microcomponent)) return new Microcomponent(name)
  Nanocomponent.call(this)
  this._name = name || 'component'
  this._log = nanologger(this._name)
  this._log.debug('initialized')
}
Microcomponent.prototype = Object.create(Nanocomponent.prototype)

Microcomponent.prototype.on = function (eventname, handler) {
  assert.equal(typeof eventname, 'string', 'microcomponent.on eventname should be type string')
  assert.equal(typeof handler, 'function', 'microcomponent.on handler should be type function')
  this['_' + eventname] = function () {
    var len = arguments.length
    var args = new Array(len)
    for (var i = 0; i < len; i++) args[i] = arguments[i]
    args.length
      ? this._log.debug(eventname, args)
      : this._log.debug(eventname)
    return handler.apply(this, args)
  }
}

Microcomponent.prototype.emit = function (eventname) {
  assert.equal(typeof eventname, 'string', 'microcomponent.emit eventname should be type string')
  var len = arguments.length - 1
  var args = new Array(len)
  for (var i = 0; i < len; i++) args[i] = arguments[i + 1]
  this['_' + eventname].apply(this, args)
}
