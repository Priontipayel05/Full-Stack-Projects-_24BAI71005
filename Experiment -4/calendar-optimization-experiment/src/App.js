import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import EventList from './components/EventList';

function App() {
  // Initial events data
  const [events, setEvents] = useState([
    { id: 1, title: 'Team Meeting', date: '2026-08-10', time: '10:00 AM' },
    { id: 2, title: 'Project Review', date: '2026-08-12', time: '2:00 PM' },
    { id: 3, title: 'Client Call', date: '2026-08-15', time: '11:30 AM' },
    { id: 4, title: 'Workshop', date: '2026-08-18', time: '9:00 AM' },
    { id: 5, title: 'Design Review', date: '2026-08-20', time: '3:00 PM' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // Memoize expensive computation - filtering events
  const filteredEvents = useMemo(() => {
    console.log('Filtering events...');
    return events.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = selectedDate ? event.date === selectedDate : true;
      return matchesSearch && matchesDate;
    });
  }, [events, searchTerm, selectedDate]);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleEventClick = useCallback((event) => {
    alert(`Event: ${event.title}\nDate: ${event.date}\nTime: ${event.time}`);
  }, []);

  const handleAddEvent = useCallback((newEvent) => {
    setEvents(prevEvents => [
      ...prevEvents,
      {
        id: prevEvents.length + 1,
        ...newEvent
      }
    ]);
  }, []);

  const handleDeleteEvent = useCallback((eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  return (
    <div className="app">
      <h1>📅 Calendar Application</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {selectedDate && (
          <button 
            onClick={() => setSelectedDate(null)}
            className="clear-filter-btn"
          >
            Clear Date Filter
          </button>
        )}
      </div>

      <div className="main-container">
        <Calendar 
          events={events}
          onEventClick={handleEventClick}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
        
        <EventList 
          events={filteredEvents}
          onEventClick={handleEventClick}
          onDeleteEvent={handleDeleteEvent}
          onAddEvent={handleAddEvent}
        />
      </div>

      <div className="performance-info">
        <p>Total Events: {events.length} | Filtered Events: {filteredEvents.length}</p>
      </div>
    </div>
  );
}

export default App;