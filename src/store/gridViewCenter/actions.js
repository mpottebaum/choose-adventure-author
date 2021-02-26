import {
    SET_GRID_VIEW_CENTER,
    SET_GRID_VIEW_X,
    SET_GRID_VIEW_Y
} from './index'

export const setGridViewCenter = gridViewCenter => ({
    type: SET_GRID_VIEW_CENTER,
    gridViewCenter
})

export const setGridViewX = x => ({
    type: SET_GRID_VIEW_X,
    x,
})

export const setGridViewY = y => ({
    type: SET_GRID_VIEW_Y,
    y
})