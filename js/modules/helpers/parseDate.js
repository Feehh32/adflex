export default function parseDate(dateStr) {
  const [day, month, year, hour, minutes, seconds] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day, hour, minutes, seconds);
}
