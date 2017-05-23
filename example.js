var microcomponent = require('.')
var morph = require('nanomorph')
var css = require('yo-css')
var html = require('bel')
var shallowEqual = require('juliangruber-shallow-equal/objects')
var move = require('array-move').mut

function createComponent () {
  var component = microcomponent({
    name: 'example',
    state: {
      first: null,
      last: null
    }
  })
  component.on('render', render)
  component.on('update', update)
  return component

  function render () {
    this.state.first = this.props.first()
    this.state.last = this.props.last()
    return html`
      <article>
        <h1 style=${css({
          fontFamily: 'monospace'
        })}>
          ${this.props.title} (+${this.props.likes}) 
          <button onclick=${this.props.like}>Like</button> 
          <button onclick=${this.props.delete}>x</button>
          <button onclick=${this.props.up} disabled=${this.state.first}>^</button>
          <button onclick=${this.props.down} disabled=${this.state.last}>v</button>
        </h1>
      </article>
    `
  }

  function update (props) {
    return !shallowEqual(props, this.props) ||
      props.first() !== this.state.first ||
      props.last() !== this.state.last
  }
}

var state = {
  posts: []
}

var el = render()
document.body.appendChild(el)

for (var i = 0; i < 10; i++) addPost()

function addPost () {
  var post = {
    title: Math.random().toString(16).slice(2),
    likes: 0,
    component: createComponent(),
    like: function () {
      post.likes++
      update()
    },
    delete: function () {
      state.posts.splice(state.posts.indexOf(post), 1)
      update()
    },
    up: function () {
      var idx = state.posts.indexOf(post)
      move(state.posts, idx, idx - 1)
      update()
    },
    down: function () {
      var idx = state.posts.indexOf(post)
      move(state.posts, idx, idx + 1)
      update()
    },
    first: function () {
      return state.posts.indexOf(post) === 0
    },
    last: function () {
      return state.posts.indexOf(post) === state.posts.length - 1
    }
  }
  state.posts.push(post)
  update()
}

function render () {
  return html`
    <div>
      <button onclick=${addPost}>New Post</button>
      ${state.posts.map(post => post.component.render(Object.assign({}, post)))}
    </div>
  `
}

function update () {
  el = morph(el, render())
}
