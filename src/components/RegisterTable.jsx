import { useEffect, useState, useRef } from "react"

export function RegisterTable({setData, data, isRunning, speedFactor}) {
  const [timers, setTimers] = useState([]);
  const timersRef = useRef(timers);
  const intervals = useRef([]);
  
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

  const isRunningRef = useRef(isRunning);

  // Update the ref whenever isRunning changes
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    data.forEach((car, index) => {
      // Only set up the timer if the car's queuePosition is 1 and a timer does not already exist for this car
      if (car.queuePosition === 1 && !intervals.current[index]) {
        const start = performance.now();
        const interval = setInterval(() => {
          
        if (!isRunningRef.current) {
          clearInterval(intervals.current[index]);
          intervals.current[index] = null; // Clear the interval for this car
          return;
        }

          const now = performance.now();
          const elapsed = (now - start) / 1000 * speedFactor;
          const currentTime = timersRef.current[index] !== undefined ? timersRef.current[index] : 0;
          const newTime = currentTime + elapsed;
          if (newTime >= car.processTime) {
            clearInterval(intervals.current[index]);
            setTimers((prevTimers) => {
              const newTimers = [...prevTimers];
              newTimers[index] = car.processTime;
              return newTimers;
            });
          } else {
            setTimers((prevTimers) => {
              const newTimers = [...prevTimers];
              newTimers[index] = newTime;
              return newTimers;
            });
          }
        }, 100); // Update state every 100 milliseconds
        intervals.current[index] = interval;
      }
    });
  }, [data, isRunning, speedFactor, timers]);
  
  useEffect(() => {
    data.forEach((car, index) => {
      if (timers[index] >= car.processTime && car.verificationState !== 'Aceptado') {
        const newData = [...data];
        newData[index].verificationState = 'Aceptado';
        setData(newData);
      }
    });
  }, [data, timers]);
  
  useEffect(() => {
    return () => intervals.current.forEach(clearInterval);
  }, []);

  const totalAcceptedE1 = data.filter((data) => data.verificationState === 'Aceptado' && data.lane === 'E1').length
  const totalRejectedE1 = data.filter((data) => data.verificationState === 'Rechazado' && data.lane === 'E1').length
  const totalQrE1 = data.filter((data) => data.lane === 'E1' && data.verificationType === 'Qr').length
  const totalCardE1 = data.filter((data) => data.lane === 'E1' && data.verificationType === 'Tarjeta').length
  const averageTimeQrE1 = data.filter((data) => data.verificationType === 'Qr' && data.lane === 'E1').reduce((acc, data) => acc + data.processTime, 0) / totalQrE1 || 0
  const averageTimeCardE1 = data.filter((data) => data.verificationType === 'Tarjeta' && data.lane === 'E1').reduce((acc, data) => acc + data.processTime, 0) / totalCardE1 || 0

  const totalAcceptedE2 = data.filter((data) => data.verificationState === 'Aceptado' && data.lane === 'E2').length
  const totalRejectedE2 = data.filter((data) => data.verificationState === 'Rechazado' && data.lane === 'E2').length
  const totalQrE2 = data.filter((data) => data.lane === 'E2' && data.verificationType === 'Qr').length
  const totalCardE2 = data.filter((data) => data.lane === 'E2' && data.verificationType === 'Tarjeta').length
  const averageTimeQrE2 = data.filter((data) => data.verificationType === 'Qr' && data.lane === 'E2').reduce((acc, data) => acc + data.processTime, 0) / totalQrE2 || 0
  const averageTimeCardE2 = data.filter((data) => data.verificationType === 'Tarjeta' && data.lane === 'E2').reduce((acc, data) => acc + data.processTime, 0) / totalCardE2 || 0

  const totalAcceptedS1 = data.filter((data) => data.verificationState === 'Aceptado' && data.lane === 'S1').length
  const totalRejectedS1 = data.filter((data) => data.verificationState === 'Rechazado' && data.lane === 'S1').length
  const totalQrS1 = data.filter((data) => data.lane === 'S1' && data.verificationType === 'Qr').length
  const totalCardS1 = data.filter((data) => data.lane === 'S1' && data.verificationType === 'Tarjeta').length
  const averageTimeQrS1 = data.filter((data) => data.verificationType === 'Qr' && data.lane === 'S1').reduce((acc, data) => acc + data.processTime, 0) / totalQrS1 || 0
  const averageTimeCardS1 = data.filter((data) => data.verificationType === 'Tarjeta' && data.lane === 'S1').reduce((acc, data) => acc + data.processTime, 0) / totalCardS1 || 0

  const totalAcceptedS2 = data.filter((data) => data.verificationState === 'Aceptado' && data.lane === 'S2').length
  const totalRejectedS2 = data.filter((data) => data.verificationState === 'Rechazado' && data.lane === 'S2').length
  const totalQrS2 = data.filter((data) => data.lane === 'S2' && data.verificationType === 'Qr').length
  const totalCardS2 = data.filter((data) => data.lane === 'S2' && data.verificationType === 'Tarjeta').length
  const averageTimeQrS2 = data.filter((data) => data.verificationType === 'Qr' && data.lane === 'S2').reduce((acc, data) => acc + data.processTime, 0) / totalQrS2 || 0
  const averageTimeCardS2 = data.filter((data) => data.verificationType === 'Tarjeta' && data.lane === 'S2').reduce((acc, data) => acc + data.processTime, 0) / totalCardS2 || 0

  const totalAccepted = totalAcceptedE1 + totalAcceptedE2 + totalAcceptedS1 + totalAcceptedS2
  const totalRejected = totalRejectedE1 + totalRejectedE2 + totalRejectedS1 + totalRejectedS2

  const totalCarsQr = data.filter((data) => data.verificationType === 'Qr').length || 0
  const totalCarsCard = data.filter((data) => data.verificationType === 'Tarjeta').length || 0

  const totalTimeQr = data.filter((data) => data.verificationType === 'Qr').reduce((acc, data) => acc + data.processTime, 0) || 0
  const totalTimeCard = data.filter((data) => data.verificationType === 'Tarjeta').reduce((acc, data) => acc + data.processTime, 0) || 0
  
  const averageTimeQr = totalTimeQr / totalCarsQr || 0
  const averageTimeCard = totalTimeCard / totalCarsCard || 0

  return (
    <>
    <section className="register">
     <table className="register-table">
        <caption className="rt-name">
          <h2>Registro de simulacion</h2>
        </caption>
        <thead className="rt-header">
          <tr className="rt-header-row">
            <th>⠀⠀⠀⠀⠀</th>
            <th>Linea</th>
            <th>Hora de llegada</th>
            <th>Posición en la cola</th>
            <th>Tiempo de procesamiento</th>
            <th>Tipo de verificación</th>
            <th>Estado de Verficación</th>
          </tr>
        </thead>
        <tbody className="rt-body">
          {data.map((data, index) => {
            return (
              <tr className="rt-body-row" key={index}>
                <td>{index + 1}</td>
                <td>{data.lane}</td>
                <td>{data.arrivalTime}</td>
                <td>{data.queuePosition}</td>
                <td>{`${(typeof timers[index] === 'number' ? timers[index].toFixed(3) : 0)}`}</td>
                <td>{data.verificationType}</td>
                <td>{data.verificationState}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>

    <section className="statistics">
      <table className="statistics-table">
        <caption>
          <h2>Estadisticas</h2>
        </caption>
        <thead>
          <tr>
            <th>Linea</th>
            <th>Total aceptados</th>
            <th>Total rechazados</th>
            <th>Tiempo promedio verificación QR</th>
            <th>Tiempo promedio verificación Tarjeta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E1</td>
            <td>{totalAcceptedE1}</td>
            <td>{totalRejectedE1}</td>
            <td>{averageTimeQrE1.toFixed(3)}</td>
            <td>{averageTimeCardE1.toFixed(3)}</td>
          </tr>
          <tr>
            <td>E2</td>
            <td>{totalAcceptedE2}</td>
            <td>{totalRejectedE2}</td>
            <td>{averageTimeQrE2.toFixed(3)}</td>
            <td>{averageTimeCardE2.toFixed(3)}</td>
          </tr>
          <tr>
            <td>S1</td>
            <td>{totalAcceptedS1}</td>
            <td>{totalRejectedS1}</td>
            <td>{averageTimeQrS1.toFixed(3)}</td>
            <td>{averageTimeCardS1.toFixed(3)}</td>
          </tr>
          <tr>
            <td>S2</td>
            <td>{totalAcceptedS2}</td>
            <td>{totalRejectedS2}</td>
            <td>{averageTimeQrS2.toFixed(3)}</td>
            <td>{averageTimeCardS2.toFixed(3)}</td>
          </tr>
          <tr>
          <td>Total</td>
          <td>{totalAccepted}</td>
          <td>{totalRejected}</td>
          <td>{averageTimeQr.toFixed(3)}</td>
          <td>{averageTimeCard.toFixed(3)}</td>
        </tr>
        </tbody>
      </table>
    </section>


    </>
  )
}