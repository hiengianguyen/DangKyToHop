function convertVietnameseDatetimeToDate(dateTimeStr) {
  const [timePart, datePart] = dateTimeStr.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
}

module.exports = { convertVietnameseDatetimeToDate };
