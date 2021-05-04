import React from 'react'

import FlexBox from '../FlexBox'
import Story from './cmps/Story'

const Stories = ({ stories, onStoryClick }) => (
    <FlexBox
        flexDirection='column'
        alignItems='center'
    >
        <ul>
            {stories.map(story => (
                <Story
                    key={story.id}
                    story={story}
                    onClick={() => onStoryClick(story.id)}
                />
            ))}
        </ul>
    </FlexBox>
)

export default Stories