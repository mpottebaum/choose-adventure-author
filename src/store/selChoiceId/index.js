export const SELECT_CHOICE = 'SELECT_CHOICE'
export const DESELECT_CHOICE = 'DESELECT_CHOICE'

const selChoiceIdReducer = ( state=null, action ) => {
    switch(action.type) {
        case SELECT_CHOICE:
            return action.id
        case DESELECT_CHOICE:
            return null
        default:
            return state
    }
}

export default selChoiceIdReducer