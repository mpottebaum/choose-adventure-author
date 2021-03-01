import React from 'react'
import { useSelector } from 'react-redux'
import { lineCoordinatesFactory } from '../../../helpers/svgHelpers'
import { extractChoices } from '../../../helpers/storeHelpers'

import Line from './Line'

const LinesLayer = ({
    cellWidth,
    cellHeight,
    rows,
    columns,
}) => {

    const storyNodes = useSelector(state => state.storyNodes)
    const choices = extractChoices(storyNodes)

    const getLinePositionCoordinates = lineCoordinatesFactory(columns, rows, cellWidth, cellHeight)

    // console.log('whole line in view', getLinePositionCoordinates({grid_x: 0, grid_y: -7}, {grid_x: 1, grid_y: 6}))
    // console.log(`expected: x1: ${3.5 * cellWidth} y1: ${14 * cellHeight} x2: ${4.5 * cellWidth} y2: ${2 * cellHeight}`)
    // console.log('line starts in view', getLinePositionCoordinates({grid_x: -2, grid_y: -2}, {grid_x: -8, grid_y: 0}))
    // console.log(`expected: x1: ${1.5 * cellWidth} y1: ${9 * cellHeight} x2: ${0 * cellWidth} y2: ${7.25 * cellHeight}`)
    // console.log('line starts out of view', getLinePositionCoordinates({grid_x: 8, grid_y: 0}, {grid_x: 0, grid_y: 3}))
    // console.log(`expected: x1: ${7 * cellWidth} y1: ${(53 / 6) * cellHeight} x2: ${3.5 * cellWidth} y2: ${4 * cellHeight}`)
    // console.log('nodes out of view, lines in view', getLinePositionCoordinates({grid_x: -4, grid_y: -1}, {grid_x: 4, grid_y: 5}))
    // console.log(`expected: x1: ${0 * cellWidth} y1: ${(123 / 16) * cellHeight} x2: ${7 * cellWidth} y2: ${(53 / 16) * cellHeight}`)
    // console.log('line out of view', getLinePositionCoordinates({grid_x: 5, grid_y: -7}, {grid_x: 7, grid_y: 5}))

    const renderToNodeLines = () => {
        const firstNodes = storyNodes.filter(node => !!node.next_node_id)
        const firstNodesAndChoices = [
            ...firstNodes,
            ...choices,
        ]
        return firstNodesAndChoices.map(firstCell => {
            const nextNode = storyNodes.find(node => node.id === firstCell.next_node_id)

            if(!nextNode) return null
            
            const { x1, y1, x2, y2 } = getLinePositionCoordinates(firstCell, nextNode)
            if(!x1 || !y1 || !x2 || !y2) return null
            return (
                <Line
                    key={`x1${x1}y1${y1}x2${x2}y2${y2}`}
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
            return (
                <>
                    {
                        node.choices.map(choice => {
                            const { x1, y1, x2, y2 } = getLinePositionCoordinates(node, choice)
                            if(!x1 || !y1 || !x2 || !y2) return null
                            return (
                                <Line
                                    key={`x1${x1}y1${y1}x2${x2}y2${y2}`}
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