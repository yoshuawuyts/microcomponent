var microcomponent = require('.')
var html = require('bel')

var component = microcomponent({
  name: 'example'
})
component.on('render', render)
component.on('update', update)

function render () {
  return html`
    <article>
      <h1>${this.props.title}</h1>
      <h2>${this.props.likes} likes</h2>
      <p>${this.props.body}</p>
      <button onclick=${this.props.like}>Like</button>
    </article>
  `
}

function update () {
  return true
}

document.body.appendChild(component.render({
  title: 'Title',
  body: 'body',
  like: function () {
    var likes = component.props.likes + 1
    component.render(Object.assign({}, component.props, { likes: likes }))
    console.log('likes', likes)
  },
  likes: 0
}))
