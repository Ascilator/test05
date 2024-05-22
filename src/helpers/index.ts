export const formatDate = (date: Date) => {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear().toString();

  return `${d}.${m}.${y}`;
};

export const formatStringToDate = (date: string) => {
  const [d, m, y] = date.split(".");
  return new Date(`${m}.${d}.${y}`);
};
