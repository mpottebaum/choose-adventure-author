import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'

import { createStoryNodeApi, updateStoryNodeApi, deleteStoryNodeApi } from '../../constants/apiRoutes'
import { clearStoryNodeCoordinates } from '../../store/newStoryNodeCoordinates/actions'
import { addStoryNode, editStoryNode, deleteStoryNode } from '../../store/storyNodes/actions'

const Input = styled.input`

`

const TextArea = styled.textarea`

`

const Button = styled.button`

`

const StoryNodeModal = ({ onClose, createNode=false }) => { 
    const { storyNodes, selStoryNodeId, newStoryNodeCoordinates } = useSelector(state => state)
    const storyNode = storyNodes.find(node => node.id === selStoryNodeId)
    
    const dispatch = useDispatch()

    const [ isEditing, setIsEditing ] = useState(createNode)
    const [ isThruNode, setIsThruNode ] = useState(createNode ? false : !!storyNode.next_node_id)

    const [ nodeName, setNodeName ] = useState(createNode ? '' : storyNode.name)
    const [ nodeContent, setNodeContent ] = useState(createNode ? '' : storyNode.content)
    const [ nodeChoices, setNodeChoices ] = useState(createNode ? [] : storyNode.choices)
    const [ nodeNextNodeId, setNodeNextNodeId ] = useState(createNode ? null : storyNode.next_node_id)

    const onSaveCreate = () => {
        axios({
            method: 'POST',
            url: createStoryNodeApi,
            data: {
                story_node: {
                    story_id: 5,
                    name: nodeName,
                    content: nodeContent,
                    grid_x: newStoryNodeCoordinates.x,
                    grid_y: newStoryNodeCoordinates.y,
                    choices_attributes: nodeChoices,
                    next_node_id: nodeNextNodeId,
                }
            }
        })
        .then(createNodeResp => {
            console.log(createNodeResp.data)
            dispatch(addStoryNode(createNodeResp.data))
            dispatch(clearStoryNodeCoordinates())
            onClose()
        })
        .catch(e => {
            console.log(e)
        })
    }

    const onSaveEdit = () => {
        axios({
            method: 'PUT',
            url: updateStoryNodeApi(selStoryNodeId),
            data: {
                story_id: 5,
                name: nodeName,
                content: nodeContent,
                choices_attributes: nodeChoices,
                next_node_id: nodeNextNodeId,
            }
        })
        .then(editNodeResp => {
            dispatch(editStoryNode(editNodeResp.data))
            setIsEditing(false)
        })
    }

    const onCancelEdit = () => {
        setIsEditing(false)
        setNodeName(storyNode.name)
        setNodeContent(storyNode.content)
        setNodeNextNodeId(storyNode.next_node_id)
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

    const onToggleIsThruNode = () => {
        if(isThruNode) {
            setIsThruNode(false)
            setNodeNextNodeId('')
            setNodeChoices(storyNode.choices)
        } else {
            setIsThruNode(true)
            setNodeNextNodeId(storyNode.next_node_id)
            setNodeChoices([])
        }
    }

    const renderNextNode = () => {
        if(storyNode.next_node_id) {
            const nextNode = storyNodes.find(node => node.id === storyNode.next_node_id)
            return (
                <p>Next Node: {nextNode.name}</p>
            )
        }
    }

    const renderNextNodeOptions = (onChange, value) => {
        const nextNodeOptions = storyNodes.filter(node => node.id !== selStoryNodeId)
        return (
            <select name='next-node' onChange={onChange} value={value}>
                <option value={null}>Choose the next node...</option>
                {nextNodeOptions.map(node => (
                    <option value={node.id}>{node.name}</option>
                ))}
            </select>
        )
    }

    const renderChoices = () => {
        if(storyNode.choices.length > 0) {
            return storyNode.choices.map(choice => (
                <li key={choice.id}>
                    <p>{choice.content}</p>
                </li>
            ))
        }
    }

    const onChoiceContentChange = (e, i) => {
        setNodeChoices(
            nodeChoices.map((choice, choiceIndex) => {
                if(choiceIndex === i) {
                    return {
                        ...choice,
                        content: e.target.value,
                    }
                }
                return choice
            })
        )
    }

    const onChoiceNextNodeIdChange = (e, i) => {
        setNodeChoices(
            nodeChoices.map((choice, choiceIndex) => {
                if(choiceIndex === i) {
                    return {
                        ...choice,
                        next_node_id: e.target.value
                    }
                }
                return choice
            })
        )
    }

    const renderChoiceInputs = () => {
        if(nodeChoices.length > 0) {
            return nodeChoices.map((choice, i) => {
                return (
                    <li>
                        <Input
                            name='choice'
                            onChange={e => onChoiceContentChange(e, i)}
                            value={choice.content}
                        />
                        {renderNextNodeOptions(e => onChoiceNextNodeIdChange(e, i), nodeChoices[i].next_node_id)}
                    </li>
                )
            })
        }
    }
    return (
        isEditing ? (
            <>
                <Input
                    name='name'
                    onChange={e => setNodeName(e.target.value)}
                    value={nodeName}
                />
                <TextArea
                    name='name'
                    onChange={e => setNodeContent(e.target.value)}
                    value={nodeContent}
                />
                <Button onClick={onToggleIsThruNode}>Switch to {isThruNode ? 'choices node' : 'through node'}</Button>
                <ul>
                    {renderChoiceInputs()}
                </ul>
                {
                    isThruNode && renderNextNodeOptions(e => setNodeNextNodeId(e.target.value), nodeNextNodeId)
                }
                {
                    !isThruNode && (
                        <Button onClick={() => setNodeChoices([...nodeChoices, {content: ''}])}>Add Choice</Button>
                    )
                }
                <Button onClick={createNode ? onSaveCreate : onSaveEdit}>SAVE</Button>
                <Button onClick={createNode ? onCancelCreate : onCancelEdit}>CANCEL</Button>
            </>
        ) : (
            <>
                <h1>{storyNode && storyNode.name}</h1>
                <p>{storyNode && storyNode.content}</p>
                {renderNextNode()}
                <ul>
                    {renderChoices()}
                </ul>
                <Button onClick={onClose}>CLOSE</Button>
                <Button onClick={() => setIsEditing(true)}>EDIT</Button>
                <Button onClick={onDeleteNode}>DELETE</Button>
            </>
        )
    )
}

export default StoryNodeModal