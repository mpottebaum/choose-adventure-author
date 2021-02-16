import React from 'react'

import Cell from './Cell'


const Row = ({
    cellWidth,
    cellHeight,
    rowNum,
    xCells,
    rowNodes,
    gridViewCenterX,
}) => {

    const renderCells = () => {
        const colNums = [...Array(xCells).keys()].map(i => i + 1)
        const colCenter = Math.ceil(xCells / 2)
        return colNums.map(colNum => {
            const colGridX = (colNum - colCenter) + gridViewCenterX
            // console.log("colGridX", colGridX)
            const storyNode = rowNodes.find(node => node.grid_x === colGridX)
            return (
                <Cell
                    key={`${rowNum}${colNum}`}
                    rowNum={rowNum}
                    colNum={colNum}
                    x={(colNum - 1) * cellWidth}
                    y={(rowNum - 1) * cellHeight}
                    width={cellWidth}
                    height={cellHeight}
                    stroke="black"
                    fill={"white"}
                    strokeWidth={1}
                    textSize={15}
                    storyNode={storyNode}
                />
            )
        })
    }

    return renderCells()
    
}

export default Row