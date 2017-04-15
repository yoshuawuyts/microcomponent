var Nanocomponent = require('nanocomponent')
var nanologger = require('nanologger')
var nanomorph = require('nanomorph')
var assert = require('assert')
var shallowEqual = require('shallow-equal/objects')

var nanotiming = require('nanotiming')

module.exports = Microcomponent

function Microcomponent (opts) {
  if (!(this instanceof Microcomponent)) return new Microcomponent(opts)
  Nanocomponent.call(this)

  opts = opts || {}
  this.name = opts.name || 'component'
  this.oldProps = {}
  this.props = opts.props || {}
  this.state = opts.state || {}

  this._timing = nanotiming(this.name)
  this._log = nanologger(this.name)
  this._log.debug('initialized')

  if (opts.pure) {
    this._update = function (props) {
      return !shallowEqual(props, this.props)
    }
  }
}
Microcomponent.prototype = Object.create(Nanocomponent.prototype)

Microcomponent.prototype.on = function (eventname, handler) {
  assert.equal(typeof eventname, 'string', 'microcomponent.on eventname should be type string')
  assert.equal(typeof handler, 'function', 'microcomponent.on handler should be type function')

  if (eventname === 'render') {
    this._render = function (props) {
      this._timing.start(eventname)
      this._log.debug(eventname, props)
      this.oldProps = this.props
      this.props = props

      if (this._element) {
        nanomorph(this._element, handler.call(this))
        this._timing.end(eventname)
      } else {
        var el = handler.call(this)
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

  return this
}

Microcomponent.prototype.emit = function (eventname) {
  assert.equal(typeof eventname, 'string', 'microcomponent.emit eventname should be type string')
  var len = arguments.length - 1
  var args = new Array(len)
  for (var i = 0; i < len; i++) args[i] = arguments[i + 1]
  return this['_' + eventname].apply(this, args)
}
