import { useState, useEffect, useRef} from 'react'
import './App.css'
import { RegisterTable } from './components/RegisterTable'
import { SimulationController } from './components/SimulationController'
import { SimulationAnimation } from './components/SimulationAnimation'

function App() {
  const [data, setData] = useState([])
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [speedFactor, setSpeedFactor] = useState(1)
  const [timers, setTimers] = useState([]);
  
  const timeInHours = new Date(time * 1000).toISOString().substr(11, 12)

  const prevDataRef = useRef();

  useEffect(() => {
    let queuePositionE1 = 0;
    let queuePositionE2 = 0;
    let queuePositionS1 = 0;
    let queuePositionS2 = 0;
  
    const newData = data.map(car => {
      if (car.verificationState === 'Pendiente') {
        switch (car.lane) {
          case 'E1':
            return { ...car, queuePosition: ++queuePositionE1 };
          case 'E2':
            return { ...car, queuePosition: ++queuePositionE2 };
          case 'S1':
            return { ...car, queuePosition: ++queuePositionS1 };
          case 'S2':
            return { ...car, queuePosition: ++queuePositionS2 };
          default:
            return car;
        }
      } else {
        // If the car is not pending, reset its queue position to 0
        return { ...car, queuePosition: 0 };
      }
    });
  
    // Only update data if it has actually changed
    if (JSON.stringify(newData) !== JSON.stringify(prevDataRef.current)) {
      setData(newData);
    }
  
    // Store the current data in the ref
    prevDataRef.current = newData;
  }, [data]);

  
  useEffect(() => {
    let interval
  
    if (isRunning) {
      let start = performance.now()
      interval = setInterval(() => {
        const now = performance.now()
        const elapsed = (now - start) / 1000 * speedFactor // Multiply by speedFactor
        setTime((prevTime) => {
          const newTime = prevTime + elapsed;
          if(Math.random() < 0.004){
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
  
  const lanes = ['E1', 'E2', 'S1', 'S2']
  
  function createEvent(currentTime){
    const laneIndex = Math.floor(Math.random() * 4)
    const lane = lanes[laneIndex]
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
        <h2>{timeInHours}</h2>
        <SimulationAnimation
          data={data}
        />
        <SimulationController
          setTimers={setTimers}
          setSpeedFactor={setSpeedFactor}
          speedFactor={speedFactor}
          setTime={setTime}
          setData={setData}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
        />
      </main>
      <aside>
        <RegisterTable
        timers={timers}
        setTimers={setTimers}
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
