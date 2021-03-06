import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css';
import Grid from '@material-ui/core/Grid';

 // object holding the state of the game
var outerGame = {
  innerGames: [                                          // Row-Col
    {id: 0, squares: Array(9).fill(null), winner: null}, // Top-Left
    {id: 1, squares: Array(9).fill(null), winner: null}, // Top-Center
    {id: 2, squares: Array(9).fill(null), winner: null}, // Top-Right
    {id: 3, squares: Array(9).fill(null), winner: null}, // Mid-Left
    {id: 4, squares: Array(9).fill(null), winner: null}, // Mid-Center
    {id: 5, squares: Array(9).fill(null), winner: null}, // Mid-Right
    {id: 6, squares: Array(9).fill(null), winner: null}, // Bot-Left
    {id: 7, squares: Array(9).fill(null), winner: null}, // Bot-Center
    {id: 8, squares: Array(9).fill(null), winner: null}  // Bot-Right
  ],
  innerGamesWon: 0,
  winner: null,
  activeInnerGameId: 99 // to denote all games not yet won should be active/open for clicks
}

  // possible winning scenarios
  const winScenarios = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // top-left to bottom-right
    [2, 4, 6], // top-right to bottom-left
  ];

/**
 * A square of a tictactoe innerGame
 * @param {*} props
 */
