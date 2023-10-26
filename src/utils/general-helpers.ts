export const getLastWeekDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
};

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
};
