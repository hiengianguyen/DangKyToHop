function convertVietnameseDatetimeToDate(dateTimeString) {
  const [timePart, datePart] = dateTimeString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

module.exports = { convertVietnameseDatetimeToDate };
