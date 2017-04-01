# microcomponent [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Smol event based component library. Syntactic sugar around [nanocomponent][nc].

## Usage
```js
var microcomponent = require('microcomponent')
var html = require('bel')

var component = createComponent()
document.body.appendChild(component.render())

function createComponent () {
  var component = microcomponent()
  var text = null

  component.on('render', function (newText) {
    text = newText

    return html`
      <h1>${text}</h1>
    `
  })

  component.on('update', function (newText) {
    return newText !== text
  })

  component.on('load', function (newText) {
    console.log('mounted on DOM')
  })

  component.on('unload', function (newText) {
    console.log('removed from DOM')
  })

  return component
}
```

## API
### component = Component()
Create a new Microcomponent instance.

### component.on(eventname, handler)
Register a new handler for an eventname. Possible events are:
- `render`
- `update`
- `load`
- `unload`

### component.render()
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
