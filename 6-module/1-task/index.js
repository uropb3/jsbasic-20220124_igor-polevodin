/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');

    this.elem.createTHead().insertAdjacentHTML(
      'beforeEnd', 
      `<tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>`
    );

    const tBody = this.elem.createTBody();
    for (const row of rows) {
      const tr = document.createElement('tr');

      tr.insertAdjacentHTML('beforeEnd', `<td>${row.name}</td>`);
      tr.insertAdjacentHTML('beforeEnd', `<td>${row.age}</td>`);
      tr.insertAdjacentHTML('beforeEnd', `<td>${row.salary}</td>`);
      tr.insertAdjacentHTML('beforeEnd', `<td>${row.city}</td>`);
      
      const button = document.createElement('button');
      button.textContent = 'X';
      button.addEventListener('click', () => tBody.removeChild(tr));
      const buttonTd = document.createElement('td');
      buttonTd.append(button);
      tr.append(buttonTd);
      
      tBody.append(tr);
    }
  }
}
