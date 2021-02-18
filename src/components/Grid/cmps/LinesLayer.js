import React from 'react'

import Line from './Line'

const LinesLayer = ({
    cellWidth,
    cellHeight,
    rows,
    columns,
    storyNodes,
}) => {

    const getLinePositionCoordinates = ( node, isNextNode=false) => {
        const column = columns.find(col => col.coordinateNum === node.grid_x)
        const x = ((column.colNum - 1) * cellWidth) + (cellWidth / 2)
        const row = rows.find(row => row.coordinateNum === node.grid_y)
        const rowNum = isNextNode ? row.rowNum : row.rowNum - 1
        const y = (rowNum * cellHeight)
        return {
            x,
            y,
        }
    }

    const renderLines = () => {
        const firstNodes = storyNodes.filter(node => !!node.next_node_id)
        return firstNodes.map(firstNode => {
            const { x: x1, y: y1 } = getLinePositionCoordinates(firstNode)
            const nextNode = storyNodes.find(node => node.id === firstNode.next_node_id)
            
            if(!nextNode) return null

            const { x: x2, y: y2 } = getLinePositionCoordinates(nextNode, true)
            return (
                <Line
                    key={`${x1}${y1}${x2}${y2}`}
                    x1={x1}
                    x2={x2}
                    y1={y1}
                    y2={y2}
                    stroke={'red'}
                    strokeWidth={3}
                />
            )
        })
    }

    return (
        <g>
            {renderLines()}
        </g>
    )
}

export default LinesLayer