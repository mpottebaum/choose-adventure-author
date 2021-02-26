import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { clearStoryNodeCoordinates } from '../../store/newStoryNodeCoordinates/actions'

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
    const [ nodeName, setNodeName ] = useState(createNode ? '' : storyNode.name)
    const [ nodeContent, setNodeContent ] = useState(createNode ? '' : storyNode.content)
    const [ nodeChoices, setNodeChoices ] = useState(createNode ? [] : storyNode.choices)

    const onSaveEdit = () => {
        console.log('save edit')
        setIsEditing(false)
    }

    const onCancelEdit = () => {
        setIsEditing(false)
        setNodeName(storyNode.name)
        setNodeContent(storyNode.content)
    }

    const onCancelCreate = () => {
        onClose()
        dispatch(clearStoryNodeCoordinates())
    }

    const onDeleteNode = () => {
        console.log('delete node')
        onClose()
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

    const onChoiceChange = (e, i) => {
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

    const renderChoiceInputs = () => {
        if(nodeChoices.length > 0) {
            return nodeChoices.map((choice, i) => {
                return <Input
                    name='choice'
                    onChange={e => onChoiceChange(e, i)}
                    value={choice.content}
                />
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
                {renderChoiceInputs()}
                <Button onClick={() => setNodeChoices([...nodeChoices, {content: ''}])}>Add Choice</Button>
                <Button onClick={onSaveEdit}>SAVE</Button>
                <Button onClick={createNode ? onCancelCreate : onCancelEdit}>CANCEL</Button>
            </>
        ) : (
            <>
                <h1>{storyNode && storyNode.name}</h1>
                <p>{storyNode && storyNode.content}</p>
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