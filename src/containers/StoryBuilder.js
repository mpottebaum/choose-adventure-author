import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { getStoryNodesApi } from '../constants/apiRoutes'
import { setStoryNodes } from '../store/storyNodes/actions'

import Toolbar from '../components/Toolbar'
import Grid from '../components/Grid'
import ReactModal from 'react-modal'

const Container = styled.div`
    height: 50vh;
`

const StoryBuilder = () => {

    const dispatch = useDispatch()

    const [ storyNodeModal, setStoryNodeModal ] = useState(false)

    useEffect(() => {
        getStory()
    }, [])

    const getStory = async () => {
        axios(getStoryNodesApi(5))
            .then(storyNodesResp => {
                dispatch(setStoryNodes(storyNodesResp.data))
            })
    }


    return <Container>
        <Grid
            width={850}
            height={650}
            numCols={7}
            numRows={15}
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