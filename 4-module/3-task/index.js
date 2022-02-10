function highlight(table) {
  for (const row of table.tBodies[0].rows) {
    if (row.cells[3].hasAttribute('data-available')) {
      row.classList.add(row.cells[3].getAttribute('data-available') === 'true' ? 'available' : 'unavailable');
    } else {
      row.setAttribute('hidden', '');
    }

    row.classList.add(row.cells[2].textContent === 'm' ? 'male' : 'female');

    if (parseInt(row.cells[1].textContent) < 18) {
      row.setAttribute('style', 'text-decoration: line-through')
    }
  }
}
