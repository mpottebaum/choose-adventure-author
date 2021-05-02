import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import NextNode from './NextNode'
import Choices from './Choices'
import Paragraphs from './Paragraphs'

import Button from '../../../Button'
import Header from '../../../Header'

const Content = styled.p`
    padding: 15px;
`

const BtnsContainer = styled.div`
    padding: 10px 0px 20px;
`


const ShowStoryNode = ({
    onClose,
    onEdit,
    onDelete,
    storyNode,
}) => {
    const storyNodes = useSelector(state => state.storyNodes)
    const nextNode = storyNodes.find(node => node.id === storyNode.next_node_id)
    return (
        <>
            <Header>{storyNode && storyNode.name}</Header>
            <BtnsContainer>
                <Button
                    onClick={onEdit}
                    marginRight={10}
                >EDIT</Button>
                <Button onClick={onDelete}>DELETE</Button>
            </BtnsContainer>
            <Paragraphs paragraphs={storyNode.paragraphs} />
            <NextNode storyNode={nextNode} />
            <Choices choices={storyNode.choices} />
        </>
    )
}

export default ShowStoryNode