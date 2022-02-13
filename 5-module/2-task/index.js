function toggleText() {
  const text = document.querySelector('#text');
  
  document.querySelector('.toggle-text-button').addEventListener('click', () => text.hidden = !text.hidden);
}
