import React from 'react'

import Header from '../../Header'
import Button from '../../Button'

const Story = ({
    story,
    onViewClick,
    onDelClick,
}) => (
    <li
    >
        <Header>{story.title}</Header>
        <p>{story.desc}</p>
        <Button
            onClick={onViewClick}
        >
            View
        </Button>
        <Button
            onClick={onDelClick}
        >
            Delete
        </Button>
    </li>
)

export default Story