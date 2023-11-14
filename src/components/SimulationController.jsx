export function SimulationController({setTimers, setTime, setData, isRunning, setIsRunning }) {
  
  
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
      </section>
    </>
  )
}