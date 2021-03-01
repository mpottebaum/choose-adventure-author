import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'

const Input = styled.input`

`

const TextArea = styled.textarea`

`

const Button = styled.button`

`

const ShowStoryNode = ({
    onClose,
    onEdit,
    onDelete,
    storyNode,
}) => {

    const storyNodes = useSelector(state => state.storyNodes)

    const renderNextNode = () => {
        if(storyNode.next_node_id) {
            const nextNode = storyNodes.find(node => node.id === storyNode.next_node_id)
            return (
                <p>Next Node: {nextNode.name}</p>
            )
        }
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

    return (
        <>
            <h1>{storyNode && storyNode.name}</h1>
            <p>{storyNode && storyNode.content}</p>
            {renderNextNode()}
            <ul>
                {renderChoices()}
            </ul>
            <Button onClick={onClose}>CLOSE</Button>
            <Button onClick={onEdit}>EDIT</Button>
            <Button onClick={onDelete}>DELETE</Button>
        </>
    )
}

export default ShowStoryNode