/**
 * select-trigger component
 * @class SelectTrigger
 * @extends HTMLElement
 */
export class SelectTrigger extends HTMLElement {
  #handleKeyDown;
  #handleClick;

  constructor() {
    super();
    // Make the trigger focusable
    this.setAttribute('tabindex', '0');
    this.#handleKeyDown = this.#onKeyDown.bind(this);
    this.#handleClick = this.#onClick.bind(this);
  }

  connectedCallback() {
    // Add icon if not present
    if (!this.querySelector('.select-icon')) {
      const caret = document.createElement('span');
      caret.className = 'select-icon';
      this.appendChild(caret);
    }

    // Add event listeners
    this.addEventListener('keydown', this.#handleKeyDown);
    this.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.#handleKeyDown);
    this.removeEventListener('click', this.#handleClick);
  }

  /**
   * Handle keydown events on the trigger
   * @param {KeyboardEvent} e - The keyboard event
   * @private
   */
  #onKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      this.#toggleDropdown()
      return
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const dropdown = this.closest('select-dropdown')
      if (dropdown && !dropdown.hasAttribute('data-open')) {
        e.stopPropagation()
        this.#toggleDropdown()
      }
    }
  }

  /**
   * Handle click events on the trigger
   * @param {MouseEvent} e - The mouse event
   * @private
   */
  #onClick(e) {
    this.#toggleDropdown();
  }

  /**
   * Toggle the parent dropdown
   * @private
   */
  #toggleDropdown() {
    const dropdown = this.closest('select-dropdown')
    if (!dropdown) return
    if (dropdown.hasAttribute('data-open')) {
      dropdown.hide()
    } else {
      dropdown.show()
    }
  }
}
