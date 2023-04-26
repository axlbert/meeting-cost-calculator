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

  return (
    <div className="App">
      <h1>Schmiede.one Meeting Cost Calculator</h1>
      <label>
        Duration:
        <select value={duration} onChange={handleChange(setDuration)}>
        <option value={15}>15 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={45}>45 minutes</option>
        <option value={60}>60 minutes</option>
        <option value={90}>90 minutes</option>
        <option value={120}>120 minutes</option>
        <option value={180}>3 hrs</option>
        <option value={240}>4 hrs</option>
        <option value={360}>6 hrs</option>
        <option value={480}>8 hrs</option>
        </select>
      </label>
      <label>
        Number of attendees:
        <input
          type="number"
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


