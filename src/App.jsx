import { useState, useEffect} from 'react'
import './App.css'
import { Simulation } from './components/Simulation'
import { RegisterTable } from './components/RegisterTable'
import { SimulationController } from './components/SimulationController'

function App() {
  const [data, setData] = useState([])
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [speedFactor, setSpeedFactor] = useState(1)

  const timeInHours = new Date(time * 1000).toISOString().substr(11, 12)


  useEffect(() => {
    let interval
  
    if (isRunning) {
      let start = performance.now()
      interval = setInterval(() => {
        const now = performance.now()
        const elapsed = (now - start) / 1000 * speedFactor // Multiply by speedFactor
        setTime((prevTime) => {
          const newTime = prevTime + elapsed;
          if(Math.random() < 0.001){
            const dataRow = createEvent(newTime)
            setData((prevData) => [...prevData, dataRow])
          }
          return newTime;
        })
        start = now;
      }, 1)
    }
  
    return () => clearInterval(interval)
  }, [isRunning, speedFactor]) 
  
  
  function createEvent(currentTime){
    const lane = Math.random() < 0.5 ? 'E1' : 'E2'
    const processTime = ((Math.random() * 10000) / 1000) + 1
    const queuePosition = 0
    const arrivalTime = new Date(currentTime * 1000).toISOString().substr(11, 12)
    const verificationType = Math.random() < 0.5 ? 'Qr' : 'Tarjeta'
    const verificationState = 'Pendiente'
      
    return {lane, arrivalTime, queuePosition, processTime, verificationType, verificationState}
  }

  useEffect(() => {
    const container = document.getElementsByClassName('register')[0]
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [data])

  return (
    <>
      <main>
        {timeInHours}
        <SimulationController
          setTime={setTime}
          setData={setData}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
        />
      </main>
      <aside>
        <RegisterTable
        data = {data}
        setData={setData}
        isRunning={isRunning}
        speedFactor={speedFactor}
        />
      </aside>
    </>
  )
}

export default App
