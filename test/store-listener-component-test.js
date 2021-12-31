import jsdom from 'jsdom'
const { JSDOM } = jsdom;
import Alt from 'alt'
import React from 'react'
import AltContainer from 'alt-container'
import withAltContext from '../src/withAltContext'
import { assert } from 'chai'
import sinon from 'sinon'
import TestUtils from 'react-dom/test-utils'
import ReactDom from 'react-dom'

const alt = new Alt()

const action = alt.generateActions('sup')

const TestStore = alt.createStore({
  displayName: 'TestStore',

  bindListeners: {
    handleSup: action.sup
  },

  state: { x: null },

  handleSup(x) {
    this.setState({ x })
  }
})

const Store2 = alt.createStore({
  displayName: 'Store2',

  bindListeners: {
    onSup: action.sup
  },

  state: { y: null },

  onSup(y) {
    this.setState({ y })
  }
})

function getDOMComponentProps(component) {
  const k = Object.keys(component).find((key) => key.startsWith('__reactProps'))
  return component[k]
}

class Flux extends Alt {
  constructor() {
    super()

    this.addActions('testActions', function () {
      this.generateActions('test')
    })

    this.addStore('testStore', {
      bindListeners: {
        test: this.getActions('testActions').test
      },

      state: { x: null },

      test(x) {
        this.setState({ x })
      }
    })
  }
}

