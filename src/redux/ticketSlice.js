import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: [],
  filter: 'all',
  view: 'calendar', // 'calendar', 'list', 'timeline'
  selectedDate: new Date().toISOString().split('T')[0],
  timeSlots: generateTimeSlots()
}

function generateTimeSlots() {
  const slots = []
  for (let hour = 8; hour <= 18; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      available: true
    })
  }
  return slots
}

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action) => {
      const newTicket = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        status: 'scheduled',
        scheduledTime: action.payload.scheduledTime || null,
        duration: action.payload.duration || 60
      }
      state.tickets.push(newTicket)
    },
    
    updateTicket: (state, action) => {
      const { id, updates } = action.payload
      const ticketIndex = state.tickets.findIndex(ticket => ticket.id === id)
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex] = { ...state.tickets[ticketIndex], ...updates }
      }
    },
    
    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload)
    },
    
    toggleTicketStatus: (state, action) => {
      const ticket = state.tickets.find(ticket => ticket.id === action.payload)
      if (ticket) {
        ticket.status = ticket.status === 'scheduled' ? 'completed' : 
                       ticket.status === 'completed' ? 'cancelled' : 'scheduled'
      }
    },
    
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    
    setView: (state, action) => {
      state.view = action.payload
    },
    
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    
    scheduleTimeSlot: (state, action) => {
      const { time, ticketId } = action.payload
      // Mark time slot as occupied
      const slot = state.timeSlots.find(slot => slot.time === time)
      if (slot) {
        slot.available = false
        slot.ticketId = ticketId
      }
    },
    
    freeTimeSlot: (state, action) => {
      const { time } = action.payload
      const slot = state.timeSlots.find(slot => slot.time === time)
      if (slot) {
        slot.available = true
        delete slot.ticketId
      }
    }
  }
})

export const { 
  addTicket, 
  updateTicket, 
  deleteTicket, 
  toggleTicketStatus, 
  setFilter, 
  setView,
  setSelectedDate,
  scheduleTimeSlot,
  freeTimeSlot
} = ticketSlice.actions

export default ticketSlice.reducer