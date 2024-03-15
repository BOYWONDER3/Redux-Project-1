const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const axios = require('axios')

const initialState = { 
  loading: false,
  users: [],
  error: "",
};

// Actions
const FETCH_USERES_REQUESTED = "FETCH_USERES_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

//  Action Creators
function fetchUsersRrequest() {
  return {
    type: FETCH_USERES_REQUESTED,
  };
}

// Store
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

// error Message
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

//  Reducer  Function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERES_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

// action creator - returns an action - but a thunk makes it possible to return a function
const fetchUsers = () => {
    return function(dsipatch){
        dsipatch(fetchUsersRrequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            const users = res.data.map((user) => user.id)
            dispatchEvent(fetchUsersSuccess(users))
        }).catch((err)=> {
            dsipatch(fetchUsersFailure(err.message))
        })
    }
}

// store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())