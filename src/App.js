import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/index'
import thunk from 'redux-thunk'
import './App.css'

import StoryBuilder from './containers/StoryBuilder'
import Modal from './containers/Modal'

// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const App = () => {

    return (
        <Provider store={store}>
            <StoryBuilder />
            <Modal />
        </Provider>
    )
}

export default App