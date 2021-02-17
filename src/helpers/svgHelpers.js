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