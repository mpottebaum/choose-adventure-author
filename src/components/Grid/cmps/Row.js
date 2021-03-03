import React from 'react'

import Cell from './Cell'


const Row = ({
    cellWidth,
    cellHeight,
    rowNodes,
    rowChoices,
    row,
    columns,

}) => {

    const renderCells = () => {
        return columns.map(column => {
            const storyNode = rowNodes.find(node => node.grid_x === column.coordinateNum)
            const choice = rowChoices.find(choice => choice.grid_x === column.coordinateNum)
            return (
                <Cell
                    key={`${row.svgNum}${column.svgNum}`}
                    gridY={row.coordinateNum}
                    gridX={column.coordinateNum}
                    svgX={(column.svgNum) * cellWidth}
                    svgY={(row.svgNum) * cellHeight}
                    width={cellWidth}
                    height={cellHeight}
                    stroke="black"
                    strokeWidth={1}
                    textSize={cellHeight / 3}
                    storyNode={storyNode}
                    choice={choice}
                />
            )
        })
    }

    return renderCells()
    
}

export default Row