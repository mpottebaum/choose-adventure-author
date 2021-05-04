import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getStoriesApi } from '../constants/apiRoutes'
import { useHistory } from 'react-router-dom'
import routePaths from '../router/routePaths'

import Stories from '../components/Stories'

const Dashboard = () => {

    const history = useHistory()
    const [ stories, setStories ] = useState([])

    useEffect(() => {
        axios(getStoriesApi(1))
            .then(storiesResp => {
                setStories(storiesResp.data)
            })
    })

    const onStoryClick = id => history.push(routePaths.StoryBuilder.replace(':id', id))

    return (
        <Stories
            stories={stories}
            onStoryClick={onStoryClick}
        />
    )
}

export default Dashboard