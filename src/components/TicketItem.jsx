import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTicket, updateTicket } from '../redux/ticketSlice'
import { formatTime, formatDate } from '../utils/dateUtils'

const TicketItem = ({ ticket }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ ...ticket })

  const handleSave = () => {
    dispatch(updateTicket({ id: ticket.id, updates: editData }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ ...ticket })
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus) => {
    dispatch(updateTicket({ id: ticket.id, updates: { status: newStatus } }))
  }

  const priorityColors = {
    low: '#28a745',
    medium: '#ffc107',
    high: '#dc3545'
  }

  const statusColors = {
    scheduled: '#17a2b8',
    inProgress: '#007bff',
    completed: '#28a745',
    cancelled: '#6c757d'
  }

  if (isEditing) {
    return (
      <div className="ticket-item editing">
        <div className="ticket-edit">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="edit-input"
            placeholder="Ticket title"
          />
          
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="edit-textarea"
            placeholder="Description"
            rows="3"
          />
          
          <div className="edit-row">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
              className="edit-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <select
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
              className="edit-select"
            >
              <option value="scheduled">Scheduled</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="edit-row">
            <input
              type="text"
              value={editData.client}
              onChange={(e) => setEditData({ ...editData, client: e.target.value })}
              className="edit-input"
              placeholder="Client name"
            />
            
            <input
              type="number"
              value={editData.duration}
              onChange={(e) => setEditData({ ...editData, duration: parseInt(e.target.value) })}
              className="edit-input"
              placeholder="Duration (minutes)"
            />
          </div>

          <div className="edit-row">
            <input
              type="date"
              value={editData.scheduledDate}
              onChange={(e) => setEditData({ ...editData, scheduledDate: e.target.value })}
              className="edit-input"
            />
            
            <input
              type="time"
              value={editData.scheduledTime}
              onChange={(e) => setEditData({ ...editData, scheduledTime: e.target.value })}
              className="edit-input"
            />
          </div>

          <div className="edit-actions">
            <button onClick={handleSave} className="btn-primary">Save Changes</button>
            <button onClick={handleCancel} className="btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`ticket-item ${ticket.status}`}>
      <div className="ticket-header">
        <div className="ticket-title-section">
          <h4 className="ticket-title">{ticket.title}</h4>
          <div className="ticket-meta-badges">
            <span 
              className="priority-badge"
              style={{ backgroundColor: priorityColors[ticket.priority] }}
            >
              {ticket.priority.toUpperCase()}
            </span>
            <span 
              className="status-badge"
              style={{ backgroundColor: statusColors[ticket.status] }}
            >
              {ticket.status.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="ticket-time-info">
          {ticket.scheduledDate && ticket.scheduledTime && (
            <div className="scheduled-time">
              <span className="time-icon">⏰</span>
              {formatDate(ticket.scheduledDate)} at {formatTime(ticket.scheduledTime)}
              {ticket.duration && (
                <span className="duration"> ({ticket.duration} min)</span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {ticket.description && (
        <p className="ticket-description">{ticket.description}</p>
      )}
      
      <div className="ticket-details">
        {ticket.client && (
          <div className="detail-item">
            <strong>Client:</strong> {ticket.client}
          </div>
        )}
        
        <div className="detail-item">
          <strong>Created:</strong> {formatDate(ticket.createdAt)}
        </div>
        
        {ticket.scheduledDate && (
          <div className="detail-item">
            <strong>Scheduled:</strong> {formatDate(ticket.scheduledDate)}
          </div>
        )}
      </div>

      <div className="ticket-actions">
        <div className="status-buttons">
          <button
            onClick={() => handleStatusChange('scheduled')}
            className={`status-btn ${ticket.status === 'scheduled' ? 'active' : ''}`}
          >
            ⏳ Scheduled
          </button>
          <button
            onClick={() => handleStatusChange('inProgress')}
            className={`status-btn ${ticket.status === 'inProgress' ? 'active' : ''}`}
          >
            🔄 In Progress
          </button>
          <button
            onClick={() => handleStatusChange('completed')}
            className={`status-btn ${ticket.status === 'completed' ? 'active' : ''}`}
          >
            ✅ Completed
          </button>
          <button
            onClick={() => handleStatusChange('cancelled')}
            className={`status-btn ${ticket.status === 'cancelled' ? 'active' : ''}`}
          >
            ❌ Cancelled
          </button>
        </div>
        
        <div className="action-buttons">
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-secondary"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => dispatch(deleteTicket(ticket.id))}
            className="delete-btn"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TicketItem