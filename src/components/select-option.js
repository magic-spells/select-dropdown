/**
 * select-option component
 * @class SelectOption
 * @extends HTMLElement
 */
export class SelectOption extends HTMLElement {
  #handleClick;

  constructor() {
    super();
    this.#handleClick = this.#onClick.bind(this);
  }

  connectedCallback() {
    // Add click event listener
    this.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    // Clean up event listener
    this.removeEventListener('click', this.#handleClick);
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
