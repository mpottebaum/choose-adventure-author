import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Toolbar from '../components/Toolbar'
import Grid from '../components/Grid'

const Container = styled.div`
    height: 50vh;
`

const StoryBuilder = () => {

    const [ storyNodes, setStoryNodes ] = useState(null)
    const [ gridViewCenter, setGridViewCenter] = useState({
        x: 0,
        y: 0
    })

    useEffect(() => {
        getStory()
    }, [])

    const getStory = async () => {
        axios('http://localhost:3000/story-nodes?story_id=1')
            .then(storyNodesResp => setStoryNodes(storyNodesResp.data))
    }

    return <Container>
        <Grid
            storyNodes={storyNodes}
            gridViewCenter={gridViewCenter}
            width={850}
            height={650}
            xCells={19}
            yCells={29}
        />
        <Toolbar />
    </Container>
}

export default StoryBuilder