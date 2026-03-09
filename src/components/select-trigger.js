/**
 * select-trigger component
 * @class SelectTrigger
 * @extends HTMLElement
 */
export class SelectTrigger extends HTMLElement {
  constructor() {
    super();
    // Make the trigger focusable
    this.setAttribute('tabindex', '0');
    this.handlers = {};
    this.handlers.keyDown = this.#onKeyDown.bind(this);
    this.handlers.click = this.#onClick.bind(this);
  }

  connectedCallback() {
    // Add icon if not present
    if (!this.querySelector('.select-icon')) {
      const caret = document.createElement('span');
      caret.className = 'select-icon';
      this.appendChild(caret);
    }

    this.attachListeners();
  }

  disconnectedCallback() {
    this.detachListeners();
  }

  /**
   * Attaches event listeners to the trigger
   */
  attachListeners() {
    this.addEventListener('keydown', this.handlers.keyDown);
    this.addEventListener('click', this.handlers.click);
  }

  /**
   * Detaches event listeners from the trigger
   */
  detachListeners() {
    this.removeEventListener('keydown', this.handlers.keyDown);
    this.removeEventListener('click', this.handlers.click);
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
      if (dropdown && !dropdown.hasAttribute('visible')) {
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
    if (dropdown.hasAttribute('visible')) {
      dropdown.hide()
    } else {
      dropdown.show()
    }
  }
}
