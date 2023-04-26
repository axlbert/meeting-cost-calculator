import React, { useState } from 'react';
import './App.css';

function App() {
  const [duration, setDuration] = useState(15);
  const [attendees, setAttendees] = useState(1);
  const [averageSalary, setAverageSalary] = useState(40000);
  const [meetingCost, setMeetingCost] = useState(0);

  const handleChange = (setter) => (event) => {
    setter(Number(event.target.value));
    const newDuration = setter === setDuration ? Number(event.target.value) : duration;
    const newAttendees = setter === setAttendees ? Number(event.target.value) : attendees;
    const newAverageSalary = setter === setAverageSalary ? Number(event.target.value) : averageSalary;

    const minutesPerYear = 60 * 8 * 5 * 45; // 60 minutes * 8 hours * 5 days * 52 weeks
    const costPerMinute = (newAverageSalary / minutesPerYear) * newAttendees;
    setMeetingCost(costPerMinute * newDuration);
  };

  const salaryButtons = [];
  for (let i = 40000; i <= 100000; i += 5000) {
    salaryButtons.push(
      <button
        key={i}
        className={averageSalary === i ? 'selected' : ''}
        onClick={() => handleChange(setAverageSalary)({ target: { value: i } })}
      >
        {i.toLocaleString()} €
      </button>
    );
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const durationDisplay = `${hours > 0 ? hours + ' hours' : ''} ${minutes > 0 ? minutes + ' minutes' : ''}`.trim();

  return (
    <div className="App">
      <h1>Meeting Cost Calculator</h1>
      <label>
        Duration: {durationDisplay}
        <input
          type="range"
          min={0}
          max={600}
          step={15}
          value={duration}
          onChange={handleChange(setDuration)}
        />
      </label>
      <label>
        Number of attendees: {attendees}
        <input
          type="range"
          min={1}
          max={50}
          step={1}
          value={attendees}
          onChange={handleChange(setAttendees)}
        />
      </label>
      <div className="salary-buttons">
        <label>Average salary (€):</label>
        {salaryButtons}
      </div>
      <div className="meeting-cost">
        <h2>Meeting costs:</h2>
        <p className="cost" style={{ color: 'red' }}>
          {Intl.NumberFormat().format(meetingCost.toFixed(2))} €
        </p>
      </div>
    </div>
  );
}

export default App;
