import React from 'react'
import { useSelector } from 'react-redux'

import RowsLayer from './cmps/RowsLayer'
import LinesLayer from './cmps/LinesLayer'

const Grid = ({
    width,
    height,
    numCols,
    numRows,
}) => {

    const gridViewCenter = useSelector(state => state.gridViewCenter)
    
    const createRows = () => {
        const rowNums = [...Array(numRows).keys()].map(i => i + 1)
        const centerRowNum = Math.ceil(numRows / 2)
        return rowNums.map(rowNum => ({
            rowNum,
            coordinateNum: ((rowNum - centerRowNum) * -1) + gridViewCenter.y
        })) 
    }


    const createColumns = () => {
        const colNums = [...Array(numCols).keys()].map(i => i + 1)
        const centerColNum = Math.ceil(numCols / 2)
        return colNums.map(colNum => ({
            colNum,
            coordinateNum: (colNum - centerColNum) + gridViewCenter.x
        }))
    }

    const cellHeight = height / numRows
    const cellWidth = width / numCols
    const rows = createRows()
    const columns = createColumns()

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
        />
        <RowsLayer
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            rows={rows}
            columns={columns}
        />
    </svg>
}

export default Grid