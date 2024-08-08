export function parseDate(dateStr) {
  const [day, month, year, hours, minutes, seconds] = dateStr.split("-").map(Number);
  if (hours && minutes && seconds) {
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
  return new Date(year, month - 1, day);
}

export function handleCustomDate(date) {
  const dateObj = parseDate(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const customDate = dateObj.toLocaleDateString("pt-BR", options);
  return customDate;
}
