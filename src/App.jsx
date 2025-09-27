import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import CalendarView from './components/CalendarView'
// import TimeSlotScheduler from './components/TimeSlotScheduler'
// import TicketList from './components/TicketList'
import TicketForm from './components/TicketForm'
// import FilterTickets from './components/FilterTickets'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  // const { view } = useSelector(state => state.tickets)

  // Only TicketForm should work, rest are commented out
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>⏰ Ticket Scheduling System</h1>
          <p>Schedule and manage your tickets efficiently</p>
        </div>
        <button 
          className="btn-primary create-ticket-btn"
          onClick={() => setShowForm(true)}
        >
          + Schedule New Ticket
        </button>
      </header>

      <main className="App-main">
        {/* <FilterTickets /> */}
        
        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Schedule New Ticket</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>
              <TicketForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}

        <div className="content-area">
          {/* <CalendarView /> */}
          {/* <TimeSlotScheduler /> */}
        </div>
      </main>
    </div>
  )
}

export default App