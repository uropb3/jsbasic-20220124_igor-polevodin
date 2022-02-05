function getMinMax(str) {
  return str
    .split(' ')
    .map(Number)
    .filter(n => !isNaN(n))
    .reduce((r, c) => ({ 
      min: r.min <= c ? r.min : c, 
      max: r.max >= c ? r.max : c 
    }), { 
      min: Number.MAX_VALUE, 
      max: Number.MIN_VALUE
    });
}
