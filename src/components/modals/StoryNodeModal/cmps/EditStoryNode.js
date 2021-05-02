import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { fontSizes } from '../../../../constants/theme'

import Input from '../../../Input'
import ParagraphInput from '../../../ParagraphInput'
import Button from '../../../Button'
import SelectInput from '../../../SelectInput'

const BtnsContainer = styled.div`

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
                choices_attributes: storyNode ? storyNode.choices : [],
            })
        } else {
            setIsThruNode(true)
            setUpdatedStoryNode({
                ...updatedStoryNode,
                next_node_id: storyNode ? storyNode.next_node_id : null,
                choices_attributes: [],
            })
        }
    }

    const renderNextNodeOptions = (onChange, value) => {
        const nextNodeOptions = storyNodes.filter(node => node.id !== selStoryNodeId)
        const options = nextNodeOptions.map(node => ({
            value: node.id,
            content: node.name,
        }))

        return (
            <SelectInput
                name={'next-node'}
                onChange={onChange}
                value={value}
                placeholder={'Choose the next node...'}
                options={options}
            />
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
        if(updatedStoryNode.choices_attributes && updatedStoryNode.choices_attributes.length > 0) {
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

    const onParagraphChange = (e, i) => {
        setUpdatedStoryNode({
            ...updatedStoryNode,
            paragraphs_attributes: updatedStoryNode.paragraphs_attributes.map((p, pIndex) => {
                if(pIndex === i) {
                    return {
                        ...p,
                        content: e.target.value,
                    }
                }
                return p
            }),
        })
    }


    const renderParagraphInputs = () => updatedStoryNode.paragraphs_attributes.map((paragraph, i) => (
        <li>
            <ParagraphInput
                onChange={e => onParagraphChange(e, i)}
                value={paragraph.content}
                name={`paragraph ${i + 1}`}
            />
        </li>
    ))

    const onAddParagraphClick = () => {
        setUpdatedStoryNode({
            ...updatedStoryNode,
            paragraphs_attributes: [
                ...updatedStoryNode.paragraphs_attributes,
                { content: '' },
            ]
        })
    }

    return (
        <>
            <Input
                name='name'
                onChange={e => setUpdatedStoryNode({ ...updatedStoryNode, name: e.target.value })}
                value={updatedStoryNode.name}
                fontSize={fontSizes.head}
            />
            <ul>
                {renderParagraphInputs()}
            </ul>
            <Button
                onClick={onAddParagraphClick}
            >Add Paragraph</Button>
            <ul>
                {renderChoiceInputs()}
            </ul>
            {
                isThruNode && renderNextNodeOptions(e => setUpdatedStoryNode({ ...updatedStoryNode, next_node_id: e.target.value }), updatedStoryNode.next_node_id)
            }
            {
                !isThruNode && (
                    <Button
                        onClick={() => setUpdatedStoryNode({ ...updatedStoryNode, choices_attributes: [...updatedStoryNode.choices_attributes, {content: ''}]})}
                        marginTop={5}
                    >Add Choice</Button>
                )
            }
            <Button
                onClick={onToggleIsThruNode}
                marginTop={5}
                marginBottom={5}
            >Switch to {isThruNode ? 'choices node' : 'through node'}</Button>
            <BtnsContainer>
                <Button
                    onClick={createNode ? onSaveCreate : onSaveEdit}
                    marginRight={5}
                >SAVE</Button>
                <Button onClick={createNode ? onCancelCreate : onCancelEdit}>CANCEL</Button>
            </BtnsContainer>
        </>
    )
}

export default EditStoryNode