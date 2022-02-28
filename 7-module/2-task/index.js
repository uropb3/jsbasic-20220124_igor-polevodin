import createElement from '../../assets/lib/create-element.js';

function closeModal() {
  const modal = document.body.querySelector('.modal');
  if (modal) {
    modal.remove();
  }

  document.body.classList.remove('is-modal-open');

  document.removeEventListener('keydown', closeOnKeyDown);
}

function closeOnKeyDown(e) {
  if (e.code === 'Escape') {
    closeModal(); 
  }
}

export default class Modal {
  constructor() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.elem.querySelector('.modal__close').addEventListener('click', closeModal);
  }

  open() {
    document.body.append(this.elem);

    document.body.classList.add('is-modal-open');

    document.addEventListener('keydown', closeOnKeyDown);
  }

  setTitle(modalTitle) {
    this.elem.querySelector('.modal__title').textContent = modalTitle;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector('.modal__body'); 

    while (modalBody.firstChild) {
      modalBody.firstChild.remove();
    }    

    modalBody.append(node);
  }

  close() {
    closeModal();
  }
}
