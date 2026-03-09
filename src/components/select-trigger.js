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
    // Handle Enter and Space key presses
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling
      this.#openDropdown();
    }
  }

  /**
   * Handle click events on the trigger
   * @param {MouseEvent} e - The mouse event
   * @private
   */
  #onClick(e) {
    this.#openDropdown();
  }

  /**
   * Toggle the parent dropdown
   * @private
   */
  #openDropdown() {
    const dropdown = this.closest('select-dropdown')
    if (dropdown && typeof dropdown.show === 'function') {
      dropdown.show()
    }
  }
}
