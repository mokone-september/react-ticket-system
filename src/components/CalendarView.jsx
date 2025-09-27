import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDate } from '../redux/ticketSlice'
import { getWeekDates, isSameDay, formatDate } from '../utils/dateUtils'
import { useState } from 'react'
import './CalendarView.css'

const CalendarView = () => {
  const dispatch = useDispatch()
  const { selectedDate, tickets } = useSelector(state => state.tickets)
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate))
  
  const weekDates = getWeekDates(currentDate)

  const getTicketsForDate = (date) => {
    return tickets.filter(ticket => 
      ticket.scheduledDate === date.toISOString().split('T')[0]
    )
  }

  const getDateClass = (date) => {
    const classes = ['calendar-day']
    if (isSameDay(date, new Date(selectedDate))) classes.push('active')
    if (isSameDay(date, new Date())) classes.push('today')
    if (date.getDay() === 0 || date.getDay() === 6) classes.push('weekend')
    if (date < new Date().setHours(0, 0, 0, 0)) classes.push('past')
    return classes.join(' ')
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + (direction * 7))
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    dispatch(setSelectedDate(today.toISOString().split('T')[0]))
  }

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h3>Weekly Calendar</h3>
        <div className="calendar-navigation">
          <button className="nav-btn" onClick={() => navigateWeek(-1)}>
            ← Previous Week
          </button>
          <div className="current-week">
            {formatDate(weekDates[0].toISOString())} - {formatDate(weekDates[6].toISOString())}
          </div>
          <button className="nav-btn" onClick={() => navigateWeek(1)}>
            Next Week →
          </button>
          <button className="nav-btn" onClick={goToToday}>
            Today
          </button>
        </div>
      </div>
      
      <div className="calendar-grid">
        {weekDates.map((date, index) => {
          const dateTickets = getTicketsForDate(date)
          const completedTickets = dateTickets.filter(t => t.status === 'completed').length
          const pendingTickets = dateTickets.filter(t => t.status !== 'completed').length

          return (
            <div 
              key={index}
              className={getDateClass(date)}
              onClick={() => dispatch(setSelectedDate(date.toISOString().split('T')[0]))}
            >
              <div className="day-header">
                <span className="day-name">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="day-number">
                  {date.getDate()}
                </span>
              </div>
              
              <div className="day-tickets">
                {dateTickets.slice(0, 4).map(ticket => (
                  <div 
                    key={ticket.id} 
                    className={`ticket-badge ${ticket.priority} ${ticket.status}`}
                    title={`${ticket.title} (${ticket.status})`}
                  >
                    {ticket.title}
                  </div>
                ))}
                {dateTickets.length > 4 && (
                  <div className="more-tickets">
                    +{dateTickets.length - 4} more
                  </div>
                )}
              </div>

              <div className="day-stats">
                <div className="stat-item">
                  <span>✅ {completedTickets}</span>
                </div>
                <div className="stat-item">
                  <span>📋 {pendingTickets}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarView