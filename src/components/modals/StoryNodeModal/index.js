import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { clearStoryNodeCoordinates } from '../../../store/newStoryNodeCoordinates/actions'
import {
    createStoryNode,
    updateStoryNode,
    destroyStoryNode
} from '../../../store/storyNodes/actions'

import FlexBox from '../../FlexBox'
import ShowStoryNode from './cmps/ShowStoryNode'
import EditStoryNode from './cmps/EditStoryNode'

const StoryNodeModal = ({ onClose, createNode=false }) => { 
    const { storyNodes, selStoryNodeId, newStoryNodeCoordinates } = useSelector(state => state)
    const storyNode = storyNodes.find(node => node.id === selStoryNodeId)
    
    const dispatch = useDispatch()

    const [ isEditing, setIsEditing ] = useState(createNode)

    const newStoryNode = {
        name: '',
        // content: '',
        next_node_id: null,
        color: null,
        choices_attributes: [],
        paragraphs_attributes: [
            { content: '' }
        ],
        story_id: 7,
        x: newStoryNodeCoordinates && newStoryNodeCoordinates.x,
        y: newStoryNodeCoordinates && newStoryNodeCoordinates.y,

    }

    const [ updatedStoryNode, setUpdatedStoryNode ] = useState(createNode ? newStoryNode : {
        ...storyNode,
        choices_attributes: storyNode.choices,
        choices: null,
        paragraphs_attributes: storyNode.paragraphs,
        paragraphs: null,
    })

    useEffect(() => {
        return () => {
            dispatch(clearStoryNodeCoordinates())
        }
    }, [])

    const onSaveCreate = () => {
        dispatch(createStoryNode(updatedStoryNode))
        onClose()
    }

    const onSaveEdit = () => {
        dispatch(updateStoryNode(updatedStoryNode))
        setIsEditing(false)
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
        dispatch(destroyStoryNode(selStoryNodeId))
        onClose()
    }

    return (
        <FlexBox
            flexDirection='column'
        >
            {
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
            }
        </FlexBox>
    )
}

export default StoryNodeModal