import React from 'react'
import styled from 'styled-components'

const Paragraphs = ({ paragraphs }) => (
    paragraphs.length > 0 && paragraphs.map(paragraph => (
        <div>{paragraph.content}</div>
    ))
)

export default Paragraphs