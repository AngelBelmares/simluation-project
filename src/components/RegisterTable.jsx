import { useEffect, useRef } from "react"

export function RegisterTable({timers, setTimers, setData, data, isRunning, speedFactor}) {
  
  const isRunningRef = useRef(isRunning);
  const timersRef = useRef(timers);
  const intervals = useRef([]);
  const probRechazo = 42 / 5322

  // reset all when data === []
  useEffect(() => {
    if (data.length === 0) {
      timersRef.current = [];
      intervals.current = [];
      startTimes.current = [];
    }
  }, [isRunning]);

  useEffect(() => {
    data.forEach((car, index) => {
      if (timers[index] >= car.processTime && car.verificationState === 'Pendiente') {
        const newData = [...data];
        if(Math.random() < probRechazo) {
          newData[index].verificationState = 'Rechazado';
        } else {
        newData[index].verificationState = 'Aceptado';
        }
        setData(newData);
      }
    });
  }, [data, timers]);

  const startTimes = useRef([]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);


  useEffect(() => {  
    data.forEach((car, index) => {
      if (car.queuePosition === 1 && isRunning && !intervals.current[index]) {
        if (!startTimes.current[index]) {
          startTimes.current[index] = performance.now();
        }
  
        const interval = setInterval(() => {
          if (!isRunningRef.current) {
            clearInterval(intervals.current[index]);
            intervals.current[index] = null;
            return;
          }
  
          const now = performance.now();
          const elapsed = (now - startTimes.current[index]) / 1000 * speedFactor;
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
    return () => intervals.current.forEach(clearInterval);
  }, []);


  const AcceptedCarsE1 = data.filter((data) => data.verificationState === 'Aceptado' && data.lane === 'E1').length
  const RejectedCarsE1 = data.filter((data) => data.verificationState === 'Rechazado' && data.lane === 'E1').length
  const verifQrE1 = data.filter((data) => data.lane === 'E1' && data.verificationType === 'Qr' && data.verificationState !== 'Pendiente').length
  const verifCardE1 = data.filter((data) => data.lane === 'E1' && data.verificationType === 'Tarjeta' && data.verificationState !== 'Pendiente').length
  const averageTimeQrE1 = verifQrE1 !== 0 ? data.filter((data) => data.verificationType === 'Qr' && data.lane === 'E1' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) / verifQrE1 : 0
  const averageTimeCardE1 = verifCardE1 !== 0 ? data.filter((data) => data.verificationType === 'Tarjeta' && data.lane === 'E1' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) / verifCardE1 : 0

  const AcceptedCarsE2 = data.filter((data) => data.verificationState === 'Aceptado' && data.lane === 'E2').length
  const RejectedCarsE2 = data.filter((data) => data.verificationState === 'Rechazado' && data.lane === 'E2').length
  const verifQrE2 = data.filter((data) => data.lane === 'E2' && data.verificationType === 'Qr' && data.verificationState !== 'Pendiente').length
  const verifCardE2 = data.filter((data) => data.lane === 'E2' && data.verificationType === 'Tarjeta' && data.verificationState !== 'Pendiente').length
  const averageTimeQrE2 = verifQrE2 !== 0 ? data.filter((data) => data.verificationType === 'Qr' && data.lane === 'E2' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) / verifQrE2 : 0
  const averageTimeCardE2 = verifCardE2 !== 0 ? data.filter((data) => data.verificationType === 'Tarjeta' && data.lane === 'E2' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) / verifCardE2 : 0

  const AcceptedCarsS1 = data.filter((data) => data.verificationState === 'Aceptado' && data.lane === 'S1').length
  const RejectedCarsS1 = data.filter((data) => data.verificationState === 'Rechazado' && data.lane === 'S1').length
  const verifQrS1 = data.filter((data) => data.lane === 'S1' && data.verificationType === 'Qr' && data.verificationState !== 'Pendiente').length
  const verifCardS1 = data.filter((data) => data.lane === 'S1' && data.verificationType === 'Tarjeta' && data.verificationState !== 'Pendiente').length
  const averageTimeQrS1 = verifQrS1 !== 0 ? data.filter((data) => data.verificationType === 'Qr' && data.lane === 'S1' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) / verifQrS1 : 0
  const averageTimeCardS1 = verifCardS1 !== 0 ? data.filter((data) => data.verificationType === 'Tarjeta' && data.lane === 'S1' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) / verifCardS1 : 0

  const AcceptedCarsS2 = data.filter((data) => data.verificationState === 'Aceptado' && data.lane === 'S2').length
  const RejectedCarsS2 = data.filter((data) => data.verificationState === 'Rechazado' && data.lane === 'S2').length
  const verifQrS2 = data.filter((data) => data.lane === 'S2' && data.verificationType === 'Qr' && data.verificationState !== 'Pendiente').length
  const verifCardS2 = data.filter((data) => data.lane === 'S2' && data.verificationType === 'Tarjeta' && data.verificationState !== 'Pendiente').length
  const averageTimeQrS2 = verifQrS2 !== 0 ? data.filter((data) => data.verificationType === 'Qr' && data.lane === 'S2' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) / verifQrS2 : 0
  const averageTimeCardS2 = verifCardS2 !== 0 ? data.filter((data) => data.verificationType === 'Tarjeta' && data.lane === 'S2' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) / verifCardS2 : 0

  const totalAccepted = AcceptedCarsE1 + AcceptedCarsE2 + AcceptedCarsS1 + AcceptedCarsS2
  const totalRejected = RejectedCarsE1 + RejectedCarsE2 + RejectedCarsS1 + RejectedCarsS2

  const totalVerifQr = data.filter((data) => data.verificationType === 'Qr' && data.verificationState !== 'Pendiente').length || 0
  const totalVerifCard = data.filter((data) => data.verificationType === 'Tarjeta' && data.verificationState !== 'Pendiente').length || 0

  const totalTimeQr = data.filter((data) => data.verificationType === 'Qr' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) || 0
  const totalTimeCard = data.filter((data) => data.verificationType === 'Tarjeta' && data.verificationState !== 'Pendiente').reduce((acc, data) => acc + data.processTime, 0) || 0
  
  const averageTimeQr = totalVerifQr > 0 ? totalTimeQr / totalVerifQr : 0
  const averageTimeCard = totalVerifCard > 0 ? totalTimeCard / totalVerifCard : 0

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
                <td className={data.verificationState === 'Aceptado' ? 'Accepted' : (data.queuePosition === 1) ? 'Proccesing' : (data.verificationState === 'Rechazado') ? 'Rejected' : 'Pending'}>{data.queuePosition === 1 ? 'Procesando' : data.verificationState}</td>
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
            <th>Autos aceptados</th>
            <th>Autos rechazados</th>
            <th>Verificaciones con tarjeta</th>
            <th>Verificaciones con QR</th>
            <th>Tiempo promedio verificación QR</th>
            <th>Tiempo promedio verificación Tarjeta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E1</td>
            <td>{AcceptedCarsE1}</td>
            <td>{RejectedCarsE1}</td>
            <td>{verifCardE1}</td>
            <td>{verifQrE1}</td>
            <td>{averageTimeQrE1.toFixed(3)}</td>
            <td>{averageTimeCardE1.toFixed(3)}</td>
          </tr>
          <tr>
            <td>E2</td>
            <td>{AcceptedCarsE2}</td>
            <td>{RejectedCarsE2}</td>
            <td>{verifCardE2}</td>
            <td>{verifQrE2}</td>
            <td>{averageTimeQrE2.toFixed(3)}</td>
            <td>{averageTimeCardE2.toFixed(3)}</td>
          </tr>
          <tr>
            <td>S1</td>
            <td>{AcceptedCarsS1}</td>
            <td>{RejectedCarsS1}</td>
            <td>{verifCardS1}</td>
            <td>{verifQrS1}</td>
            <td>{averageTimeQrS1.toFixed(3)}</td>
            <td>{averageTimeCardS1.toFixed(3)}</td>
          </tr>
          <tr>
            <td>S2</td>
            <td>{AcceptedCarsS2}</td>
            <td>{RejectedCarsS2}</td>
            <td>{verifCardS2}</td>
            <td>{verifQrS2}</td>
            <td>{averageTimeQrS2.toFixed(3)}</td>
            <td>{averageTimeCardS2.toFixed(3)}</td>
          </tr>
          <tr>
          <td>Total</td>
          <td>{totalAccepted}</td>
          <td>{totalRejected}</td>
          <td>{totalVerifCard}</td>
          <td>{totalVerifQr}</td>
          <td>{averageTimeQr.toFixed(3)}</td>
          <td>{averageTimeCard.toFixed(3)}</td>
        </tr>
        </tbody>
      </table>
    </section>


    </>
  )
}