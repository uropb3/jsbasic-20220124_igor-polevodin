function sumSalary(salaries) {
  return Object.values(salaries)
    .filter(v => typeof v === 'number' && !isNaN(v) && isFinite(v))
    .reduce((r, v) => r + v, 0);
}
