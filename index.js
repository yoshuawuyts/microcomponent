var Nanocomponent = require('nanocomponent')
var nanologger = require('nanologger')
var nanomorph = require('nanomorph')
var assert = require('assert')

var Nanotiming = require('./lib/timing')

module.exports = Microcomponent

function Microcomponent (name, state) {
  if (!(this instanceof Microcomponent)) return new Microcomponent(name)
  Nanocomponent.call(this)

  this._name = name || 'component'
  this._state = state || {}

  this._timing = new Nanotiming(this._name)
  this._log = nanologger(this._name)
  this._log.debug('initialized')
}
Microcomponent.prototype = Object.create(Nanocomponent.prototype)

Microcomponent.prototype.on = function (eventname, handler) {
  assert.equal(typeof eventname, 'string', 'microcomponent.on eventname should be type string')
  assert.equal(typeof handler, 'function', 'microcomponent.on handler should be type function')

  if (eventname === 'render') {
    this._render = function () {
      this._timing.start(eventname)
      var len = arguments.length
      var args = new Array(len)
      for (var i = 0; i < len; i++) args[i] = arguments[i]
      args.length
        ? this._log.debug(eventname, args)
        : this._log.debug(eventname)

      if (this._element) {
        nanomorph(this._element, handler.apply(this, args))
        this._timing.end(eventname)
      } else {
        var el = handler.apply(this, args)
        this._timing.end(eventname)
        return el
      }
    }
  } else {
    this['_' + eventname] = function () {
      this._timing.start(eventname)
      var len = arguments.length
      var args = new Array(len)
      for (var i = 0; i < len; i++) args[i] = arguments[i]
      args.length
        ? this._log.debug(eventname, args)
        : this._log.debug(eventname)
      var res = handler.apply(this, args)
      this._timing.end(eventname)
      return res
    }
  }
}

Microcomponent.prototype.emit = function (eventname) {
  assert.equal(typeof eventname, 'string', 'microcomponent.emit eventname should be type string')
  var len = arguments.length - 1
  var args = new Array(len)
  for (var i = 0; i < len; i++) args[i] = arguments[i + 1]
  this['_' + eventname].apply(this, args)
}
