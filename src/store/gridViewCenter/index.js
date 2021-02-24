export const SET_GRID_VIEW_CENTER = 'SET_GRID_VIEW_CENTER'

const initialGridViewCenter = {
    x: 0,
    y: 0,
}

const gridViewCenterReducer = ( state = initialGridViewCenter, action ) => {
    switch(action.type) {
        case SET_GRID_VIEW_CENTER:
            return action.gridViewCenter
        default:
            return state
    }
}

export default gridViewCenterReducer