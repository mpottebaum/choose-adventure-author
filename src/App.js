import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/index'

import StoryBuilder from './containers/StoryBuilder'
import Modal from './containers/Modal'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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