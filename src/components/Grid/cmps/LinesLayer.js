import React from 'react'
import { useSelector } from 'react-redux'

import Line from './Line'

const LinesLayer = ({
    cellWidth,
    cellHeight,
    rows,
    columns,
}) => {

    const storyNodes = useSelector(state => state.storyNodes)
    const choices = useSelector(state => state.choices)

    const getLinePositionCoordinates = ( node, isNextNode=false) => {
        const column = columns.find(col => col.coordinateNum === node.grid_x)
        if(!column) return { x: null, y: null }
        const x = ((column.colNum - 1) * cellWidth) + (cellWidth / 2)
        const row = rows.find(row => row.coordinateNum === node.grid_y)
        if(!row) return { x: null, y: null }
        const rowNum = isNextNode ? row.rowNum : row.rowNum - 1
        const y = (rowNum * cellHeight)
        return {
            x,
            y,
        }
    }

    const renderToNodeLines = () => {
        const firstNodes = storyNodes.filter(node => !!node.next_node_id)
        const firstNodesAndChoices = [
            ...firstNodes,
            ...choices,
        ]
        return firstNodesAndChoices.map(firstCell => {
            const { x: x1, y: y1 } = getLinePositionCoordinates(firstCell)
            const nextNode = storyNodes.find(node => node.id === firstCell.next_node_id)
            
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

    const renderToChoiceLines = () => {
        const storyNodesWithChoices = storyNodes.filter(node => node.choices.length > 0)
        return storyNodesWithChoices.map(node => {
            const { x: x1, y: y1 } = getLinePositionCoordinates(node)
            return (
                <>
                    {
                        node.choices.map(choice => {
                            const { x: x2, y: y2 } = getLinePositionCoordinates(choice, true)
                            return (
                                <Line
                                    key={`${x1}${y1}${x2}${y2}`}
                                    x1={x1}
                                    x2={x2}
                                    y1={y1}
                                    y2={y2}
                                    stroke={'blue'}
                                    strokeWidth={3}
                                />
                            )
                        })
                    }
                </>
            )
        })
    }

    return (
        <g>
            {renderToNodeLines()}
            {renderToChoiceLines()}
        </g>
    )
}

export default LinesLayer