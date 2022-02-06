function camelize(str) {
  return str
    .split('-')
    .map((s, i) => i > 0 ? s.substring(0, 1).toUpperCase() + s.substring(1, s.length) : s)
    .join('');
}
