import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { extractChoices } from '../../helpers/storeHelpers'
import { updateChoice, destroyChoice } from '../../store/storyNodes/actions'
import { selectStoryNode } from '../../store/selStoryNodeId/actions'
import { deselectChoice } from '../../store/selChoiceId/actions'
import { openModal } from '../../store/modal/actions'
import modals from '../../constants/modals'

import Button from '../Button'
import Input from '../Input'
import SelectInput from '../SelectInput'

const { storyNodeModal } = modals

const ChoiceModal = ({ onClose }) => {
    const { selChoiceId, storyNodes } = useSelector(state => state)
    const choice = extractChoices(storyNodes).find(choice => choice.id === selChoiceId)

    const dispatch = useDispatch()

    const [ isEditing, setIsEditing ] = useState(false)
    const [ choiceContent, setChoiceContent ] = useState(choice.content)
    const [ choiceNextId, setChoiceNextId ] = useState(choice.next_node_id)

    const renderNextNode = () => {
        if(choice.next_node_id) {
            const nextNode = storyNodes.find(node => node.id === choice.next_node_id)
            return (
                <p>Next Node: {nextNode.name}</p>
            )
        }
    }

    const renderNextNodeOptions = () => {
        const nextNodeOptions = storyNodes.filter(node => node.id !== choice.story_node_id)
        const options = nextNodeOptions.map(node => ({
            value: node.id,
            content: node.name,
        }))

        return (
            <SelectInput
                name={'next-node'}
                onChange={e => setChoiceNextId(e.target.value)}
                value={choiceNextId}
                placeholder={'Choose the next node...'}
                options={options}
            />
        )
    }

    const onCancelEdit = () => {
        setIsEditing(false)
        setChoiceContent(choice.content)
    }

    const onSaveEdit = () => {
        dispatch(updateChoice({
            ...choice,
            content: choiceContent,
            next_node_id: choiceNextId,
        }))
        setIsEditing(false)
    }

    const onViewStoryNode = () => {
        dispatch(selectStoryNode(choice.story_node_id))
        dispatch(openModal(storyNodeModal))
        dispatch(deselectChoice())
    }

    const onDelete = () => {
        dispatch(destroyChoice(choice))
        onClose()
    }

    return (
        isEditing ? (
            <>
                <Input
                    name='choice'
                    value={choiceContent}
                    onChange={e => setChoiceContent(e.target.value)}
                />
                {renderNextNodeOptions()}
                <Button onClick={onSaveEdit}>SAVE</Button>
                <Button onClick={onCancelEdit}>CANCEL</Button>
            </>
        ) : (
            <>
                <p>{choice.content}</p>
                {renderNextNode()}
                <Button onClick={() => setIsEditing(true)}>EDIT</Button>
                <Button onClick={onDelete}>DELETE</Button>
                <Button onClick={onViewStoryNode}>VIEW STORY NODE</Button>
                <Button onClick={onClose}>CLOSE</Button>
            </>
        )
    )
}

export default ChoiceModal