import React from 'react'
import styled from 'styled-components'
import { fontSizes } from '../constants/theme'

const Input = styled.textarea`
    font-size: ${fontSizes.content}px;
`

const ContentInput = ({
    paragraphs,
    onParagraphsChange,
}) => {
    const lineBreak = '\n\n'

    const value = paragraphs.map(p => p.content).join(lineBreak)

    const convertValueToParagraphs = newValue => {
        const updatedParagraphContents = newValue.split(lineBreak)
        return paragraphs.map((p, i) => ({
            ...p,
            content: updatedParagraphContents[i]
        }))
    }

    const onChange = e => {
        const updatedParagraphs = convertValueToParagraphs(e.target.value)
        onParagraphsChange(updatedParagraphs)
    }

    const onKeyDown = e => {
        if(e.key === 'Enter') {
            console.log(e.target.selectionStart)
            const updatedValue = e.target.value.slice(0, e.target.selectionStart) + lineBreak + e.target.value.slice(e.target.selectionStart)
            const updatedParagraphs = convertValueToParagraphs(updatedValue)
            onParagraphsChange(updatedParagraphs)
        }
    }
    
    return (
        <Input
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    )
}

export default ContentInput