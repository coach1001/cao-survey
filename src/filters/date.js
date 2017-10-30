export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric' })
  // return date.toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  // return date.toLocaleString(['en-US'], { year: 'numeric', month: 'long', day: '2-digit' })
}