import {
    SELECT_CHOICE,
    DESELECT_CHOICE
} from './index'

export const selectChoice = id => ({
    type: SELECT_CHOICE,
    id,
})

export const deselectChoice = () => ({
    type: DESELECT_CHOICE,
})