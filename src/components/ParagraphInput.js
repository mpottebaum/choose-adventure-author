import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { fontSizes } from '../constants/theme'

const Input = styled.textarea`
    font-size: ${fontSizes.content}px;
    border: none;
    outline: none;
    resize: none;
    width: 100%;
`

const ParagraphInput = ({
    onChange,
    value,
    name,
}) => {

    const inputRef = useRef(null)

    const resizeInputHeight = () => {
        inputRef.current.style.height = '1px'
        const scrollHeight = inputRef.current.scrollHeight
        inputRef.current.style.height = `${scrollHeight}px`
    }
    
    useEffect(() => {
        inputRef.current.focus()
        resizeInputHeight()
    }, [])

    const onChangeWithResizeHeight = e => {
        onChange(e)
        resizeInputHeight()
    }

    return (
        <Input
            onChange={onChangeWithResizeHeight}
            value={value}
            name={name}
            ref={inputRef}
        />
    )
}

export default ParagraphInput