import React from 'react'

import Cell from './Cell'


const Row = ({
    cellWidth,
    cellHeight,
    rowNum,
    xCells,
    storyNodes,
}) => {

    const renderCells = () => {
        const colNums = [...Array(xCells).keys()].map(i => i)
        return colNums.map(colNum => (
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
                text={""}
            />
        ))
    }

    return renderCells()
    
}

export default Row