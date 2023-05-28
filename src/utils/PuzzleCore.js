import {uuidv4} from './uuid.js'

export default class PuzzleCore {
    constructor({size, id}) {
        this.size = this.getSizeSqrt(size || 9)
        this.id = id || `puzzle_${uuidv4()}`
        this.cells = []
        this.moves = 0
        this.generateGrid()
    }

    generateGrid() {
        this.cells = Array(this.size * this.size).fill().map((x, i) => (i === 0) ? -1 : i)
        this.shuffle()
    }


    getSizeSqrt(size) {
        const sqrtValue = Math.round(Math.sqrt(size))
        return Math.min(sqrtValue, 30)
    }

    shuffle() {
        let arr = this.cells
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arr [i];
            arr [i] = arr [j];
            arr [j] = temp;
        }
        this.cells = arr
        return this.cells
    }

    reset() {
        this.shuffle()
        this.moves = 0
    }

    solved() {
        this.cells = this.SolvedCells
        /*setTimeout(() => {
            this.checkValidation()
        }, 1000)*/
    }

    move(cell, index) {
        // target is clicked (no action)
        if (cell === -1) return

        // check selected cell is target's sibling
        const direction = this.getCellDirection(cell)
        if (!direction) return // no action

        const {row, col} = this.findCellByValue(cell)

        let targetIndex = 0
        let clickedCellIndex = (row * this.size) + col
        switch (direction) {
            case 'left':
                targetIndex = (row * this.size) + col - 1
                break;
            case 'right':
                targetIndex = (row * this.size) + col + 1
                break;
            case 'up':
                targetIndex = ((row - 1) * this.size) + col
                break;
            case 'down':
                targetIndex = ((row + 1) * this.size) + col
                break;
        }
        this.cells[targetIndex] = cell
        this.cells[clickedCellIndex] = -1
        this.moves += 1
        /*setTimeout(() => {
            this.checkValidation()
        }, 1000)*/
    }

    findCellSibling(row, col) {
        const up = this.getGridItems[row - 1]?.[col]
        const down = this.getGridItems[row + 1]?.[col]
        const left = this.getGridItems[row]?.[col - 1]
        const right = this.getGridItems[row]?.[col + 1]

        return {
            up,
            down,
            left,
            right
        }
    }

    getCellDirection(cellValue) {
        const {row, col} = this.findCellByValue(cellValue)
        const {left, down, up, right} = this.findCellSibling(row, col)
        if (left === -1) return 'left'
        if (right === -1) return 'right'
        if (up === -1) return 'up'
        if (down === -1) return 'down'

        return null
    }

    findTarget() {
        return this.findCellByValue(-1)
    }

    findCellByValue(cellValue) {
        // let grid = []
        let cellRow = 0
        let cellCol = 0
        for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
            let row = []
            // rowIndex: 1 * 3
            for (let colIndex = 0; colIndex < this.size; colIndex++) {
                // colIndex: 0
                const currentValue = this.cells[(rowIndex * this.size) + colIndex]
                if (currentValue === cellValue) {
                    cellRow = rowIndex
                    cellCol = colIndex
                }
                // row.push()
            }
            // grid.push(row)
        }
        return {
            row: cellRow,
            col: cellCol
        }
    }


    checkValidation() {
        if (this.isSolved) {

        } else {
            console.log('not solved.')
        }
    }

    get getId() {
        return this.id
    }

    get getSize() {
        return this.size
    }

    get SolvedCells() {
        const totalCells = this.size * this.size
        return Array(totalCells).fill(null).map((x, i) => i === totalCells - 1 ? -1 : i + 1)
    }

    get isSolved() {
        const totalCells = this.size * this.size
        const solvedValues = this.SolvedCells
        const userValues = this.cells
        for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
            // console.log('cellIndex', cellIndex)
            // console.log('solvedValues[cellIndex]', solvedValues[cellIndex])
            // console.log('userValues[cellIndex]', userValues[cellIndex])
            if (solvedValues[cellIndex] !== userValues[cellIndex]) {
                return false
            }
        }
        return true
    }

    get getFlatItems() {
        return this.cells
    }

    get getGridItems() {
        let grid = []
        for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
            let row = []
            for (let colIndex = 0; colIndex < this.size; colIndex++) {
                row.push(this.cells[(rowIndex * this.size) + colIndex])
            }
            grid.push(row)
        }
        return grid
    }
}