import { useState, useEffect } from "react";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] === squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  /**Why we removed the own state of square button because we putted the state to recognise the values in the button
   * so we can change them by the time but now it not required because our parent have some state each button
   * contribute to change that state so our squares are doing all changes now for their parent so there is no
   * point of maintainig one for them
   *
   * SUMMARY
   * tilll now we are thinking of each value of square as a changeable state which indeed works but it's hard to
   * maintain them and tell the react to first collect all the current state of squares then match them with one
   * that we put as winning condition
   * but now the collection was not needed as parent have a array which work as a state
   * =====
   * Means now the access is not private(embeded only with square)  its public so the collection is not our headache
   * we are calling square telling them to come and change the array(only their index values which assign to them)
   * this will help us to store the whole grid and check it
   */

  /**Remember the rule 3 of react so now when the button is clicked it intutively call the handleClick function in
   * parent which might do some task to change the state
   */
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function board() {
  const [xIsNext, setXIsNext] = useState(true); //this will check the variable xIsNext if true then print "X" otherwise print "O"
  const [squares, setSquares] = useState(Array(9).fill(null)); //creates an array with nine elements and sets each of them to null.
  //this intially look like [null,null,null,null,null,null,null,null,null,null]
  //and after You gave access of each of these values to each squares then may after some calls it modify as ["O",null,null,"X","O","O",null,null,null,"X"]

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice(); //this line copy the squares array in the nextsquare
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    // nextSquares[i] = "X"; //this will change the value of ith element of array as X
    setSquares(nextSquares); // this will update the state
    setXIsNext(!xIsNext);
  }

  //we put this thing after the handle function because to show the next player we always wait for the just encounterd value of xIsNext
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is : " + winner;
  } else {
    status = "Next turn of player : " + (xIsNext ? "X" : "O");
  }
  useEffect(() => {
    if (winner) {
      document.body.classList.add("winner");
    } else {
      document.body.classList.remove("winner");
    }
  }, [winner]);

  return (
    <>
      <div className="status">{status}</div>
      {/* so here we are assigning each value of array to the squares so that they
    have to think of changing there own values means each button will change the 
    value for him only and the state also get updated 
    
    why? doing like this where we are using whole grid as state because we 
    have to store the results means pattern of winning so that 
    pattern is consist of whole grid it will  not check each square so the 
    code have very less error prone 
    */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
