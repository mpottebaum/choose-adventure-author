import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { fontSizes } from '../constants/theme'

const Input = styled.textarea`
    font-size: ${fontSizes.content}px;
    border: none;
    outline: none;
    resize: none;
    width: 100%;
    height: ${({ height }) => height}px;
`

const ParagraphInput = ({
    onChange,
    value,
    name,
}) => {

    const inputRef = useRef(null)

    const [ height, setHeight ] = useState(50)
    
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    useEffect(() => {
        if(inputRef.current) {
            setHeight(inputRef.current.scrollHeight)
        }
    }, [ value ])

    return (
        <Input
            onChange={onChange}
            value={value}
            name={name}
            ref={inputRef}
            height={height}
        />
    )
}

export default ParagraphInput