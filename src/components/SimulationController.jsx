import { useEffect } from 'react';

export function SimulationController({setTimers, setTime, setData, isRunning, setIsRunning, setSpeedFactor, speedFactor}) {
  
  const hadleSpeedFactor = (e) => {
    const newSpeedFactor = e.target.value;
    setSpeedFactor(newSpeedFactor);
    setIsRunning(false);
  }

  useEffect(() => {
    const newSpeedFactor = parseInt(speedFactor);
    setSpeedFactor(newSpeedFactor);
  }, [speedFactor]);
  
  const handleRun = () => {
    setIsRunning(!isRunning)
  }
  
  
  const handleReset = () => {
    setTimers([])
    setTime(0)
    setData([])
    setIsRunning(false)
  }
  
  return (
    <>
      <section className="simulation-buttons">
        <button className={!isRunning ? 'start-button' : 'stop-button'} onClick={handleRun}>{!isRunning ? 'Iniciar' : 'Detener'}</button>
        <button className="sb-reset" onClick={handleReset}>Reiniciar</button>
        <div className="sb-speedFactor">
          <label htmlFor="speed">x1</label>
            <input
              id="speed"
              type="range"
              min="1"
              max="16"
              step="1"
              value={speedFactor}
              onChange={(e) => hadleSpeedFactor(e)}
            />
          <label htmlFor="speed">x16</label>
          <span></span>
        </div>
        
      </section>
    </>
  )
}