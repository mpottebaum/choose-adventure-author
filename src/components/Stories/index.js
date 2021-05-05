import React from 'react'

import FlexBox from '../FlexBox'
import Story from './cmps/Story'

const Stories = ({
    stories,
    onViewClick,
    onDelClick,
}) => (
    <FlexBox
        flexDirection='column'
        alignItems='center'
    >
        <ul>
            {stories.map(story => (
                <Story
                    key={story.id}
                    story={story}
                    onViewClick={() => onViewClick(story.id)}
                    onDelClick={() => onDelClick(story.id)}
                />
            ))}
        </ul>
    </FlexBox>
)

export default Stories