function Square(props) {
  const classname = "square ".concat(props.name);
  return (
    <button className={classname} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/**
 * Internal class for use in <Game /> component
 */
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outerGame: outerGame,
      xIsNext: true,
      singlePlayer: true,
    };
  }

  /**
   * Handles a move by a player determining if its valid, then if a win, then next valid innerGame
   * @param {int} innerGameId The game that was played in
   * @param {int} squareNum The square in the game clicked
   */
  handleClick(innerGameId, squareNum) {
    var outerGame = this.state.outerGame;

    if (//NOT the current active inner game AND NOT a free move?
        (innerGameId !== outerGame.activeInnerGameId && outerGame.activeInnerGameId !== 99)
   //SOME CHECKS BELOW THIS COMMENT MAY BE UNNECESSARY BASED ON LOGIC OF activeGameId, WILL TEST ONCE WORKING
        ||outerGame.winner //outer game won
        || outerGame.innerGames[innerGameId].winner //this inner game is won
        || outerGame.innerGames[innerGameId].squares[squareNum] //this inner game square already taken
      ){
        return; //do nothing if shouldnt be able to click this button anymore
      }


    //update the square that was clicked first
    outerGame.innerGames[innerGameId].squares[squareNum] = this.state.xIsNext ? 'X' : 'O';
    displayLastMove(innerGameId, squareNum);
    //then check if we have a winner after this current move
    const innerWinner = calcInnerWinner(outerGame.innerGames[innerGameId].squares);
    const isTie = calcTie(outerGame.innerGames[innerGameId].squares);
    //if we did have an inner winner, set it
    if (innerWinner) {
      disableInnerGame(innerGameId, innerWinner);
      outerGame.innerGames[innerGameId].winner = innerWinner;
      //increment outerGame winner count AND
      //check for out game winner if at least 3 inner games have been won
      if (++outerGame.innerGamesWon>2){
        outerGame.winner = calcOuterWinner(outerGame);
      }
    } else if (isTie) {
      disableInnerGame(innerGameId, "");
      outerGame.innerGames[innerGameId].winner = "TIE";
    }

    //check that the new activeGame is not already won, set the next activeInnerGameId
    if(outerGame.innerGames[squareNum].winner){
      outerGame.activeInnerGameId=99;//next move is a free move
    }else{
      outerGame.activeInnerGameId=squareNum;
    }
    displayNextMove(innerGameId, outerGame.activeInnerGameId, outerGame.winner);

    this.setState({
      outerGame: outerGame,
      xIsNext: !this.state.xIsNext, //flip the turn to the next player
    },
    () => {
      // if it is now O's turn (aka the computer) and single player mode is chosen (bool)
      // then call computer move function?
      if(!this.state.xIsNext && this.state.singlePlayer){
        console.log("0's turn: "+!this.state.xIsNext);
        // Step 1: figure out an open move
        var compMove = calcComputersMove(this.state.outerGame);
        // Step 2: recursively call handleClick with previously saved open move in step 1
        this.handleClick(compMove.inGmID, compMove.sqrNum);
      }
    });

  }

  toggleGameMode(){
    this.setState({
      singlePlayer: !this.state.singlePlayer,
    })
  }

  /**
   * A button of an inner game
   * @param {int} i index in the out array
   * @param {string} name relative to the inner game
   */
  renderSquare(innerGameId, squareNum, name) {
    return (
      <Square
        name={name}
        value={this.state.outerGame.innerGames[innerGameId].squares[squareNum]}
        onClick={() => this.handleClick(innerGameId, squareNum)}
      />
    );
  }
  
  render() {
    const winner = this.state.outerGame.winner
    let status;
    if (winner) {
      status = winner + ' wins!';
    } else {
      status = (this.state.xIsNext ? 'X' : 'O') + '\'s turn';
    }

    var spans = [];
    for (var i = 0; i < 9; i++) {
      // each push is an inner game
      spans.push(
        <span className="single-game" id={getGameId(i)}>
          <div className="board-row">
            {this.renderSquare(i, 0, "zero")}
            {this.renderSquare(i, 1, "one")}
            {this.renderSquare(i, 2, "two")}
          </div>
          <div className="board-row">
            {this.renderSquare(i, 3, "three")}
            {this.renderSquare(i, 4, "four")}
            {this.renderSquare(i, 5, "five")}
          </div>
          <div className="board-row">
            {this.renderSquare(i, 6, "six")}
            {this.renderSquare(i, 7, "seven")}
            {this.renderSquare(i, 8, "eight")}
          </div>
        </span>
      )
      const winnerName = "winner-".concat(i);
      spans.push(<span id={winnerName} className="winner-marker"></span>)

      if (i % 3 === 2) {
        spans.push(<div></div>);
      }
    }

    return (
      <div>
        <button className='gameModeButton' onClick={()=> this.toggleGameMode()}>Switch to {this.state.singlePlayer?"Two Player":"Single Player"}</button>
        <div id="freeMove">
          <p>You have a free move!</p>
        </div>
        <div class="game-board">
          {spans}
        </div>
        <div className="status">
          <p>{status}</p>
        </div>
      </div>
    );
  }
}

/**
 * Exported class that renders the Game in a Grid
 */
