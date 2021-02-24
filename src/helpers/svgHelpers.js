// wrapText was created to wrap text within the
// svg grid cells

export const wrapText = (text, charLimit) => {
    const wrapObj = {
        firstLine: '',
        lastIndexFirstLine: -1,
        secondLine: '',
        lastIndexSecondLine: -1,
    }
    if(text.length <= charLimit) {
        return {
            ...wrapObj,
            firstLine: text,
        }
    }
    const isNextWord = (index, lastIndex) => ( index === ( lastIndex + 1 ) ) || ( lastIndex === -1 )
    const willFit = (charCount, charMax) => charCount <= charMax
    return text.split(' ').reduce(
        ( obj, word, i ) => {
            const newFirstLineCount = obj.firstLine.length + word.length + 1
            if(isNextWord(i, obj.lastIndexFirstLine) && willFit(newFirstLineCount, charLimit)) {
                return {
                    ...obj,
                    firstLine: obj.firstLine.length === 0 ? word : obj.firstLine + ' ' + word,
                    lastIndexFirstLine: i,
                }
            }
            const newSecondLineCount = obj.secondLine.length + word.length + 1
            if(isNextWord(i, obj.lastIndexSecondLine) && willFit(newSecondLineCount, charLimit)) {
                return {
                    ...obj,
                    secondLine: obj.secondLine.length === 0 ? word : obj.secondLine + ' ' + word,
                    lastIndexSecondLine: i,
                }
            }
            if(isNextWord(i, obj.lastIndexSecondLine) && willFit(obj.secondLine.length, charLimit - 1)) {
                const secondLinePlusWord = obj.secondLine + word
                const slicedSecondLine = secondLinePlusWord.slice(0, 14)
                return {
                    ...obj,
                    secondLine: slicedSecondLine + '...',
                    lastIndexSecondLine: i,
                }
            }
            return obj
        }, wrapObj)

}


// slopeAndInterceptOfThruLine essentially
// creates the y = mx+b equation for a line
// between two points on the SVG grid
// used in lineCoordinatesFactory below

const slopeAndInterceptOfThruLine = (startSvgX, startSvgY, endSvgX, endSvgY) => {
    const slope = (endSvgY - startSvgY) / (endSvgX - startSvgX)
    const yIntercept = startSvgY - (slope * startSvgX)
    return {
        slope,
        yIntercept,
    }
}


// visibleGridHelpers finds the min/max row and column
// objects and creates functions to determine the point
// on the cross-section lines (diagonal lines starting at
// corners and crossing in the center of the grid)

const visibleGridHelpers = (columns, rows, cellWidth, cellHeight) => {
    const minVisibleRow = rows.reduce((minRow, row) => row.rowNum < minRow.rowNum ? row : minRow)
    const maxVisibleRow = rows.reduce((maxRow, row) => row.rowNum > maxRow.rowNum ? row : maxRow)
    const minVisibleCol = columns.reduce((minCol, col) => col.colNum < minCol.colNum ? col : minCol)
    const maxVisibleCol = columns.reduce((maxCol, col) => col.colNum > maxCol.colNum? col : maxCol)

    const yOfPositiveCrossSection = x => {
        const { slope, yIntercept} = slopeAndInterceptOfThruLine(
            minVisibleCol.colNum * cellWidth,
            minVisibleRow.rowNum * cellHeight,
            (maxVisibleCol.colNum + 1) * cellWidth,
            (maxVisibleRow.rowNum + 1) * cellHeight,
        )
        return (slope * x) + yIntercept
    }


    const yOfNegativeCrossSection = x => {
        const { slope, yIntercept} = slopeAndInterceptOfThruLine(
            minVisibleCol.colNum * cellWidth,
            (maxVisibleRow.rowNum + 1) * cellHeight,
            (maxVisibleCol.colNum + 1) * cellWidth,
            minVisibleRow.rowNum * cellHeight,
        )
        return (slope * x) + yIntercept
    }

    return {
        minVisibleRow,
        maxVisibleRow,
        minVisibleCol,
        maxVisibleCol,
        yOfPositiveCrossSection,
        yOfNegativeCrossSection,
    }

}

