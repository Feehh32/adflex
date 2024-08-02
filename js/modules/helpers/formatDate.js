export function parseDate(dateStr) {
  const [day, month, year, hour, minutes, seconds] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day, hour, minutes, seconds);
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
