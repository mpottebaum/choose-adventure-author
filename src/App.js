import React from 'react'
import StoryBuilder from './containers/StoryBuilder'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/index'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => {

    return (
        <Provider store={store}>
            <StoryBuilder />
        </Provider>
    )
}

export default App