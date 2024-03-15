const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions
const iceCreamActions = require('./features/ice/ice').iceCreamActions

console.log('initial state', store.getState())
const unsubscribe = store.subscribe(() => {
})

store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.restocked(3))

store.dispatch(iceCreamActions.ordered())
store.dispatch(iceCreamActions.ordered())
store.dispatch(iceCreamActions.ordered(2))

unsubscribe()