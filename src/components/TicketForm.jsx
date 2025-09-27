import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTicket } from '../redux/ticketSlice'
import { formatTime } from '../utils/dateUtils'

const TicketForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const { selectedDate, timeSlots } = useSelector(state => state.tickets)
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    description: '',
    priority: 'medium',
    duration: 60,
    scheduledTime: '',
    scheduledDate: selectedDate
  })

  const availableSlots = timeSlots.filter(slot => slot.available)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      dispatch(addTicket(formData))
      setFormData({
        title: '',
        client: '',
        description: '',
        priority: 'medium',
        duration: 60,
        scheduledTime: '',
        scheduledDate: selectedDate
      })
      if (onClose) onClose()
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <h3>Schedule New Ticket</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="What needs to be done?"
          />
        </div>

        <div className="form-group">
          <label>Client</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Client name"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Detailed description..."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          >
            <option value="30">30 min</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
            <option value="180">3 hours</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Time Slot</label>
          <select
            name="scheduledTime"
            value={formData.scheduledTime}
            onChange={handleChange}
          >
            <option value="">Select time</option>
            {availableSlots.map(slot => (
              <option key={slot.time} value={slot.time}>
                {formatTime(slot.time)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">Schedule Ticket</button>
        {onClose && (
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TicketForm