import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    getStoriesApi,
    deleteStoryApi
} from '../constants/apiRoutes'
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
    }, [])

    const onViewClick = id => history.push(routePaths.StoryBuilder.replace(':id', id))

    const onDelClick = id => {
        setStories(
            stories.filter(story => story.id !== id)
        )
        axios({
            method: 'DELETE',
            url: deleteStoryApi(id)
        })
        .then(deleteResp => console.log(deleteResp.data))
    }

    return (
        <Stories
            stories={stories}
            onViewClick={onViewClick}
            onDelClick={onDelClick}
        />
    )
}

export default Dashboard