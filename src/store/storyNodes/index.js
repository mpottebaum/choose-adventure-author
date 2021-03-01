export const SET_STORY_NODES = 'SET_STORY_NODES'
export const ADD_STORY_NODE = 'ADD_STORY_NODE'
export const EDIT_STORY_NODE = 'EDIT_STORY_NODE'

const storyNodesReducer = ( state = [], action ) => {
    switch(action.type) {
        case SET_STORY_NODES:
            return action.storyNodes
        case ADD_STORY_NODE:
            return [
                ...state,
                action.storyNode
            ]
        case EDIT_STORY_NODE:
            return state.map(node => {
                if(node.id === action.storyNode.id) {
                    return action.storyNode
                }
                return node
            })
        default:
            return state
    }
}

export default storyNodesReducer