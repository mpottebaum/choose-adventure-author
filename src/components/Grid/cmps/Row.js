import React from 'react'
import styled from 'styled-components'

import Cell from './Cell'

const Container = styled.div`
    display: flex;
`

const Row = ({ cells }) => (
    <Container>
        {
            cells.map(cell => (
                <Cell cell={cell} />
            ))
        }
    </Container>
    
)

export default Row