import React from 'react'
import { useSelector } from 'react-redux'

const ShowStoryNodeModal = ({ onClose }) => {
    const { storyNodes, selStoryNodeId } = useSelector(state => state)
    const storyNode = storyNodes.find(node => node.id === selStoryNodeId)

    const { name, content } = storyNode

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
        <>
            <h1>{name}</h1>
            <p>{content}</p>
            <ul>
                {renderChoices()}
            </ul>
            <button onClick={onClose}>CLOSE</button>
        </>
    )
}

export default ShowStoryNodeModal