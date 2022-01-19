import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5 , ncols = 5 , chanceLightStartsOn = .6}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const randBoolean = () => Math.random() <= chanceLightStartsOn
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let y = 0; y < ncols; y ++){
      initialBoard.push(new Array(nrows).fill(null))
    };
    return initialBoard.map(row => {
      return row.map(el => { 
        return randBoolean();
      })
    })
  }

  console.log(board)


  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return !board.map(row => row.includes(false)).includes(true)
  }

  console.log(hasWon())

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
       const newBoard = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x, newBoard )
      flipCell(y,x-1, newBoard )
      flipCell(y,x+1, newBoard )
      flipCell(y-1,x, newBoard )
      flipCell(y+1,x, newBoard )
      

      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()){
    return (
      <div>
        <p>Congradulations! You have won the game!
        </p>
      </div>
    )
  }

  // make table board
  return (
    <table>
      {board.map((row, y)=> {
        return (
          <tr>
            {row.map((cell, x)=> (
          <Cell flipCellsAroundMe={()=>flipCellsAround(`${y}-${x}`)} isLit={cell} />
        ))}
          </tr>
      )})}
    </table>
  )

  // TODO
}

export default Board;
