import React from 'react'
import styled from 'styled-components'
import { fontSizes } from '../constants/theme'

const Container = styled.h1`
    font-size: ${({ fontSize }) => fontSize}px;
`

const Header = ({
    fontSize=fontSizes.head,
    children,
}) => (
    <Container
        fontSize={fontSize}
    >
        {children}
    </Container>
)

export default Header