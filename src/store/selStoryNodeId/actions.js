import {
    SELECT_STORY_NODE,
    DESELECT_STORY_NODE
} from './index'

export const selectStoryNode = id => ({
    type: SELECT_STORY_NODE,
    id,
})

export const deselectStoryNode = () => ({
    type: DESELECT_STORY_NODE,
})