import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setView } from '../redux/ticketSlice'

const FilterTickets = () => {
  const dispatch = useDispatch()
  const { filter, view, tickets } = useSelector(state => state.tickets)

  const statusCounts = {
    all: tickets.length,
    scheduled: tickets.filter(t => t.status === 'scheduled').length,
    inProgress: tickets.filter(t => t.status === 'inProgress').length,
    completed: tickets.filter(t => t.status === 'completed').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length
  }

  const views = [
    { key: 'calendar', label: 'Calendar', icon: '📅' },
    { key: 'timeline', label: 'Timeline', icon: '⏰' },
    { key: 'list', label: 'List', icon: '📋' }
  ]

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'inProgress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' }
  ]

  return (
    <div className="filter-controls">
      <div className="view-selector">
        <span>View:</span>
        {views.map(({ key, label, icon }) => (
          <button
            key={key}
            className={`view-btn ${view === key ? 'active' : ''}`}
            onClick={() => dispatch(setView(key))}
            title={label}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      <div className="filter-buttons">
        <span>Filter:</span>
        {filters.map(({ key, label }) => (
          <button
            key={key}
            className={`filter-btn ${filter === key ? 'active' : ''}`}
            onClick={() => dispatch(setFilter(key))}
          >
            {label} ({statusCounts[key]})
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterTickets