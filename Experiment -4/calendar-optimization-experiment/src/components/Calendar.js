import React, { memo, useMemo } from 'react';
import './Calendar.css';

// React.memo prevents unnecessary re-renders
const Calendar = memo(function Calendar({ 
  events, 
  onEventClick, 
  onDateSelect, 
  selectedDate 
}) {
  console.log('Calendar component rendered');

  // Generate current month view
  const generateCalendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add empty cells for days before first of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateStr);
      const isSelected = selectedDate === dateStr;
      const isToday = dateStr === `${year}-${String(month + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      days.push(
        <div 
          key={dateStr}
          className={`calendar-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => onDateSelect(dateStr)}
        >
          <div className="day-number">{day}</div>
          {dayEvents.length > 0 && (
            <div className="day-events">
              <span className="event-count">{dayEvents.length}</span>
              {dayEvents.map(event => (
                <div 
                  key={event.id}
                  className="mini-event"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return { days, weekdays };
  }, [events, onEventClick, onDateSelect, selectedDate]);

  return (
    <div className="calendar">
      <h2>📆 August 2026</h2>
      <div className="calendar-grid">
        <div className="calendar-header">
          {generateCalendarDays.weekdays.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-body">
          {generateCalendarDays.days}
        </div>
      </div>
    </div>
  );
});

export default Calendar;