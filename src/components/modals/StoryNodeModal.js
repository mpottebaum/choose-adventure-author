import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Input = styled.input`

`

const TextArea = styled.textarea`

`

const Button = styled.button`

`

const StoryNodeModal = ({ onClose, startInEdit=false }) => {
    const { storyNodes, selStoryNodeId, modal } = useSelector(state => state)
    const storyNode = storyNodes.find(node => node.id === selStoryNodeId)

    const { name, content } = storyNode

    const [ isEditing, setIsEditing ] = useState(startInEdit)
    const [ nodeName, setNodeName ] = useState(name)
    const [ nodeContent, setNodeContent ] = useState(content)

    const onSaveEdit = () => {
        console.log('save edit')
        onClose()
    }

    const onCancelEdit = () => {
        setIsEditing(false)
        setNodeName(name)
        setNodeContent(content)
    }

    const onDeleteNode = () => {
        console.log('delete node')
        onClose()
    }

    const renderChoices = () => {
        if(storyNode.choices.length > 0) {
            return storyNode.choices.map(choice => (
                <li>
                    <p>{choice.content}</p>
                </li>
            ))
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
                <Button onClick={onSaveEdit}>SAVE</Button>
                <Button onClick={onCancelEdit}>CANCEL</Button>
            </>
        ) : (
            <>
                <h1>{name}</h1>
                <p>{content}</p>
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