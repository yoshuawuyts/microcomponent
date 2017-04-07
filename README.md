# microcomponent [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Smol event based component library. Syntactic sugar around [nanocomponent][nc].
Adds logging through [nanologger](https://github.com/yoshuawuyts/nanologger).

## Usage
```js
var microcomponent = require('microcomponent')
var html = require('bel')

var component = createComponent()
document.body.appendChild(component.render())

function createComponent () {
  var text = null

  var component = microcomponent()
  component.on('render', render)
  component.on('update', update)
  component.on('load', load)
  component.on('unload', unload)
  return component

  function render (newText) {
    text = newText
    return html`<h1>${text}</h1>`
  }

  function update (newText) {
    return newText !== text
  }

  function load () {
    console.log('mounted on DOM')
  }

  function unload () {
    console.log('removed from DOM')
  }
}
```

## API
### `component = Component([name])`
Create a new Microcomponent instance. Takes a name string that's used for
logging data. Logging is logged on log level `'debug'`. You can set the log
level through `localstorage.logLevel = 'debug|info|warn|error|fatal'`.

### `component.on(eventname, handler)`
Register a new handler for an eventname. Can register any custom event,
built-in lifecycle events are:
- `render`
- `update`
- `load`
- `unload`

### `component.emit(eventname, […data])`
Trigger a handler on the component.

### `DOMNode = component.render([…data])`
Render an element.

## See Also
- [yoshuawuyts/nanocomponent][nc]

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/microcomponent.svg?style=flat-square
[3]: https://npmjs.org/package/microcomponent
[4]: https://img.shields.io/travis/yoshuawuyts/microcomponent/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/microcomponent
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/microcomponent/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/microcomponent
[8]: http://img.shields.io/npm/dm/microcomponent.svg?style=flat-square
[9]: https://npmjs.org/package/microcomponent
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[nc]: https://github.com/yoshuawuyts/nanocomponent
