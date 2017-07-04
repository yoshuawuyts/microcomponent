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
  var component = microcomponent({
    props: {
      text: null
    }
  })
  component.on('render', render)
  component.on('update', update)
  component.on('load', load)
  component.on('unload', unload)
  return component

  function render () {
    return html`<h1>${this.props.text}</h1>`
  }

  function update (props) {
    return props.text !== this.props.text
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
### `component = Component([{ name, props, state, pure }])`
Create a new Microcomponent instance. Takes a name string that's used for
logging data. Logging is logged on log level `'debug'`. You can set the log
level through `localStorage.logLevel = 'debug|info|warn|error|fatal'`. Also
takes objects that will be initialized as `this.state` and `this.props`. For
reference, a `this.oldProps` will always contain the state of the previous
render iteration.

Set `pure = true` to activate the default `on('update')` handler, which will
shallow diff `props` with `this.props`.

### `component.on(eventname, handler)`
Register a new handler for an eventname. Can register any custom event,
built-in lifecycle events are:
- `render`: (required) create a new DOMNode. If there's already been an DOMNode
  rendered it'll be diffed instead. Must always return an DOMNode of the same
  type.
- `update`: (required) determine if `update` should be called
- `load`: called when the element is mounted on the DOM
- `unload`: called when the element is removed from the DOM

### `component.emit(eventname, [props])`
Trigger a handler on the component.

### `DOMNode = component.render([props])`
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
