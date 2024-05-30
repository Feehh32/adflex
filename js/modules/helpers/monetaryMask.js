export default function monetaryMask(value) {
  const valueTotal = value * 100;
  const valueFiltered = (valueTotal / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return valueFiltered;
}
