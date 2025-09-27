export const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const getMonthName = (date) => {
  return date.toLocaleDateString('en-US', { month: 'long' })
}

export const getYear = (date) => {
  return date.getFullYear()
}