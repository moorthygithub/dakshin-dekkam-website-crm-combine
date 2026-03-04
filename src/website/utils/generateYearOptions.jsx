const generateYearOptions = (
  startYear = 1950,
  endYear = new Date().getFullYear(),
) => {
  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push({
      label: year.toString(),
      value: year.toString(),
    });
  }

  return years;
};
export default generateYearOptions;
