import React, { useState } from 'react';
import CalendarView from './components/CalendarView';
import './App.css';

function App() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "📱 Instagram Post - Product Launch",
      date: "2026-08-05",
      description: "New summer collection launch",
      time: "10:00 AM"
    },
    {
      id: "2",
      title: "💼 LinkedIn Post - Industry Insights",
      date: "2026-08-08",
      description: "Share market trends article",
      time: "2:30 PM"
    },
    {
      id: "3",
      title: "📘 Facebook Campaign - Brand Awareness",
      date: "2026-08-12",
      description: "Video ad campaign for new product",
      time: "9:00 AM"
    },
    {
      id: "4",
      title: "🐦 Twitter Post - Daily Update",
      date: "2026-08-15",
      description: "Company milestone announcement",
      time: "11:00 AM"
    },
    {
      id: "5",
      title: "📸 Instagram Story - Behind Scenes",
      date: "2026-08-18",
      description: "Team culture showcase",
      time: "4:00 PM"
    }
  ]);

  const addNewEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>📅 Post Scheduling Calendar</h1>
          <p>Manage and schedule your social media posts efficiently</p>
        </header>
        
        <div className="calendar-wrapper">
          <CalendarView 
            events={events}
            onAddEvent={addNewEvent}
            onUpdateEvent={updateEvent}
            onDeleteEvent={deleteEvent}
          />
        </div>
        
        <footer className="app-footer">
          <p>© 2026 Post Scheduler | Drag & Drop to reschedule</p>
        </footer>
      </div>
    </div>
  );
}

export default App;