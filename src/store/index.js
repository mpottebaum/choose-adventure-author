import { combineReducers } from 'redux'
import gridViewCenterReducer from './gridViewCenter'
import storyNodesReducer from './storyNodes'
import choicesReducer from './choices'

const rootReducer = combineReducers({
    gridViewCenter: gridViewCenterReducer,
    storyNodes: storyNodesReducer,
    choices: choicesReducer,
})

export default rootReducer