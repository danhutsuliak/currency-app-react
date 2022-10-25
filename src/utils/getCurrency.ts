export const getCurrency = async () => {
  const response = await fetch(
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
  );
  const data = await response.json();

  return data;
};
