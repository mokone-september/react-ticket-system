import { useDispatch, useSelector } from 'react-redux'
import { addTicket, scheduleTimeSlot } from '../redux/ticketSlice'
import { formatTime, addMinutes } from '../utils/dateUtils'
import { useState } from 'react'
// Removed missing TimeSlotScheduler.css import

const TimeSlotScheduler = () => {
  const dispatch = useDispatch()
  const { selectedDate, timeSlots, tickets } = useSelector(state => state.tickets)
  const [showForm, setShowForm] = useState(false)
  const [selectedTime, setSelectedTime] = useState(null)

  const getTicketForSlot = (time) => {
    return tickets.find(ticket => 
      ticket.scheduledDate === selectedDate && 
      ticket.scheduledTime === time
    )
  }

  const handleTimeSlotClick = (time) => {
    const existingTicket = getTicketForSlot(time)
    if (!existingTicket) {
      setSelectedTime(time)
      setShowForm(true)
    }
  }

  const handleFormSubmit = (ticketData) => {
    const ticketWithSchedule = {
      ...ticketData,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      duration: ticketData.duration || 60
    }
    
    dispatch(addTicket(ticketWithSchedule))
    dispatch(scheduleTimeSlot({ time: selectedTime, ticketId: Date.now().toString() }))
    setShowForm(false)
    setSelectedTime(null)
  }

  return (
    <div className="time-slot-scheduler">
      <div className="scheduler-header">
        <h3>Schedule for {new Date(selectedDate).toLocaleDateString()}</h3>
        <div className="timezone-info">All times in local timezone</div>
      </div>

      <div className="time-slots-grid">
        {timeSlots.map((slot, index) => {
          const ticket = getTicketForSlot(slot.time)
          const endTime = addMinutes(slot.time, ticket?.duration || 60)
          
          return (
            <div 
              key={index}
              className={`time-slot ${ticket ? 'occupied' : 'available'} ${ticket?.priority}`}
              onClick={() => handleTimeSlotClick(slot.time)}
            >
              <div className="time-range">
                {formatTime(slot.time)} - {formatTime(endTime)}
              </div>
              
              {ticket ? (
                <div className="slot-content">
                  <div className="ticket-title">{ticket.title}</div>
                  <div className="ticket-client">{ticket.client}</div>
                  <div className="ticket-status">{ticket.status}</div>
                </div>
              ) : (
                <div className="slot-content available">
                  Click to schedule
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showForm && (
        <QuickTicketForm 
          time={selectedTime}
          date={selectedDate}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false)
            setSelectedTime(null)
          }}
        />
      )}
    </div>
  )
}

const QuickTicketForm = ({ time, date, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    description: '',
    priority: 'medium',
    duration: 60,
    scheduledDate: date // initialize with passed date
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="quick-form-overlay">
      <div className="quick-form">
        <h4>Schedule Ticket for {formatTime(time)}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={formData.scheduledDate}
              onChange={e => setFormData({ ...formData, scheduledDate: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Ticket title *"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Client name"
              value={formData.client}
              onChange={(e) => setFormData({...formData, client: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div className="form-group">
              <select 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
              >
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Schedule</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TimeSlotScheduler