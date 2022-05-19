import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors';
import { Player } from '../models/Player'

interface TimerProps{
    currentPlayer: Player | null;
    restart: () => void
}

const Timer: React.FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(()=>{
        startTimer()
    }, [currentPlayer])

    const startTimer = () => {
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.BLACK ? dicrimentBlackTimer : dicrementWhiteTimer;

        timer.current = setInterval(callback, 1000)
    }

    const dicrementWhiteTimer = () => {
        setWhiteTime(prev => prev - 1)
    }

    const dicrimentBlackTimer = () => {
        setBlackTime(prev => prev -1)
    }

    const handleRestart = () => {
        setBlackTime(300);
        setWhiteTime(300);
        restart()
    }

  return (
    <div>
        <div>
            <button onClick={handleRestart}>Restart game</button>
        </div>
        <h2>Черные: {blackTime}</h2>
        <h2>Белые: {whiteTime}</h2>
    </div>
  )
}

export default Timer