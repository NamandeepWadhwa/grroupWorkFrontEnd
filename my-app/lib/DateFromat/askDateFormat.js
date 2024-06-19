function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
  return `${year}-${month}-${day}`;
}
module.exports = {formatDate};