import { useState, useEffect, useRef } from "react";


function App() {
  const startBtnRef = useRef(null)
  const resetBtnRef = useRef(null)
  const stopBtnRef = useRef(null)
  const restartBtnRef = useRef(null)

  const [time, setTime] = useState({hours: 0, minutes: 0, seconds: 0})
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [onStop, setOnStop] = useState(false)

  useEffect(() => {

    disabledButtons(false, true, true, true)

  }, [])


  useEffect(() => {
    let intervalId

    if(isTimeRunning && onStop === false){
      intervalId = setInterval(() => {
        setTimeInSeconds(prev => prev + 1)
        let hrs = Math.floor(timeInSeconds / (60 * 60))
        let mins = Math.floor((timeInSeconds - (hrs * (60 * 60)))  / 60)
        let secs = Math.floor(timeInSeconds % 60)
        setTime({hours: hrs, minutes: mins, seconds: secs})
        
      }, 1000);

    } else if(isTimeRunning === false && onStop === false){

      setTimeInSeconds(0)
      setTime({hours: 0, minutes: 0, seconds: 0})
      
    }

    return () => clearInterval(intervalId)


  }, [isTimeRunning, timeInSeconds, onStop])


  function disabledButtons(forStart, forReset, forStop, forRestart){
      startBtnRef.current.disabled = forStart
      resetBtnRef.current.disabled = forReset
      stopBtnRef.current.disabled = forStop
      restartBtnRef.current.disabled = forRestart 
  }



  function handleClick(event){
    const {name} = event.target
    
    if(name === "start"){

      setIsTimeRunning(true)
      disabledButtons(true, false, false, true)

    } else if(name === "resetBtn"){

      setIsTimeRunning(false)
      setOnStop(false)
      disabledButtons(false, true, true, true)  

    } else if(name === "stop"){

      setOnStop(true)
      setIsTimeRunning(false)
      disabledButtons(true, false, true, false)   

    } else if(name === "restart"){

      setOnStop(false)
      setIsTimeRunning(true)
      disabledButtons(true, false, false, true) 
      
    }
    
  }





  return (
    <div className="container">
     <div className="stopwatch">
        <div className="stopwatch-display">
          <span className="hours-style">{time.hours < 10 ? `0${time.hours}` : time.hours}</span>:
          <span className="minutes-style">{time.minutes < 10 ? `0${time.minutes}` : time.minutes}</span>:
          <span className="seconds-style">{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
        </div>
        <div className="stopwatch-actions">
          <button
            ref={startBtnRef} 
            name="start"
            onClick={handleClick}>
            Démarrer
          </button>
          <button
            ref={resetBtnRef} 
            name="resetBtn"
            onClick={handleClick}>
            Réinitialiser
          </button>
          <button
            ref={stopBtnRef} 
            name="stop"
            onClick={handleClick}>
            Pause
          </button>
          <button
            ref={restartBtnRef} 
            name="restart"
            onClick={handleClick}>
            Reprendre
          </button>
        </div>
     </div>
    </div>
  );
}

export default App;
