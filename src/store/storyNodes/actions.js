import { SET_STORY_NODES, ADD_STORY_NODE } from './index'

export const setStoryNodes = storyNodes => ({
    type: SET_STORY_NODES,
    storyNodes,
})

export const addStoryNode = storyNode => ({
    type: ADD_STORY_NODE,
    storyNode,
})