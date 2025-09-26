import { createSlice } from '@reduxjs/toolkit'

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    filter: 'all'
  },
  reducers: {
    addTicket: (state, action) => {
      state.tickets.push({
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        status: 'open'
      })
    },
    updateTicket: (state, action) => {
      const { id, updates } = action.payload
      const ticket = state.tickets.find(t => t.id === id)
      if (ticket) {
        Object.assign(ticket, updates)
      }
    },
    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter(t => t.id !== action.payload)
    },
    toggleTicketStatus: (state, action) => {
      const ticket = state.tickets.find(t => t.id === action.payload)
      if (ticket) {
        ticket.status = ticket.status === 'open' ? 'closed' : 'open'
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  }
})

export const { 
  addTicket, 
  updateTicket, 
  deleteTicket, 
  toggleTicketStatus, 
  setFilter 
} = ticketSlice.actions

export default ticketSlice.reducer