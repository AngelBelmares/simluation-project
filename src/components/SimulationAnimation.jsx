import React, { useEffect } from 'react';
import '../App.css';

export function SimulationAnimation({ data }) {
  const roads = ['E1', 'E2', 'S1', 'S2']

  useEffect(() => {
    const acceptedCarElements = document.querySelectorAll('.car-accepted-entry, .car-accepted-exit, .car-rejected-entry, .car-rejected-exit');

      acceptedCarElements.forEach((element) => {
        if (element) {
          element.classList.add('fade-out');
        }
      });

  }, [data]);

  function getCarClassName(car) {
    if ((car.lane === 'E1' || car.lane === 'E2') && car.verificationState === 'Aceptado') {
      return 'car-accepted-entry';
    } else if ((car.lane === 'E1' || car.lane === 'E2') && car.queuePosition === 1) {
      return 'car-proccesing-entry';
    } else if ((car.lane === 'E1' || car.lane === 'E2') && car.verificationState === 'Rechazado') {
      return 'car-rejected-entry';
    } else if (car.lane === 'E1' || car.lane === 'E2') {
      return 'car-pending-entry';
    } else if (car.verificationState === 'Aceptado') {
      return 'car-accepted-exit';
    } else if (car.queuePosition === 1) {
      return 'car-proccesing-exit';
    } else if (car.verificationState === 'Rechazado') {
      return 'car-rejected-exit';
    } else {
      return 'car-pending-exit';
    }
  }


  return (
    <>
      <div className="roads-container">
        {roads.map((road, index) => (
          <div key={index} className="road">
            <h3 className='road-name'>{road}</h3>
            {data.filter((car) => car.lane === road).map((car, index) => (
              <div key={index} className={getCarClassName(car)}>
              
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}