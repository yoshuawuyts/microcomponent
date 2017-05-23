var Nanocomponent = require('nanocomponent')
var nanologger = require('nanologger')
var nanomorph = require('nanomorph')
var assert = require('assert')
var shallowEqual = require('juliangruber-shallow-equal/objects')

var rootLabelRegex = /^data-onloadid/

module.exports = Microcomponent

function Microcomponent (opts) {
  if (!(this instanceof Microcomponent)) return new Microcomponent(opts)
  Nanocomponent.call(this)

  opts = opts || {}
  this.name = opts.name || 'component'
  this.props = opts.props || {}
  this.state = opts.state || {}

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
    this._render = function () {
      return handler.call(this)
    }
    var render = this.render
    this.render = function (props) {
      this._log.debug(eventname, props)
      var oldElement = this._element
      render.call(this, props)
      var newElement = this._element

      if (oldElement) {
        var oldAttrs = oldElement.attributes
        var attr, name
        for (var i = 0, len = oldAttrs.length; i < len; i++) {
          attr = oldAttrs[i]
          name = attr.name
          if (rootLabelRegex.test(name)) {
            newElement.setAttribute(name, attr.value)
            break
          }
        }
        nanomorph(oldElement, newElement)
        this._element = oldElement
      }

      return this._element
    }
  } else {
    this['_' + eventname] = function () {
      var len = arguments.length
      var args = new Array(len)
      for (var i = 0; i < len; i++) args[i] = arguments[i]
      args.length
        ? this._log.debug(eventname, args)
        : this._log.debug(eventname)
      var res = handler.apply(this, args)
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
