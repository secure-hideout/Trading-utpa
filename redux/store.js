// // store.js
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './reducers/index'; // Create this file
// import thunk from 'redux-thunk';

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

const middleware = [thunk]; // Add middleware as needed

const store = createStore(
    combineReducers({
        auth: authReducer, // Add more reducers if necessary
    }),
    applyMiddleware(...middleware)
);

export default store;

