import {
    SET_STORY_NODES,
    ADD_STORY_NODE,
    EDIT_STORY_NODE,
    DELETE_STORY_NODE,
    EDIT_CHOICE,
    DELETE_CHOICE
} from './index'
import axios from 'axios'
import {
    createStoryNodeApi,
    updateStoryNodeApi,
    deleteStoryNodeApi,
    updateChoiceApi,
    deleteChoiceApi,
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

export const deleteChoice = choice => ({
    type: DELETE_CHOICE,
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
    .catch(err => console.log(err))
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
        url: updateStoryNodeApi(storyNodeId),
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

export const destroyChoice = choice => dispatch => {
    axios({
        method: 'DELETE',
        url: deleteChoiceApi(choice.id),
    })
    .then(() => {
        dispatch(deleteChoice(choice))
    })
}

export const moveChoice = (x, y, choiceId) => dispatch => {
    axios({
        method: 'PUT',
        url: updateChoiceApi(choiceId),
        data: {
            choice: { x, y, }
        },
    })
    .then(resp => {
        dispatch(editChoice(resp.data))
        dispatch(clearToolbarAction())
    })
}

export const drawLine = (nextNodeId, id, isChoice=false) => dispatch => {
    axios({
        method: 'PUT',
        url: isChoice ? updateChoiceApi(id) : updateStoryNodeApi(id),
        data: {
            [isChoice ? 'choice' : 'story_node']: {
                next_node_id: nextNodeId
            }
        }
    })
    .then(resp => {
        dispatch(isChoice ? editChoice(resp.data) : editStoryNode(resp.data))
        dispatch(clearToolbarAction())
    })
}