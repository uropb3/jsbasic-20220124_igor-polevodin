function factorial(n) {
  if (n === 0) {
    return 1;
  }

  let result = n;  
  while (n > 1) {
    result *= --n;
  }

  return result;
}
