import { combineReducers } from 'redux'
import gridViewCenterReducer from './gridViewCenter'
import storyNodesReducer from './storyNodes'
import choicesReducer from './choices'
import modalReducer from './modal'
import selStoryNodeIdReducer from './selStoryNodeId'
import newStoryNodeCoordinatesReducer from './newStoryNodeCoordinates'

const rootReducer = combineReducers({
    gridViewCenter: gridViewCenterReducer,
    storyNodes: storyNodesReducer,
    choices: choicesReducer,
    modal: modalReducer,
    selStoryNodeId: selStoryNodeIdReducer,
    newStoryNodeCoordinates: newStoryNodeCoordinatesReducer,
})

export default rootReducer