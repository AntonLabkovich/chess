import { BoardComponent } from './components/BoardComponent'
import './App.css'
import { useEffect, useState } from 'react'
import { Board } from './models/Board'
import { Player } from './models/Player'
import { Colors } from './models/Colors'
import LostFigures from './components/lostFigures'
import Timer from './components/Timer'

//TODO: логика короля, условие победы, таймер по истчению времени пройгрышь, шах и мат може быть историю ходов, undo redo

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState<Player | null>(new Player(Colors.BLACK));

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(()=>{
    setCurrentPlayer(whitePlayer);
    restart()
  }, [])

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures()
    setBoard(newBoard);
  }

  return (
    <div className='app'>
      <Timer restart={restart} currentPlayer={currentPlayer}/>
      <BoardComponent board = {board} setBoard = {setBoard} currentPlayer = {currentPlayer} swapPlayer = {swapPlayer}/>
      <div>
        <LostFigures title='Черный фигуры' figures={board.lostBlackfigures}/>
        <LostFigures  title='Белые фигуры' figures={board.lostWhitefigures}/>
      </div>
    </div>
  )
}

export default App;