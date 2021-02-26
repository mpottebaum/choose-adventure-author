export const SET_STORY_NODE_COORDINATES = 'SET_STORY_NODE_COORDINATES'
export const CLEAR_STORY_NODE_COORDINATES = 'CLEAR_STORY_NODE_COORDINATES'

const newStoryNodeCoordinates = ( state=null, action ) => {
    switch(action.type) {
        case SET_STORY_NODE_COORDINATES:
            return action.coordinates
        case CLEAR_STORY_NODE_COORDINATES:
            return null
        default:
            return state
    }
}

export default newStoryNodeCoordinates