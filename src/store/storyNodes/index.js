export const SET_STORY_NODES = 'SET_STORY_NODES'

const storyNodesReducer = ( state = [], action ) => {
    switch(action.type) {
        case SET_STORY_NODES:
            return action.storyNodes
        default:
            return state
    }
}

export default storyNodesReducer