import { combineReducers } from 'redux'
import gridViewCenterReducer from './gridViewCenter'
import storyNodesReducer from './storyNodes'
import modalReducer from './modal'
import selStoryNodeIdReducer from './selStoryNodeId'
import newStoryNodeCoordinatesReducer from './newStoryNodeCoordinates'
import toolbarActionReducer from './toolbarAction'

const rootReducer = combineReducers({
    gridViewCenter: gridViewCenterReducer,
    storyNodes: storyNodesReducer,
    modal: modalReducer,
    selStoryNodeId: selStoryNodeIdReducer,
    newStoryNodeCoordinates: newStoryNodeCoordinatesReducer,
    toolbarAction: toolbarActionReducer,
})

export default rootReducer