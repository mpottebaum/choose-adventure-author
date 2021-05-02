import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { fontSizes } from '../constants/theme'

const Input = styled.textarea`
    font-size: ${fontSizes.content}px;
`

const ParagraphInput = ({
    onChange,
    value,
    name,
}) => {

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <Input
            onChange={onChange}
            value={value}
            name={name}
            ref={inputRef}
        />
    )
}

export default ParagraphInput