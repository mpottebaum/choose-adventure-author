import {
    SET_STORY_NODES,
    ADD_STORY_NODE,
    EDIT_STORY_NODE,
    DELETE_STORY_NODE,
    EDIT_CHOICE
} from './index'
import axios from 'axios'
import {
    moveStoryNodeApi,
    createStoryNodeApi,
    updateStoryNodeApi,
    deleteStoryNodeApi,
    updateChoiceApi,
} from '../../constants/apiRoutes'
import { clearToolbarAction } from '../toolbarAction/actions'
import { clearStoryNodeCoordinates } from '../newStoryNodeCoordinates/actions'

export const setStoryNodes = storyNodes => ({
    type: SET_STORY_NODES,
    storyNodes,
})

export const addStoryNode = storyNode => ({
    type: ADD_STORY_NODE,
    storyNode,
})

export const editStoryNode = storyNode => ({
    type: EDIT_STORY_NODE,
    storyNode,
})

export const deleteStoryNode = storyNodeId => ({
    type: DELETE_STORY_NODE,
    storyNodeId,
})

export const editChoice = choice => ({
    type: EDIT_CHOICE,
    choice,
})

export const createStoryNode = storyNode => dispatch => {
    axios({
        method: 'POST',
        url: createStoryNodeApi,
        data: {
            story_node: storyNode,
        }
    })
    .then(resp => {
        dispatch(addStoryNode(resp.data))
        dispatch(clearStoryNodeCoordinates())
    })
}

export const updateStoryNode = storyNode => dispatch => {
    axios({
        method: 'PUT',
        url: updateStoryNodeApi(storyNode.id),
        data: storyNode,
    })
    .then(resp => {
        dispatch(editStoryNode(resp.data))
    })
}

export const destroyStoryNode = storyNodeId => dispatch => {
    axios({
        method: 'DELETE',
        url: deleteStoryNodeApi(storyNodeId),
    })
    .then(() => {
        dispatch(deleteStoryNode(storyNodeId))
    })
}

export const moveStoryNode = (x, y, storyNodeId) => dispatch => {
    axios({
        method: 'PUT',
        url: moveStoryNodeApi(storyNodeId),
        data: {
            story_node: { x, y, }
        },
    })
    .then(resp => {
        dispatch(editStoryNode(resp.data))
        dispatch(clearToolbarAction())
    })
}

export const updateChoice = choice => dispatch => {
    axios({
        method: 'PUT',
        url: updateChoiceApi(choice.id),
        data: {
            choice,
        }
    })
    .then(resp => {
        dispatch(editChoice(resp.data))
    })
}