import { useState } from 'react'
import TicketForm from './components/TicketForm'
import TicketList from './components/TicketList'
import FilterTickets from './components/FilterTickets'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ticket Scheduling System</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Create New Ticket
        </button>
      </header>

      <main className="App-main">
        <FilterTickets />
        
        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <TicketForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}

        <TicketList />
      </main>
    </div>
  )
}

export default App