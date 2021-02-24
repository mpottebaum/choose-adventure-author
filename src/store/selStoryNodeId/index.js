export const SELECT_STORY_NODE = 'SELECT_STORY_NODE'
export const DESELECT_STORY_NODE = 'DESELECT_STORY_NODE'

const selStoryNodeIdReducer = ( state=null, action ) => {
    switch(action.type) {
        case SELECT_STORY_NODE:
            return action.id
        case DESELECT_STORY_NODE:
            return null
        default:
            return state
    }
}

export default selStoryNodeIdReducer