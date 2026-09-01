import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Calendar from '../components/Calendar';
import EventList from '../components/EventList';
import App from '../App';

describe('Calendar Component Tests', () => {
  const mockEvents = [
    { id: 1, title: 'Test Meeting', date: '2026-08-10', time: '10:00 AM' },
    { id: 2, title: 'Project Review', date: '2026-08-12', time: '2:00 PM' },
  ];

  const mockHandlers = {
    onEventClick: jest.fn(),
    onDateSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders calendar component with correct heading', () => {
    render(
      <Calendar 
        events={mockEvents} 
        onEventClick={mockHandlers.onEventClick}
        onDateSelect={mockHandlers.onDateSelect}
        selectedDate={null}
      />
    );
    expect(screen.getByText(/📆 August 2026/i)).toBeInTheDocument();
  });

  test('displays weekday headers', () => {
    render(
      <Calendar 
        events={mockEvents} 
        onEventClick={mockHandlers.onEventClick}
        onDateSelect={mockHandlers.onDateSelect}
        selectedDate={null}
      />
    );
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
  });

  test('handles date selection when clicking on a calendar cell', async () => {
    render(
      <Calendar 
        events={mockEvents} 
        onEventClick={mockHandlers.onEventClick}
        onDateSelect={mockHandlers.onDateSelect}
        selectedDate={null}
      />
    );

    // Find the first calendar cell (day 1)
    const dayCells = screen.getAllByText('1');
    fireEvent.click(dayCells[0]);
    
    expect(mockHandlers.onDateSelect).toHaveBeenCalled();
  });
});

describe('EventList Component Tests', () => {
  const mockEvents = [
    { id: 1, title: 'Test Meeting', date: '2026-08-10', time: '10:00 AM' },
    { id: 2, title: 'Project Review', date: '2026-08-12', time: '2:00 PM' },
  ];

  const mockHandlers = {
    onEventClick: jest.fn(),
    onDeleteEvent: jest.fn(),
    onAddEvent: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders event list with events', () => {
    render(
      <EventList 
        events={mockEvents} 
        onEventClick={mockHandlers.onEventClick}
        onDeleteEvent={mockHandlers.onDeleteEvent}
        onAddEvent={mockHandlers.onAddEvent}
      />
    );
    expect(screen.getByText('Test Meeting')).toBeInTheDocument();
    expect(screen.getByText('Project Review')).toBeInTheDocument();
  });

  test('shows no events message when list is empty', () => {
    render(
      <EventList 
        events={[]} 
        onEventClick={mockHandlers.onEventClick}
        onDeleteEvent={mockHandlers.onDeleteEvent}
        onAddEvent={mockHandlers.onAddEvent}
      />
    );
    expect(screen.getByText('No events found')).toBeInTheDocument();
  });

  test('handles event click', () => {
    render(
      <EventList 
        events={mockEvents} 
        onEventClick={mockHandlers.onEventClick}
        onDeleteEvent={mockHandlers.onDeleteEvent}
        onAddEvent={mockHandlers.onAddEvent}
      />
    );
    
    const eventElement = screen.getByText('Test Meeting');
    fireEvent.click(eventElement);
    
    expect(mockHandlers.onEventClick).toHaveBeenCalledWith(mockEvents[0]);
  });

  test('handles event deletion', () => {
    render(
      <EventList 
        events={mockEvents} 
        onEventClick={mockHandlers.onEventClick}
        onDeleteEvent={mockHandlers.onDeleteEvent}
        onAddEvent={mockHandlers.onAddEvent}
      />
    );
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockHandlers.onDeleteEvent).toHaveBeenCalledWith(1);
  });

  test('handles adding new event', async () => {
    const user = userEvent.setup();
    render(
      <EventList 
        events={mockEvents} 
        onEventClick={mockHandlers.onEventClick}
        onDeleteEvent={mockHandlers.onDeleteEvent}
        onAddEvent={mockHandlers.onAddEvent}
      />
    );

    const titleInput = screen.getByPlaceholderText('Event title...');
    const dateInput = screen.getByPlaceholderText('YYYY-MM-DD');
    const addButton = screen.getByText('Add Event');

    await user.type(titleInput, 'New Test Event');
    await user.type(dateInput, '2026-08-25');

    fireEvent.change(dateInput, { target: { value: '2026-08-25' } });
    await user.click(addButton);

    expect(mockHandlers.onAddEvent).toHaveBeenCalledWith({
      title: 'New Test Event',
      date: '2026-08-25',
      time: '12:00 PM'
    });
  });
});

describe('App Integration Tests', () => {
  test('renders calendar application with all components', () => {
    render(<App />);
    expect(screen.getByText('📅 Calendar Application')).toBeInTheDocument();
    expect(screen.getByText('📆 August 2026')).toBeInTheDocument();
    expect(screen.getByText('📋 Event List')).toBeInTheDocument();
  });

  test('filters events based on search input', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Search events...');
    await user.type(searchInput, 'Team Meeting');

    await waitFor(() => {
      expect(screen.getByText('Team Meeting')).toBeInTheDocument();
    });
  });
});