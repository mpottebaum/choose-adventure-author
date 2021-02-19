import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { setStoryNodes } from '../store/storyNodes/actions'
import { setChoices } from '../store/choices/actions'

import Toolbar from '../components/Toolbar'
import Grid from '../components/Grid'
import ReactModal from 'react-modal'

const Container = styled.div`
    height: 50vh;
`

const StoryBuilder = () => {

    const dispatch = useDispatch()

    const [ gridViewCenter, setGridViewCenter] = useState({
        x: 0,
        y: 0
    })
    const [ storyNodeModal, setStoryNodeModal ] = useState(false)

    useEffect(() => {
        getStory()
    }, [])

    const extractChoices = storyNodes => (
        storyNodes.reduce(
                (choicesArray, node) => [ ...choicesArray, ...node.choices ],
                []
            )
    )

    const getStory = async () => {
        axios('http://localhost:3000/story-nodes?story_id=1')
            .then(storyNodesResp => {
                const onlyNodesWithCoordinates = storyNodesResp.data.filter(node => node.grid_x && node.grid_y)
                dispatch(setStoryNodes(onlyNodesWithCoordinates))
                const choices = extractChoices(onlyNodesWithCoordinates)
                dispatch(setChoices(choices))
            })
    }


    return <Container>
        <Grid
            gridViewCenter={gridViewCenter}
            width={850}
            height={650}
            xCells={7}
            yCells={15}
        />
        <Toolbar />
        <ReactModal
            isOpen={storyNodeModal}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setStoryNodeModal(false)}
            ariaHideApp={false}
        >
            <p>story node modal</p>
        </ReactModal>
    </Container>
}

export default StoryBuilder