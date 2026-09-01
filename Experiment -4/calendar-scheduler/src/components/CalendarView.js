import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './CalendarView.css';

function CalendarView({ events, onAddEvent, onUpdateEvent, onDeleteEvent }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    date: '',
    time: '',
    description: ''
  });
  
  const calendarRef = useRef(null);

  const handleEventClick = (info) => {
    const event = {
      id: info.event.id,
      title: info.event.title,
      date: info.event.startStr,
      time: info.event.extendedProps.time || '12:00 PM',
      description: info.event.extendedProps.description || 'No description'
    };
    setFormData(event);
    setModalMode('view');
    setShowModal(true);
  };

  const handleDateClick = (info) => {
    const dateStr = info.dateStr;
    const newEvent = {
      id: Date.now().toString(),
      title: 'New Scheduled Post',
      date: dateStr,
      time: '12:00 PM',
      description: 'Enter description here'
    };
    setFormData(newEvent);
    setModalMode('add');
    setShowModal(true);
  };

  const handleEventDrop = (info) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      date: info.event.startStr,
      time: info.event.extendedProps.time || '12:00 PM',
      description: info.event.extendedProps.description || 'No description'
    };
    onUpdateEvent(updatedEvent);
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = `✅ ${info.event.title} moved to ${new Date(info.event.startStr).toDateString()}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleEventResize = (info) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      date: info.event.startStr,
      time: info.event.extendedProps.time || '12:00 PM',
      description: info.event.extendedProps.description || 'No description'
    };
    onUpdateEvent(updatedEvent);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEvent = () => {
    if (modalMode === 'add') {
      onAddEvent({
        ...formData,
        id: Date.now().toString()
      });
    } else if (modalMode === 'edit') {
      onUpdateEvent(formData);
    }
    handleCloseModal();
  };

  const handleDeleteEvent = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDeleteEvent(formData.id);
      handleCloseModal();
    }
  };

  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.date,
    extendedProps: {
      time: event.time,
      description: event.description
    },
    backgroundColor: getRandomColor(),
    borderColor: '#ffffff',
    textColor: '#ffffff'
  }));

  function getRandomColor() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8A5C'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>📊 Content Calendar</h2>
        <div className="calendar-stats">
          <span className="stat-badge">
            📝 Total Posts: {events.length}
          </span>
          <span className="stat-badge">
            📅 This Month: {events.filter(e => 
              new Date(e.date).getMonth() === new Date().getMonth()
            ).length}
          </span>
        </div>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={calendarEvents}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short'
          }}
          height="auto"
          locale="en"
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
          }}
        />
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalMode === 'view' && '📋 Event Details'}
                {modalMode === 'edit' && '✏️ Edit Event'}
                {modalMode === 'add' && '➕ Add New Event'}
              </h3>
              <button className="close-btn" onClick={handleCloseModal}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  className={modalMode === 'view' ? 'disabled-input' : ''}
                />
              </div>

              <div className="form-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  className={modalMode === 'view' ? 'disabled-input' : ''}
                />
              </div>

              <div className="form-group">
                <label>Time:</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  className={modalMode === 'view' ? 'disabled-input' : ''}
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  className={modalMode === 'view' ? 'disabled-input' : ''}
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              {modalMode === 'view' && (
                <>
                  <button className="btn btn-edit" onClick={() => setModalMode('edit')}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-delete" onClick={handleDeleteEvent}>
                    🗑️ Delete
                  </button>
                </>
              )}
              {(modalMode === 'edit' || modalMode === 'add') && (
                <>
                  <button className="btn btn-save" onClick={handleSaveEvent}>
                    💾 Save
                  </button>
                  <button className="btn btn-cancel" onClick={handleCloseModal}>
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;