export const SET_STORY_NODES = 'SET_STORY_NODES'
export const ADD_STORY_NODE = 'ADD_STORY_NODE'
export const EDIT_STORY_NODE = 'EDIT_STORY_NODE'
export const DELETE_STORY_NODE = 'DELETE_STORY_NODE'
export const EDIT_CHOICE = 'EDIT_CHOICE'
export const DELETE_CHOICE = 'DELETE_CHOICE'

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
        case DELETE_STORY_NODE:
            return state.filter(node => node.id !== action.storyNodeId)
        case EDIT_CHOICE:
            return state.map(node => {
                if(node.id === action.choice.story_node_id) {
                    return {
                        ...node,
                        choices: node.choices.map(choice => {
                            if(choice.id === action.choice.id) {
                                return action.choice
                            }
                            return choice
                        })
                    }
                }
                return node
            })
        case DELETE_CHOICE:
            return state.map(node => {
                if(node.id === action.choice.story_node_id) {
                    return {
                        ...node,
                        choices: node.choices.filter(choice => choice.id !== action.choice.id),
                    }
                }
                return node
            })
        default:
            return state
    }
}

export default storyNodesReducer