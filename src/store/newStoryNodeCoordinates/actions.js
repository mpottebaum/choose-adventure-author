import {
    SET_STORY_NODE_COORDINATES,
    CLEAR_STORY_NODE_COORDINATES
} from './index'

export const setStoryNodeCoordinates = coordinates => ({
    type: SET_STORY_NODE_COORDINATES,
    coordinates,
})

export const clearStoryNodeCoordinates = () => ({
    type: CLEAR_STORY_NODE_COORDINATES,
})