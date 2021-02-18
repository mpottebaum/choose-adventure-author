import React from 'react'

import RowsLayer from './cmps/RowsLayer'
import LinesLayer from './cmps/LinesLayer'

const Grid = ({
    storyNodes,
    gridViewCenter,
    width,
    height,
    xCells,
    yCells,
}) => {

    const extractChoices = () => (
        storyNodes.reduce(
                (choicesArray, node) => [ ...choicesArray, ...node.choices ],
                []
            )
    )
    
    const createRows = () => {
        const rowNums = [...Array(yCells).keys()].map(i => i + 1)
        const centerRowNum = Math.ceil(yCells / 2)
        return rowNums.map(rowNum => ({
            rowNum,
            coordinateNum: ((rowNum - centerRowNum) * -1) + gridViewCenter.y
        })) 
    }


    const createColumns = () => {
        const colNums = [...Array(xCells).keys()].map(i => i + 1)
        const centerColNum = Math.ceil(xCells / 2)
        return colNums.map(colNum => ({
            colNum,
            coordinateNum: (colNum - centerColNum) + gridViewCenter.x
        }))
    }

    const cellHeight = height / yCells
    const cellWidth = width / xCells
    const rows = createRows()
    const columns = createColumns()

    const choices = extractChoices()

    return <svg
        version="1.1"
        baseProfile="full"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
    >
        <LinesLayer
            cellHeight={cellHeight}
            cellWidth={cellWidth}
            rows={rows}
            columns={columns}
            storyNodes={storyNodes}
            choices={choices}
        />
        <RowsLayer
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            rows={rows}
            columns={columns}
            storyNodes={storyNodes}
            choices={choices}
        />
    </svg>
}

export default Grid