export default {
  'AltContainer': {
    beforeEach() {
      const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window
      global.document = document
      global.window = global.document.defaultView

      alt.recycle()
    },

    afterEach() {
      delete global.document
      delete global.window
    },

    'element mounts and unmounts'() {
      const div = document.createElement('div')
      ReactDom.render(
        <AltContainer>
          <div />
        </AltContainer>
      , div)

      ReactDom.unmountComponentAtNode(div)
    },

    'many elements mount'() {
      TestUtils.renderIntoDocument(
        <AltContainer>
          <div />
          <div />
          <div />
          <div />
        </AltContainer>
      )
    },

    'element has correct state'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer stores={{ teststore:TestStore }}>
          <div />
        </AltContainer>
      )

      action.sup('hello')

      assert(node.state.teststore.x === 'hello')

      action.sup('bye')

      assert(node.state.teststore.x === 'bye')
    },

    'works with context'() {
      const flux = new Flux()

      @withAltContext(flux)
      class ContextComponent extends React.Component {
        render() {
          return <AltContainer />
        }
      }

      const tree = TestUtils.renderIntoDocument(<ContextComponent />)

      const contextComponent = TestUtils.findRenderedComponentWithType(
        tree,
        AltContainer
      )

      assert.instanceOf(contextComponent.context.flux, Flux)
    },

    'children get flux as props with context'() {
      const flux = new Flux()

      class TestComponent extends React.Component {
        render() {
          return (
            <AltContainer>
              <div>
                <div>
                  <AltContainer>
                    <span />
                  </AltContainer>
                </div>
              </div>
            </AltContainer>
          )
        }
      }

      const WrappedComponent = withAltContext(flux)(TestComponent)

      const node = TestUtils.renderIntoDocument(<WrappedComponent />)
      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert.instanceOf(getDOMComponentProps(span).flux, Flux)
    },

    'works with instances and props'() {
      const flux = new Flux()

      const node = TestUtils.renderIntoDocument(
        <AltContainer flux={flux}>
          <div />
        </AltContainer>
      )

      assert.instanceOf(node.props.flux, Flux, 'component gets flux prop')
    },

    'children have the flux prop'() {
      const flux = new Flux()

      const node = TestUtils.renderIntoDocument(
        <AltContainer flux={flux}>
          <span />
        </AltContainer>
      )

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert.instanceOf(getDOMComponentProps(span).flux, Flux)
    },

    'flux prop works with the transform function'() {
      const flux = new Flux()

      class TestComponent extends React.Component {
        render() {
          return (
            <AltContainer transform={({ flux }) => { return { flx: flux } }}>
              <div>
                <div>
                  <AltContainer>
                    <span />
                  </AltContainer>
                </div>
              </div>
            </AltContainer>
          )
        }
      }

      const WrappedComponent = withAltContext(flux)(TestComponent);

      const node = TestUtils.renderIntoDocument(<WrappedComponent />)
      const div  = TestUtils.scryRenderedDOMComponentsWithTag(node, 'div')[0]
      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert(getDOMComponentProps(div).flx === flux)
      assert.isUndefined(getDOMComponentProps(span).flx)
      assert(getDOMComponentProps(span).flux === flux)
    },

    'children get the state via props'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer stores={{ teststore:TestStore }}>
          <span />
        </AltContainer>
      )

      action.sup('foobar')

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert(getDOMComponentProps(span).teststore.x === 'foobar')
    },

    'many children get state via props'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer stores={{ teststore:TestStore }}>
          <span />
          <strong />
          <em />
        </AltContainer>
      )

      action.sup('foobar')

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')
      const strong = TestUtils.findRenderedDOMComponentWithTag(node, 'strong')
      const em = TestUtils.findRenderedDOMComponentWithTag(node, 'em')

      assert(getDOMComponentProps(span).teststore.x === 'foobar')
      assert(getDOMComponentProps(strong).teststore.x === 'foobar')
      assert(getDOMComponentProps(em).teststore.x === 'foobar')
    },

    'passing in other props'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer className="no" stores={{ teststore:TestStore }}>
          <div className="hello" />
        </AltContainer>
      )

      const div = TestUtils.findRenderedDOMComponentWithTag(node, 'div')

      assert(getDOMComponentProps(div).className === 'hello')
      assert.isUndefined(getDOMComponentProps(div).stores)
    },

    'does not wrap if it does not have to'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer>
          <span />
        </AltContainer>
      )

      assert(node.props.children.type === 'span', 'single node does not wrap')

      const many = TestUtils.renderIntoDocument(
        <AltContainer>
          <span />
          <span />
        </AltContainer>
      )

      assert.ok(Array.isArray(many.props.children), 'multiple nodes are wrapped')
    },

    'passing in a single store'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer store={TestStore}>
          <span />
        </AltContainer>
      )
      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      action.sup('just testing')

      assert(getDOMComponentProps(span).x === 'just testing')
    },

    'pass in single function'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer store={() => {
          return {
            store: TestStore,
            value: { x: 'jesting' }
          }
        }}>
          <span />
        </AltContainer>
      )
      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert(getDOMComponentProps(span).x === 'jesting')
    },

    'function is called with props'() {
      const storeFunction = sinon.stub()
      storeFunction.returns({
        store: TestStore,
        value: {}
      })

      TestUtils.renderIntoDocument(
        <AltContainer className="foo" store={storeFunction}>
          <span />
        </AltContainer>
      )

      assert.ok(storeFunction.calledTwice, 'called twice, once for store listening and another for props')
      assert(storeFunction.args[0].length === 1, 'called with one parameter')
      assert(storeFunction.args[1].length === 1, 'called with one parameter')
      assert.isObject(storeFunction.args[0][0], 'called with the props')
      assert.isObject(storeFunction.args[1][0], 'called with the props')
      assert(storeFunction.args[0][0].className === 'foo', 'props match')
      assert(storeFunction.args[1][0].className === 'foo', 'props match')
    },

    'pass in key-value of functions'() {
      const Functions = {
        x() {
          return {
            store: TestStore,
            value: { a: 'hello' }
          }
        },
        y() {
          return {
            store: TestStore,
            value: { b: 'goodbye' }
          }
        }
      }

      const node = TestUtils.renderIntoDocument(
        <AltContainer stores={Functions}>
          <span />
        </AltContainer>
      )
      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert(getDOMComponentProps(span).x.a === 'hello')
      assert(getDOMComponentProps(span).y.b === 'goodbye')
    },

    'nested components pass down flux'() {
      const flux = new Flux()
      const node = TestUtils.renderIntoDocument(
        <AltContainer flux={flux}>
          <AltContainer>
            <span />
          </AltContainer>
        </AltContainer>
      )
      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert.instanceOf(getDOMComponentProps(span).flux, Flux)
    },

    'custom rendering'() {
      const render = sinon.stub()
      render.onCall(0).returns(null)
      TestUtils.renderIntoDocument(
        <AltContainer render={render} />
      )

      assert.ok(render.calledOnce, 'render was called')

      const node = TestUtils.renderIntoDocument(
        <AltContainer
          stores={{teststore:TestStore}}
          render={(props) => {
            assert.isDefined(props.teststore, 'test store exists in props')
            return <span className="testing testing" />
          }}
        />
      )
      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert(getDOMComponentProps(span).className === 'testing testing')
    },

    'define both stores and store'() {
      assert.throws(() => {
        TestUtils.renderIntoDocument(
          <AltContainer stores={{}} store={TestStore} />
        )
      })
    },

    'changing an already mounted components props'() {
      let cb = null

      class El extends React.Component {
        constructor(props) {
          super(props)
          this.state = { store: TestStore }
        }

        componentDidMount() {
          cb = state => this.setState(state)
        }

        render() {
          return (
            <AltContainer ref="test" store={this.state.store}>
              <span />
            </AltContainer>
          )
        }
      }

      const node = TestUtils.renderIntoDocument(<El />)

      assert(node.refs.test.props.store === TestStore, 'node gets first state')

      cb({ store: Store2 })

      assert(node.refs.test.props.store === Store2, 'node changes props properly')
    },

    'inject actions'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer actions={{ myactions: action }}>
          <span />
        </AltContainer>
      )

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert.isObject(getDOMComponentProps(span).myactions, 'myactions exist')
      assert(getDOMComponentProps(span).myactions === action, 'myactions is injected actions')
      assert.isFunction(getDOMComponentProps(span).myactions.sup, 'sup action is available')
    },

    'inject all actions directly shorthand'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer actions={action}>
          <span />
        </AltContainer>
      )

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert.isFunction(getDOMComponentProps(span).sup, 'sup is available directly on the props')
    },

    'inject all actions using a function'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer actions={function (props) {
          return {
            fooactions: {
              sup: action.sup.bind(action)
            }
          }
        }}>
          <span />
        </AltContainer>
      )

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert.isObject(getDOMComponentProps(span).fooactions, 'actions are injected')
      assert.isFunction(getDOMComponentProps(span).fooactions.sup, 'sup is available')
    },

    'scu'() {
      const scu = sinon.stub().returns(true)

      const node = TestUtils.renderIntoDocument(
        <AltContainer shouldComponentUpdate={scu} store={TestStore}>
          <span />
        </AltContainer>
      )

      action.sup()
      assert.ok(scu.calledOnce, 'custom shouldComponentUpdate was called')
      assert(scu.args.length === 1, 'only one arg is passed, the props')
      assert.isDefined(scu.args[0][0].x, 'x prop exists')
    },

    'injectables'() {
      const node = TestUtils.renderIntoDocument(
        <AltContainer stores={[TestStore]} inject={{
          className: 'foo',
          foo: function () {
            return TestStore.getState()
          }
        }}>
          <span />
        </AltContainer>
      )

      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert(getDOMComponentProps(span).className === 'foo', 'you can inject custom things')
      assert.isDefined(getDOMComponentProps(span).foo.x, 'functions are ran')

      action.sup(888)

      assert(getDOMComponentProps(span).foo.x === 888, 'when passing stores as Array they are just listened on')
    },

    'passing in a component as a prop'() {
      class App extends React.Component {
        render() {
          return <strong x={this.props.x} />
        }
      }

      const node = TestUtils.renderIntoDocument(
        <AltContainer store={TestStore} component={App} />
      )

      const strong = TestUtils.findRenderedDOMComponentWithTag(node, 'strong')

      action.sup(1337)

      assert.isDefined(strong, 'component exists')
      assert(getDOMComponentProps(strong).x === 1337, 'and we have props from TestStore')
    },

    'nested components and context'() {
      const flux = new Flux()

      class View extends React.Component {
        render() {
          return <SubView />
        }
      }

      class SubView extends React.Component {
        render() {
          return (
            <AltContainer>
              <InsideComponent />
            </AltContainer>
          )
        }
      }

      class InsideComponent extends React.Component {
        render() {
          return <span flux={this.props.flux} />
        }
      }

      const foo = sinon.spy()

      class App extends React.Component {
        render() {
          return (
            <AltContainer flux={flux} onMount={foo}>
              <View />
            </AltContainer>
          )
        }
      }

      const node = TestUtils.renderIntoDocument(<App />)
      const span = TestUtils.findRenderedDOMComponentWithTag(node, 'span')

      assert.instanceOf(getDOMComponentProps(span).flux, Flux)

      assert.ok(foo.calledOnce, 'onMount hook was called')
    },
  }
}