export default class Game extends React.Component {
  render() {
    return (
      <Grid item className="game">
        <Board />
      </Grid>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
  );

// ==========================================
// ||           HELPER FUNCTIONS           ||
// ==========================================

/**
 * Calculate the computers move randomly, accounting for free move
 * return object with necessary values to call handleClick
 */
function calcComputersMove(outerGM){
  var arg1 = outerGM.activeInnerGameId; // inGmID
  var arg2 = -1; // sqrNum
    // computer has free move
    if(arg1 === 99){
      var temp;
      do { // find an open innerGameId and save in arg1
        temp = Math.floor(Math.random()*9); // get a number 0-8 inclusive
      }while(outerGM.innerGames[temp].winner) // loop until we get an inner game w/ winner == null
      arg1 = temp;
    }
    // find the square in the chosen game
    do{
      arg2=Math.floor(Math.random()*9); // 0-8 inclusive
    }while(outerGM.innerGames[arg1].squares[arg2]) // loop until we get a square that is unclaimed/"null"
  
  return {inGmID: arg1, sqrNum: arg2};
}

/**
 * Calculate the winner of an inner game
 * @param {array} innerGameSquares
 */
function calcInnerWinner(innerGameSquares) {
  //for each winning scenario
  for (let i = 0; i < winScenarios.length; i++) {
    const [a, b, c] = winScenarios[i];
    // short circuiting check if postions in winning scenario are all X or all O
    if (innerGameSquares[a] && innerGameSquares[a] === innerGameSquares[b] && innerGameSquares[a] === innerGameSquares[c]) {
      return innerGameSquares[a]; // if was a winner return 'X' or 'O'
    }
  }
  return null; // there is no winner
}

/**
 * Determines if an innerGame is a tie by checking for null values
 * @param {*} innerGameSquares 
 */
function calcTie(innerGameSquares) {
  for (let i = 0; i < innerGameSquares.length; i++) {
    if (innerGameSquares[i] == null) {
      return false;
    }
  }
  return true;
}

function displayWinner(a,b,c) {
  const wins = [a,b,c];
  for (let i = 0; i < 3; i++) {
    const gameId = getGameId(wins[i]);
    console.log(gameId);
    console.log(document.getElementById(gameId));
    document.getElementById(gameId).style.border = 'solid 2px red';
    console.log('here ', i);
  }
}

/**
 * Calculate the winner of the outer game, OVERALL WINNER
 * @param {*} outerGame
 */
function calcOuterWinner(outerGame){
  //for each winning scenario
  for (let i = 0; i < winScenarios.length; i++) {
    const [a, b, c] = winScenarios[i];
    // short circuiting check if postions in winning scenario are all X or all O
    if (outerGame.innerGames[a].winner
      && outerGame.innerGames[a].winner  === outerGame.innerGames[b].winner
      && outerGame.innerGames[a].winner  === outerGame.innerGames[c].winner ) {
      displayWinner(a,b,c);
      return outerGame.innerGames[a].winner; // if was a winner return 'X' or 'O'
    }
  }
  return null; // there is no winner

}

/**
 * Makes an innerGame appear disabled
 * @param {*} gameId 
 * @param {*} winner 
 */
function disableInnerGame(gameId, winner) {
  const nodes = document.getElementById(getGameId(gameId)).getElementsByTagName('*');
  document.getElementById(getGameId(gameId)).style.background = "rgba(255, 255, 255, 0.3)";
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].disabled = true;
  }
  const winnerId = "winner-".concat(gameId);
  const winnerMarker = document.getElementById(winnerId);
  winnerMarker.textContent = winner;
  winnerMarker.style.visibility = "visible";
}

/**
 * Helps next player know which innerGame they must play in
 * @param {*} previous 
 * @param {*} next 
 * @param {*} winner 
 */
function displayNextMove(previous, next, winner) {
  if (winner != null) {
    return;
  }

  document.getElementById('freeMove').style.visibility = "hidden";
  if (previous !== 99) {
    const previousGame = document.getElementById(getGameId(previous));
    previousGame.style.border = 'none';
    previousGame.style.padding = '6px';
  }

  if (next !== 99) {
    const nextGame = document.getElementById(getGameId(next));
    nextGame.style.border = '3px solid #cb181d';
    nextGame.style.padding = '3px';
  } else {
    document.getElementById('freeMove').style.visibility = "visible";
  }
}

/**
 * Helps players see what the last move of the opponent that was made
 * @param {*} gameId 
 * @param {*} squareNum 
 */
function displayLastMove(gameId, squareNum) {
  // Clear out old "last move"
  for (var j = 0; j < 9; j++) {
    let nodes = document.getElementById(getGameId(j)).getElementsByTagName('Button');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.color = 'white';
    }
  }
  // Set last move
  const nodes = document.getElementById(getGameId(gameId)).getElementsByTagName('Button');
  nodes[squareNum].style.color = '#cb181d';
}

/**
 * Helper method for getting word/string version of a number for the id of spans
 * Takes int, returns word equivalent
 * @param {int} number
 */
function getGameId(number) {
  var ids = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  return ids[number];
}
