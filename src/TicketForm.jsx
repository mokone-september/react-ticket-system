import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTicket } from '../redux/ticketSlice'

const TicketForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim()) {
      dispatch(addTicket(formData))
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        assignee: '',
        dueDate: ''
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
      <h3>Create New Ticket</h3>
      
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

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
        <label>Assignee</label>
        <input
          type="text"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          placeholder="Assign to..."
        />
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Create Ticket</button>
        {onClose && <button type="button" onClick={onClose}>Cancel</button>}
      </div>
    </form>
  )
}

export default TicketForm