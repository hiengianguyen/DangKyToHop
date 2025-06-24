function convertToVietnameseDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const vietnameseDateTime = date.toLocaleString("vi-VN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  return vietnameseDateTime;
}

module.exports = { convertToVietnameseDateTime };
