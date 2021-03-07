import React, { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import useWindowDimensions from '../hooks/useWindowDimensions'

import { getStoryNodesApi } from '../constants/apiRoutes'
import { setStoryNodes } from '../store/storyNodes/actions'

import Toolbar from '../components/Toolbar'
import Grid from '../components/Grid'

const Container = styled.div`
    height: 50vh;
`

const StoryBuilder = () => {

    const dispatch = useDispatch()
    const { width, height } = useWindowDimensions()

    useEffect(() => {
        getStory()
    }, [])

    const getStory = async () => {
        axios(getStoryNodesApi(6))
            .then(storyNodesResp => {
                dispatch(setStoryNodes(storyNodesResp.data))
            })
    }
    
    const numCols = Math.floor(width / 121)
    const numRows = Math.floor(height / 43)


    return <Container>
        <Grid
            // width={850}
            // height={650}
            // numCols={7}
            // numRows={15}
            width={width - 80}
            height={height - 80}
            numCols={numCols}
            numRows={numRows}
        />
        <Toolbar />
    </Container>
}

export default StoryBuilder