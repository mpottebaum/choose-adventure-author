import React from 'react'
import styled from 'styled-components'

const Container = styled.h1`
    font-size: ${({ fontSize }) => fontSize}px;
`

const Header = ({
    fontSize=35,
    children,
}) => (
    <Container
        fontSize={fontSize}
    >
        {children}
    </Container>
)

export default Header