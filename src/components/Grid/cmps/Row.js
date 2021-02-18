import React from 'react'

import Cell from './Cell'


const Row = ({
    cellWidth,
    cellHeight,
    rowNodes,
    row,
    columns,

}) => {

    const renderCells = () => {
        return columns.map(column => {
            const storyNode = rowNodes.find(node => node.grid_x === column.coordinateNum)
            return (
                <Cell
                    key={`${row.rowNum}${column.colNum}`}
                    gridY={row.coordinateNum}
                    gridX={column.coordinateNum}
                    svgX={(column.colNum - 1) * cellWidth}
                    svgY={(row.rowNum - 1) * cellHeight}
                    width={cellWidth}
                    height={cellHeight}
                    stroke="black"
                    strokeWidth={1}
                    textSize={cellHeight / 3}
                    storyNode={storyNode}



                />
            )
        })
    }

    return renderCells()
    
}

export default Row