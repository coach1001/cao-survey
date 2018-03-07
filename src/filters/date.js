export default (value) => {
  const date = new Date(value)
  let dateString
  dateString = date.toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
  if (dateString === 'Invalid Date') {
    return 'No Date'
  } else {
    return dateString
  }
}
