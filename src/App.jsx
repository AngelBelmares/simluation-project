import { useState, useEffect, useRef} from 'react'
import './App.css'
import { RegisterTable } from './components/RegisterTable'
import { SimulationController } from './components/SimulationController'
import { SimulationAnimation } from './components/SimulationAnimation'

function App() {
  const [fetchData, setFetchData] = useState([])
  const API_URL = 'http://localhost:5000'

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setFetchData(data)
      })
      .catch(err => console.log(err))
  }, [])


  const [data, setData] = useState([])
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [speedFactor, setSpeedFactor] = useState(1)
  const [timers, setTimers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if(data.length === 0){
      setCurrentIndex(0)
    }
  }, [isRunning]);
  
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
  
    if (JSON.stringify(newData) !== JSON.stringify(prevDataRef.current)) {
      setData(newData);
    }
  
    prevDataRef.current = newData;
  }, [data]);

  
  useEffect(() => {
    let interval
  
    if (isRunning) {
      const originalStart = performance.now();
      interval = setInterval(() => {
        const now = performance.now();
        const elapsed = (now - originalStart) / 1000 * speedFactor;
        setTime((prevTime) => {
          const newTime = prevTime + elapsed;
          return newTime;
        });
        if(fetchData.length > currentIndex && fetchData[currentIndex].arrivalTime <= time){
          setData(prevData => [...prevData, fetchData[currentIndex]]);
          setCurrentIndex(prevIndex => prevIndex + 1);  // Increment the current index
        }
      }, 1);
    }
  
    return () => clearInterval(interval);
  }, [isRunning, speedFactor, fetchData, currentIndex, time]);
  

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
