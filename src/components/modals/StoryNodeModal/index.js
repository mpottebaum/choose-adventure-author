import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { createStoryNodeApi, updateStoryNodeApi, deleteStoryNodeApi } from '../../../constants/apiRoutes'
import { clearStoryNodeCoordinates } from '../../../store/newStoryNodeCoordinates/actions'
import { addStoryNode, editStoryNode, deleteStoryNode } from '../../../store/storyNodes/actions'
import { deselectStoryNode } from '../../../store/selStoryNodeId/actions'

import ShowStoryNode from './cmps/ShowStoryNode'
import EditStoryNode from './cmps/EditStoryNode'

const StoryNodeModal = ({ onClose, createNode=false }) => { 
    const { storyNodes, selStoryNodeId, newStoryNodeCoordinates } = useSelector(state => state)
    const storyNode = storyNodes.find(node => node.id === selStoryNodeId)
    
    const dispatch = useDispatch()

    const [ isEditing, setIsEditing ] = useState(createNode)

    const newStoryNode = {
        name: '',
        content: '',
        next_node_id: null,
        color: null,
        choices_attributes: [],
        story_id: 5,
        grid_x: newStoryNodeCoordinates && newStoryNodeCoordinates.x,
        grid_y: newStoryNodeCoordinates && newStoryNodeCoordinates.y,

    }

    const [ updatedStoryNode, setUpdatedStoryNode ] = useState(createNode ? newStoryNode : {
        ...storyNode,
        choices_attributes: storyNode.choices,
        choices: null,
    })

    useEffect(() => {
        return () => {
            dispatch(clearStoryNodeCoordinates())
        }
    }, [])

    const onSaveCreate = () => {
        axios({
            method: 'POST',
            url: createStoryNodeApi,
            data: {
                story_node: updatedStoryNode,
            }
        })
        .then(createNodeResp => {
            dispatch(addStoryNode(createNodeResp.data))
            onClose()
            dispatch(clearStoryNodeCoordinates())
        })
        .catch(e => {
            console.log(e)
        })
    }

    const onSaveEdit = () => {
        axios({
            method: 'PUT',
            url: updateStoryNodeApi(selStoryNodeId),
            data: updatedStoryNode,
        })
        .then(editNodeResp => {
            dispatch(editStoryNode(editNodeResp.data))
            setIsEditing(false)
        })
    }

    const onCancelEdit = () => {
        setIsEditing(false)
        setUpdatedStoryNode(storyNode)
    }

    const onCancelCreate = () => {
        onClose()
        dispatch(clearStoryNodeCoordinates())
    }

    const onDeleteNode = () => {
        axios({
            method: 'DELETE',
            url: deleteStoryNodeApi(selStoryNodeId),
        })
        .then(deleteNodeResp => {
            console.log(deleteNodeResp.data)
            onClose()
            dispatch(deleteStoryNode(selStoryNodeId))
        })
    }

    return (
        isEditing ? (
            <EditStoryNode
                updatedStoryNode={updatedStoryNode}
                setUpdatedStoryNode={setUpdatedStoryNode}
                onSaveCreate={onSaveCreate}
                onSaveEdit={onSaveEdit}
                onCancelCreate={onCancelCreate}
                onCancelEdit={onCancelEdit}
                storyNode={storyNode}
                createNode={createNode}
            />

        ) : (
            <ShowStoryNode
                onClose={onClose}
                onEdit={() => setIsEditing(true)}
                onDelete={onDeleteNode}
                storyNode={storyNode}
            />
        )
    )
}

export default StoryNodeModal