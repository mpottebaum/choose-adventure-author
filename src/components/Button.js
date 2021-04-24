import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants/theme'

const Container = styled.button`
    margin-left: ${({ marginLeft }) => marginLeft}px;
    margin-right: ${({ marginRight }) => marginRight}px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    padding: ${({ paddingVert }) => paddingVert}px ${({ paddingHoriz }) => paddingHoriz}px;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 600;
    color: ${({ fontColor }) => fontColor};
    border-style: none;
`

const Button = ({
    children,
    onClick,
    marginRight=0,
    marginLeft=0,
    backgroundColor=colors.gray,
    fontColor=colors.white,
    paddingVert=6,
    paddingHoriz=10,
}) => (
    <Container
        onClick={onClick}
        marginLeft={marginLeft}
        marginRight={marginRight}
        backgroundColor={backgroundColor}
        fontColor={fontColor}
        paddingVert={paddingVert}
        paddingHoriz={paddingHoriz}
    >
        {children}
    </Container>
)

export default Button