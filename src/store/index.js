import { combineReducers } from 'redux'
import gridReducer from './grid'
import storyNodesReducer from './storyNodes'
import choicesReducer from './choices'

const rootReducer = combineReducers({
    grid: gridReducer,
    storyNodes: storyNodesReducer,
    choices: choicesReducer,
})

export default rootReducer