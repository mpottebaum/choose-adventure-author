import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Grid from '../components/Grid'

const StoryBuilder = () => {

    const [ story, setStory ] = useState(null)

    console.log('story', story)

    useEffect(() => {
        getStory()
    }, [])

    const getStory = async () => {
        axios('http://localhost:3000/stories/1')
            .then(storyResp => setStory(storyResp.data))
    }

    return <div>
        <Grid />
    </div>
}

export default StoryBuilder