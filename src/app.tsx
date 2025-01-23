import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      const year = now.getFullYear();
      const month = now.toLocaleString('default', { month: 'long' });
      const dayDate = now.getDate();
      const day = now.toLocaleString('default', { weekday: 'long' });

      setDate(`${day}, ${month} ${dayDate}, ${year}`);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };

    updateClock(); // Initial update

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className="container">
      <div className="date">{date}</div>
      <div className="clock">
        <div className="time-row">
          <div className="time-box hours">{hours}</div>
          <div className="separator">:</div>
          <div className="time-box minutes">{minutes}</div>
          <div className="separator">:</div>
          <div className="time-box seconds">{seconds}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
