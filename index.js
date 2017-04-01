var Nanocomponent = require('nanocomponent')

module.exports = Microcomponent

function Microcomponent (render) {
  if (!(this instanceof Microcomponent)) return new Microcomponent(render)
  Nanocomponent.call(this)
}
Microcomponent.prototype = Object.create(Nanocomponent.prototype)

Microcomponent.prototype.on = function (eventname, handler) {
  if (eventname === 'load') {
    this._onload = handler
  } else if (eventname === 'unload') {
    this._onunload = handler
  } else if (eventname === 'update') {
    this._update = handler
  } else if (eventname === 'render') {
    this._render = handler
  }
}
