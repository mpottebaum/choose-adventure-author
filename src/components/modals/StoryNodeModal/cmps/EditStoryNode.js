import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Input = styled.input`

`

const TextArea = styled.textarea`

`

const Button = styled.button`

`

const EditStoryNode = ({
    updatedStoryNode,
    setUpdatedStoryNode,
    onSaveCreate,
    onSaveEdit,
    onCancelCreate,
    onCancelEdit,
    storyNode,
    createNode,
}) => {

    const { storyNodes, selStoryNodeId } = useSelector(state => state)

    const [ isThruNode, setIsThruNode ] = useState(createNode ? false : !!storyNode.next_node_id)

    const onToggleIsThruNode = () => {
        if(isThruNode) {
            setIsThruNode(false)
            setUpdatedStoryNode({
                ...updatedStoryNode,
                next_node_id: null,
                choices_attributes: storyNode.choices,
            })
        } else {
            setIsThruNode(true)
            setUpdatedStoryNode({
                ...updatedStoryNode,
                next_node_id: storyNode.next_node_id,
                choices_attributes: [],
            })
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

    const onChoiceChange = (e, i, key) => {
        setUpdatedStoryNode({
            ...updatedStoryNode,
            choices_attributes: updatedStoryNode.choices_attributes.map((choice, choiceIndex) => {
                if(choiceIndex === i) {
                    return {
                        ...choice,
                        [key]: e.target.value
                    }
                }
                return choice
            })
        })
    }

    const renderChoiceInputs = () => {
        if(updatedStoryNode.choices_attributes.length > 0) {
            return updatedStoryNode.choices_attributes.map((choice, i) => {
                return (
                    <li>
                        <Input
                            name='choice'
                            onChange={e => onChoiceChange(e, i, 'content')}
                            value={choice.content}
                        />
                        {renderNextNodeOptions(e => onChoiceChange(e, i, 'next_node_id'), updatedStoryNode.choices_attributes[i].next_node_id)}
                    </li>
                )
            })
        }
    }

    return (
        <>
            <Input
                name='name'
                onChange={e => setUpdatedStoryNode({ ...updatedStoryNode, name: e.target.value })}
                value={updatedStoryNode.name}
            />
            <TextArea
                name='content'
                onChange={e => setUpdatedStoryNode({ ...updatedStoryNode, content: e.target.value })}
                value={updatedStoryNode.content}
            />
            <Button onClick={onToggleIsThruNode}>Switch to {isThruNode ? 'choices node' : 'through node'}</Button>
            <ul>
                {renderChoiceInputs()}
            </ul>
            {
                isThruNode && renderNextNodeOptions(e => setUpdatedStoryNode({ ...updatedStoryNode, next_node_id: e.target.value }), updatedStoryNode.next_node_id)
            }
            {
                !isThruNode && (
                    <Button onClick={() => setUpdatedStoryNode({ ...updatedStoryNode, choices_attributes: [...updatedStoryNode.choices_attributes, {content: ''}]})}>Add Choice</Button>
                )
            }
            <Button onClick={createNode ? onSaveCreate : onSaveEdit}>SAVE</Button>
            <Button onClick={createNode ? onCancelCreate : onCancelEdit}>CANCEL</Button>
        </>
    )
}

export default EditStoryNode