import React, { useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { TOOLBAR_HEIGHT } from '../constants/grid'
import { useParams } from 'react-router-dom'

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
    const { id } = useParams()

    useEffect(() => {
        getStory()
    }, [])

    const getStory = async () => {
        axios(getStoryNodesApi(id))
            .then(storyNodesResp => {
                dispatch(setStoryNodes(storyNodesResp.data))
            })
    }

    const fullWidth = width - 20
    const fullHeight = height - 20

    const gridHeight = fullHeight - TOOLBAR_HEIGHT
    
    const numCols = Math.floor(fullWidth / 121)
    const numRows = Math.floor(gridHeight / 43)


    return (
        <Container>
            <Toolbar />
            <Grid
                // width={850}
                // height={650}
                // numCols={7}
                // numRows={15}
                width={fullWidth}
                height={gridHeight}
                numCols={numCols}
                numRows={numRows}
            />
        </Container>
    )
}

export default StoryBuilder