// lineCoordinatesFactory was created
// to calculate SVG line coordinate values
// and adjust the values if the line terminates
// outside of the visible grid
export const lineCoordinatesFactory = (columns, rows, cellWidth, cellHeight) => {
    // cross-sections are the lines forming an X
    // at the center of the grid and extending thru
    // the corners
    // these are used to determine which side of the grid
    // a line (that ends out of view) will terminate at

    // obtain min/max rows and columns
    // in visible grid
    const {
        minVisibleRow,
        maxVisibleRow,
        minVisibleCol,
        maxVisibleCol,
        yOfPositiveCrossSection,
        yOfNegativeCrossSection,
    } = visibleGridHelpers(columns, rows, cellWidth, cellHeight)

    // is the svg coordinate valid (within the svg size)
    const isVisible = (svgCoordinate, maxSvgCoordinate) => (svgCoordinate > 0) && (svgCoordinate < maxSvgCoordinate)

    // convert grid coordinates 
    const getSvgY = gridY => (minVisibleRow.coordinateNum - gridY) * cellHeight
    const getSvgX = gridX =>(gridX - minVisibleCol.coordinateNum + 0.5) * cellWidth

    // adjust svg coordinates if line terminus is outside
    // of the visible grid
    const redefineLineCoordinates = (svgX, svgY, slope, yIntercept) => {
        let x
        let y
        if(isVisible(svgY, rows.length * cellHeight) && isVisible(svgX, columns.length * cellWidth)) {
            x = svgX
            y = svgY
        } else {
            const positiveDiff = svgY - yOfPositiveCrossSection(svgX)
            const negativeDiff = svgY - yOfNegativeCrossSection(svgX)
            if(positiveDiff > 0 && negativeDiff > 0) {
                y = (maxVisibleRow.rowNum + 1)  * cellHeight
                x = (y - yIntercept) / slope
            }
            else if(positiveDiff < 0 && negativeDiff < 0) {
                y = minVisibleRow.rowNum * cellHeight
                x = (y - yIntercept) / slope
            }
            else if(positiveDiff < 0 && negativeDiff > 0) {
                x = (maxVisibleCol.colNum + 1) * cellWidth
                y = (x * slope) + yIntercept
            }
            else if(positiveDiff > 0 && negativeDiff < 0) {
                x = minVisibleCol.colNum * cellWidth
                y = (x * slope) + yIntercept
            }
        }

        // added b/c line won't display if any value is 0
        if(x === 0) x = 1
        if(y === 0) y = 1
        return {
            x,
            y,
        }
    }

    const generateLineCoordinates = (startCellSvgX, startCellSvgY, endCellSvgX, endCellSvgY) => {
        const { slope, yIntercept } = slopeAndInterceptOfThruLine(startCellSvgX, startCellSvgY, endCellSvgX, endCellSvgY)
        const { x: x1, y: y1 } = redefineLineCoordinates(startCellSvgX, startCellSvgY, slope, yIntercept)
        const { x: x2, y: y2 } = redefineLineCoordinates(endCellSvgX, endCellSvgY, slope, yIntercept)

        return {
            x1,
            y1,
            x2,
            y2,
        }
    }

    const getLinePositionCoordinates = (startCell, endCell) => {

        const startCellSvgY = getSvgY(startCell.grid_y)
        const startCellSvgX = getSvgX(startCell.grid_x)

        const endCellSvgY = getSvgY(endCell.grid_y - 1)
        const endCellSvgX = getSvgX(endCell.grid_x)

        return generateLineCoordinates(startCellSvgX, startCellSvgY, endCellSvgX, endCellSvgY)
    }
    
    return getLinePositionCoordinates
}