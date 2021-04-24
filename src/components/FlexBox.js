import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: ${({flexDirection}) => flexDirection || 'row'};
    justify-content: ${({justifyContent}) => justifyContent || 'flex-start'};
    flex-direction: ${({alignItems}) => alignItems || 'flex-start'};
`

const FlexBox = ({
    children,
    flexDirection,
    justifyContent,
    alignItems,
}) => (
    <Container
        flexDirection={flexDirection}
        justifyContent={justifyContent}
        alignItems={alignItems}
    >
        {children}
    </Container>
)

export default FlexBox