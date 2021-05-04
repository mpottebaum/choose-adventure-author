import React from 'react'
import Header from '../../Header'

const Story = ({ story, onClick }) => (
    <li
        onClick={onClick}
    >
        <Header>{story.title}</Header>
        <p>{story.desc}</p>
    </li>
)

export default Story