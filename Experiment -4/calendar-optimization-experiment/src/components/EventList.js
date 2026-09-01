import React, { memo, useState, useCallback } from 'react';
import './EventList.css';

const EventList = memo(function EventList({ 
  events, 
  onEventClick, 
  onDeleteEvent,
  onAddEvent 
}) {
  console.log('EventList component rendered');

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (newEventTitle.trim() && newEventDate) {
      onAddEvent({
        title: newEventTitle.trim(),
        date: newEventDate,
        time: newEventTime || '12:00 PM'
      });
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventTime('');
    }
  }, [newEventTitle, newEventDate, newEventTime, onAddEvent]);

  return (
    <div className="event-list">
      <h2>📋 Event List</h2>
      
      <form onSubmit={handleSubmit} className="add-event-form">
        <input
          type="text"
          placeholder="Event title..."
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          className="event-input"
        />
        <input
          type="date"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
          className="event-date-input"
        />
        <input
          type="time"
          value={newEventTime}
          onChange={(e) => setNewEventTime(e.target.value)}
          className="event-time-input"
        />
        <button type="submit" className="add-btn">Add Event</button>
      </form>

      <div className="events-container">
        {events.length === 0 ? (
          <p className="no-events">No events found</p>
        ) : (
          events.map(event => (
            <div key={event.id} className="event-item">
              <div 
                className="event-content"
                onClick={() => onEventClick(event)}
              >
                <h3>{event.title}</h3>
                <p>📅 {event.date}</p>
                <p>🕐 {event.time}</p>
              </div>
              <button 
                onClick={() => onDeleteEvent(event.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default EventList;