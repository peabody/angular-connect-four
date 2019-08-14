import { Component } from '@angular/core';

function startBoard(): string[][] {
    return [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],                    
  ]
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'connectFour';
  board: string[][] = startBoard()

  colors = ['Red', 'Yellow']
  currentColor = 0
  gameOver = false
  winMsg = ''
  winningCoordinates: number[][] = []

  onClick(cell: any) {
    if (!this.gameOver) {
      let i = cell.parentElement.rowIndex
      let j = cell.cellIndex
      if (this.board[i][j] === null) {
        this.board[i][j] = this.switchColor()
        this.movePiece()
        this.checkWin()
      }
    }
  }

  movePiece() {
    for (let i=0; i<this.board.length; i++) {
      for (let j=0; j<this.board[i].length; j++) {
        try {
          if (this.board[i+1][j] === null) {
            this.board[i+1][j] = this.board[i][j]
            this.board[i][j] = null
          }  
        } catch(err) {
          if (!(err instanceof TypeError))
            console.error(err)
        }
      }
    }
  }

  resetBoard() {
    this.board = startBoard()
    this.gameOver = false
    this.winMsg = ''
    this.winningCoordinates = []
  }

  checkWin() {
    for (let i=0; i<this.board.length; i++) {
      for (let j=0; j<this.board[i].length; j++) {
        let winningColor: any = this.findFour(i,j)
        if (winningColor) {
          this.gameOver = true
          this.winMsg = `${winningColor} wins!`
          this.colorWinningCoordinates()
          return
        }
      }
    }
  }

  findFour(i: number, j: number) {
    let checkColor = this.board[i][j]
    this.winningCoordinates = []

    // check up down
    let upDownCount = 0

    // up loop
    for (let i_check=-1; i_check<-4; i_check--) {
      try {
        if (this.board[i + i_check][j] === checkColor) {
          this.winningCoordinates.push([i + i_check, j])
          upDownCount++
        } else {
          break;
        }
      } catch (err) {
        if (!(err instanceof TypeError)) {
          console.error(err)
        }
        break;
      }
    }

    // down loop
    for (let i_check=1; i_check<4; i_check++) {
      try {
        if (this.board[i + i_check][j] === checkColor) {
          this.winningCoordinates.push([i + i_check, j])          
          upDownCount++
        } else {
          break;
        }
      } catch (err) {
        if (!(err instanceof TypeError)) {
          console.error(err)
        }
        break;
      }
    }    

    if (upDownCount+1 === 4) {
      this.winningCoordinates.push([i,j])
      return checkColor;
    }


    // check right left
    let rightLeftCount = 0
    this.winningCoordinates = []

    // left loop
    for (let j_check=-1; j_check<-4; j_check--) {
      try {
        if (this.board[i][j + j_check] === checkColor) {
          this.winningCoordinates.push([i, j + j_check])                    
          rightLeftCount++
        } else {
          break;
        }
      } catch (err) {
        if (!(err instanceof TypeError)) {
          console.error(err)
        }
        break;
      }
    }
    
    // right loop
    for (let j_check=1; j_check<4; j_check++) {
      try {
        if (this.board[i][j + j_check] === checkColor) {
          this.winningCoordinates.push([i, j + j_check])                              
          rightLeftCount++
        } else {
          break;
        }
      } catch (err) {
        if (!(err instanceof TypeError)) {
          console.error(err)
        }
        break;
      }
    }

    if (rightLeftCount+1 === 4) {
      this.winningCoordinates.push([i,j])
      return checkColor
    }

    // check diagonal left
    let diagonalLeftCount = 0
    this.winningCoordinates = []

    // up left loop
    for (let ij_check=-1; ij_check<-4; ij_check--) {
      try {
        if (this.board[i + ij_check][j + ij_check] === checkColor) {
          this.winningCoordinates.push([i + ij_check, j + ij_check])                              
          diagonalLeftCount++
        } else {
          break;
        }
      } catch (err) {
        if (!(err instanceof TypeError)) {
          console.error(err)
        }
        break;
      }
    }

    // down right loop
    for (let ij_check=1; ij_check<4; ij_check++) {
      try {
        if (this.board[i + ij_check][j + ij_check] === checkColor) {
          this.winningCoordinates.push([i + ij_check, j + ij_check])                                        
          diagonalLeftCount++
        } else {
          break;
        }
      } catch (err) {
        if (!(err instanceof TypeError)) {
          console.error(err)
        }
        break;
      }
    }

    if (diagonalLeftCount+1 === 4) {
      this.winningCoordinates.push([i,j])
      return checkColor
    }

    // check right diagonal
    let diagonalRightCount = 0
    this.winningCoordinates = []

    // up right loop
    for (let ij_check=1; ij_check<4; ij_check++) {
      try {
        if (this.board[i - ij_check][j + ij_check] === checkColor) {
          this.winningCoordinates.push([i - ij_check, j + ij_check])                                        
          diagonalRightCount++
        } else {
          break;
        }
      } catch (err) {
        if (!(err instanceof TypeError)) {
          console.error(err)
        }
        break;
      }
    }

    // down left loop
    for (let ij_check=1; ij_check<4; ij_check++) {
      try {
        if (this.board[i + ij_check][j - ij_check] === checkColor) {
          this.winningCoordinates.push([i + ij_check, j - ij_check])                                        
          diagonalRightCount++
        } else {
          break;
        }
      } catch (err) {
        if (!(err instanceof TypeError)) {
          console.error(err)
        }
        break;
      }
    }

    if (diagonalRightCount+1 === 4) {
      this.winningCoordinates.push([i,j])
      return checkColor
    }

    this.winningCoordinates = []
    return false
  }

  getColor() {
    return this.colors[this.currentColor % 2]
  }

  switchColor() {
    return this.colors[this.currentColor++ % 2]
  }

  move4me() {
    if (!this.gameOver) {
      let tryMove = true
      while (tryMove) {
        let i = 0
        let j = Math.floor(Math.random() * 6)
        tryMove = this.board[i][j] !== null
        if (!tryMove) {
          this.board[i][j] = this.getColor()
        }
      }
      this.movePiece()
      this.switchColor()
      this.checkWin()
    }
  }

  colorWinningCoordinates() {
    for (let val=0; val<this.winningCoordinates.length; val++) {
      let coord = this.winningCoordinates[val]
      this.board[coord[0]][coord[1]] = "Green"
    }
  }
}
