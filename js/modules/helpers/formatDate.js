// Função que recebe uma string com a data e então transforma
// em um objeto javascript do tipo date
export function parseDate(dateStr) {
  const [day, month, year, hours, minutes, seconds] = dateStr.split("-").map(Number);
  if (hours && minutes && seconds) {
    return new Date(year, month - 1, day, hours, minutes, seconds);
  }
  return new Date(year, month - 1, day);
}

// Função que pega um objeto javascript do tipo date e cria uma exibição
// personalizada da data
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
