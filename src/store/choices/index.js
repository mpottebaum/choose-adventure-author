export const SET_CHOICES = 'SET_CHOICES'

const choicesReducer = ( state = [], action ) => {
    switch(action.type) {
        case SET_CHOICES:
            return action.choices
        default:
            return state
    }
}

export default choicesReducer