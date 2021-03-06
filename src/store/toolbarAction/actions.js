import {
    SET_TOOLBAR_ACTION,
    CLEAR_TOOLBAR_ACTION
} from './index'

export const setToolbarAction = toolbarAction => ({
    type: SET_TOOLBAR_ACTION,
    toolbarAction,
})

export const clearToolbarAction = () => ({
    type: CLEAR_TOOLBAR_ACTION,
})