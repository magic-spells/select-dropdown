/**
 * select-option component
 * @class SelectOption
 * @extends HTMLElement
 */
export class SelectOption extends HTMLElement {
  constructor() {
    super();
    this.handlers = {};
    this.handlers.click = this.#onClick.bind(this);
  }

  connectedCallback() {
    this.attachListeners();
  }

  disconnectedCallback() {
    this.detachListeners();
  }

  /**
   * Attaches event listeners to the option
   */
  attachListeners() {
    this.addEventListener('click', this.handlers.click);
  }

  /**
   * Detaches event listeners from the option
   */
  detachListeners() {
    this.removeEventListener('click', this.handlers.click);
  }

  /**
   * Handle click events on the option
   * @param {MouseEvent} e - The mouse event
   * @private
   */
  #onClick(e) {
    e.preventDefault();
    this.#notifySelection();
  }

  /**
   * Notify the parent dropdown that this option was selected
   * @private
   */
  #notifySelection() {
    const dropdown = this.closest('select-dropdown');
    if (dropdown && typeof dropdown.selectOption === 'function') {
      dropdown.selectOption({ target: this });
    }
  }
}
