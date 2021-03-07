export const SET_TOOLBAR_ACTION = 'SET_TOOLBAR_ACTION'
export const CLEAR_TOOLBAR_ACTION = 'CLEAR_TOOLBAR_ACTION'

const toolbarActionReducer = ( state=null, action ) => {
    switch(action.type) {
        case SET_TOOLBAR_ACTION:
            return action.toolbarAction
        case CLEAR_TOOLBAR_ACTION:
            return null
        default:
            return state
    }
}

export default toolbarActionReducer