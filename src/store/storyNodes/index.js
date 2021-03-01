export const SET_STORY_NODES = 'SET_STORY_NODES'
export const ADD_STORY_NODE = 'ADD_STORY_NODE'

const storyNodesReducer = ( state = [], action ) => {
    switch(action.type) {
        case SET_STORY_NODES:
            return action.storyNodes
        case ADD_STORY_NODE:
            return [
                ...state,
                action.storyNode
            ]
        default:
            return state
    }
}

export default storyNodesReducer