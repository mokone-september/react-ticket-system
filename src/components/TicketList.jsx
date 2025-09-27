import { useSelector } from 'react-redux'
import TicketItem from './TicketItem'
import { formatDate } from '../utils/dateUtils'

const TicketList = () => {
  const { tickets, filter } = useSelector(state => state.tickets)

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true
    return ticket.status === filter
  })

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    // Sort by scheduled date/time first, then by creation date
    if (a.scheduledDate && b.scheduledDate) {
      const dateCompare = new Date(a.scheduledDate) - new Date(b.scheduledDate)
      if (dateCompare !== 0) return dateCompare
      
      if (a.scheduledTime && b.scheduledTime) {
        return a.scheduledTime.localeCompare(b.scheduledTime)
      }
    }
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  const groupTicketsByDate = (tickets) => {
    const groups = {}
    
    tickets.forEach(ticket => {
      const dateKey = ticket.scheduledDate || 'unscheduled'
      
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(ticket)
    })
    
    return groups
  }

  const ticketGroups = groupTicketsByDate(sortedTickets)

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <h2>All Tickets ({sortedTickets.length})</h2>
        <div className="list-filters-info">
          <span className="filter-badge">Filter: {filter}</span>
          <span className="grouping-info">Grouped by date</span>
        </div>
      </div>
      
      {sortedTickets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No tickets found</h3>
          <p>Create your first scheduled ticket to get started!</p>
        </div>
      ) : (
        <div className="ticket-groups">
          {Object.keys(ticketGroups).sort((a, b) => {
            if (a === 'unscheduled') return 1
            if (b === 'unscheduled') return -1
            return new Date(a) - new Date(b)
          }).map(dateKey => (
            <div key={dateKey} className="ticket-group">
              <div className="group-header">
                <h3 className="group-title">
                  {dateKey === 'unscheduled' ? '📅 Unscheduled Tickets' : `📅 ${formatDate(dateKey)}`}
                </h3>
                <span className="group-count">({ticketGroups[dateKey].length} tickets)</span>
              </div>
              
              <div className="group-tickets">
                {ticketGroups[dateKey].map(ticket => (
                  <TicketItem key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TicketList