// import redux from 'redux'

const redux = require('redux')
const createStore = redux.createStore

const bindActionCreators = redux.bindActionCreators 



const CAKE_ORDERED = "CAKE_ORDERED";

// Action creators
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

const initialState = {
  numOfCakes: 10,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case CAKE_ORDERED:
      return { 
      ...state,
      numOfCakes: state.numOfCakes - 1,
    }
    default:
        return state
  }
}

const store = createStore(reducer)
console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => console.log('update state', store.getState()))


// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())

const actions = bindActionCreators({ orderCake }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()

unsubscribe()