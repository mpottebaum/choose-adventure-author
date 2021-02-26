export const SET_GRID_VIEW_CENTER = 'SET_GRID_VIEW_CENTER'
export const SET_GRID_VIEW_X = 'SET_GRID_VIEW_X'
export const SET_GRID_VIEW_Y = 'SET_GRID_VIEW_Y'

const initialGridViewCenter = {
    x: 0,
    y: 0,
}

const gridViewCenterReducer = ( state = initialGridViewCenter, action ) => {
    switch(action.type) {
        case SET_GRID_VIEW_CENTER:
            return action.gridViewCenter
        case SET_GRID_VIEW_X:
            return {
                y: state.y,
                x: action.x,
            }
        case SET_GRID_VIEW_Y:
            return {
                x: state.x,
                y: action.y,
            }
        default:
            return state
    }
}

export default gridViewCenterReducer