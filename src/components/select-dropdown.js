/**
 * select-dropdown component that handles the functionality of a custom dropdown
 * @class SelectDropdown
 * @extends HTMLElement
 */
export class SelectDropdown extends HTMLElement {
  // private fields for event handlers
  #handleDocumentClick;
  #handleKeyDown;

  // private fields for elements
  #trigger;
  #input;
  #optionsContainer;
  #options;
  #label;
  #currentFocusIndex = -1;

  // Observed attributes
  static get observedAttributes() {
    return ['position'];
  }

  constructor() {
    super();

    // set default attributes
    this.setAttribute('aria-hidden', 'true');

    // bind event handlers
    this.#handleDocumentClick = this.handleOutsideClick.bind(this);
    this.#handleKeyDown = this.handleKeyboardNavigation.bind(this);
  }

  /**
   * when element is connected to the dom
   */
  connectedCallback() {
    // query all dom elements needed for the component
    this.#trigger = this.querySelector('select-trigger');
    this.#input = this.querySelector('input');
    this.#optionsContainer = this.querySelector('select-panel');
    this.#options = this.querySelectorAll('select-option');
    this.#label = this.#trigger?.querySelector('.select-label-text');

    // Make sure the component itself isn't focusable
    this.setAttribute('tabindex', '-1');

    // initialize component
    this.setupAriaAttributes();
    this.bindUI();
    this.initializeSelectedOption();

    // set initial state
    this.hide();
  }

  /**
   * clean up event listeners when element is removed
   */
  disconnectedCallback() {
    this.unbindUI();
  }

  /**
   * Gets the value from an option element, supporting both 'value' and 'data-value' attributes
   * @param {HTMLElement} option - The option element
   * @returns {string} The option value
   * @private
   */
  #getOptionValue(option) {
    return option.getAttribute('value') || option.dataset.value || option.textContent.trim();
  }

  /**
   * Initializes any pre-selected options based on 'selected' attribute or existing aria-selected
   * @private
   */
  initializeSelectedOption() {
    // Look for options with 'selected' attribute first
    let selectedOption = Array.from(this.#options).find(
      (opt) => opt.hasAttribute('selected')
    );

    // If no 'selected' attribute, look for aria-selected="true"
    if (!selectedOption) {
      selectedOption = Array.from(this.#options).find(
        (opt) => opt.getAttribute('aria-selected') === 'true'
      );
    }

    // If we found a selected option, update the component state
    if (selectedOption) {
      // Clear all selections first
      this.#options.forEach((opt) => {
        opt.removeAttribute('selected');
        opt.setAttribute('aria-selected', 'false');
      });

      // Set the selected option (keep both attributes in sync)
      selectedOption.setAttribute('aria-selected', 'true');
      selectedOption.setAttribute('selected', '');

      // Update the input value
      if (this.#input) {
        this.#input.value = this.#getOptionValue(selectedOption);
      }

      // Update the visible label
      if (this.#label) {
        this.#label.textContent = selectedOption.textContent.trim();
      }

      // Dispatch change event for initial state
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            value: this.#getOptionValue(selectedOption),
            text: selectedOption.textContent.trim(),
          },
          bubbles: true,
        })
      );
    }
  }

  /**
   * sets up aria attributes for accessibility
   */
  setupAriaAttributes() {
    const listbox = this.#optionsContainer;
    const trigger = this.#trigger;

    // setup trigger button
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('role', 'combobox');

    if (!trigger.id) {
      trigger.id = `select-trigger-${Date.now()}`;
    }

    // setup listbox
    listbox.setAttribute('role', 'listbox');
    listbox.setAttribute('aria-labelledby', trigger.id);

    // setup options
    this.#options.forEach((option, index) => {
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.setAttribute('tabindex', '-1');
      option.id = `${trigger.id}-option-${index}`;
    });
  }

  /**
   * binds the necessary ui events to the component
   */
  bindUI() {
    // No need to bind element events - child components manage their own events
    // This method is kept for potential future global event binding
  }

  /**
   * unbinds event listeners
   */
  unbindUI() {
    // No element events to remove - child components manage their own events
    // This method is kept for potential future global event cleanup

    // remove document events if they exist
    document.removeEventListener('click', this.#handleDocumentClick);
    document.removeEventListener('keydown', this.#handleKeyDown);
  }

  /**
   * handles click events outside of the dropdown to close it
   * @param {Event} e - the click event
   */
  handleOutsideClick(e) {
    // if click is outside of the dropdown, close it
    if (!this.contains(e.target)) {
      this.hide();
    }
  }

  /**
   * handles keyboard navigation in the dropdown
   * @param {KeyboardEvent} e - the keyboard event
   */
  handleKeyboardNavigation(e) {
    const options = Array.from(this.#options);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.hide();
        break;

      case 'ArrowDown':
        e.preventDefault();

        // if focus is on trigger, move to first option
        if (document.activeElement === this.#trigger) {
          this.#currentFocusIndex = -1;
        }

        // move to next option or loop to first
        if (this.#currentFocusIndex < options.length - 1) {
          this.focusOption(this.#currentFocusIndex + 1);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();

        // move to previous option or loop to last
        if (this.#currentFocusIndex > 0) {
          this.focusOption(this.#currentFocusIndex - 1);
        } else if (this.#currentFocusIndex === 0) {
          // if on first option, move focus back to trigger
          this.#trigger.focus();
          this.#currentFocusIndex = -1;
        }
        break;

      case 'Home':
        e.preventDefault();
        this.focusOption(0);
        break;

      case 'End':
        e.preventDefault();
        this.focusOption(options.length - 1);
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();

        // if dropdown is closed and trigger is focused, open it
        if (
          this.getAttribute('aria-hidden') === 'true' &&
          document.activeElement === this.#trigger
        ) {
          this.show();
          return;
        }

        // if focus is on an option, select it
        if (this.#currentFocusIndex >= 0) {
          this.selectOption({ target: options[this.#currentFocusIndex] });
        } else if (document.activeElement === this.#trigger) {
          // if focus is on trigger, toggle the dropdown
          this.toggleDropdown();
        }
        break;

      default:
        // handle typeahead - find option starting with pressed key
        const key = e.key.toLowerCase();

        // only proceed if it's a single character
        if (key.length === 1) {
          // find the first option that starts with the pressed key
          const matchingOption = options.find((option) =>
            option.textContent.trim().toLowerCase().startsWith(key)
          );

          if (matchingOption) {
            const index = options.indexOf(matchingOption);
            this.focusOption(index);
          }
        }
        break;
    }
  }

  /**
   * focuses a specific option by index
   * @param {number} index - the index of the option to focus
   */
  focusOption(index) {
    const options = Array.from(this.#options);

    // reset tabindex on all options
    options.forEach((opt) => {
      opt.setAttribute('tabindex', '-1');
    });

    // set tabindex on target option and focus it
    if (options[index]) {
      options[index].setAttribute('tabindex', '0');
      options[index].focus();
      this.#currentFocusIndex = index;

      // Ensure the option is visible in the dropdown
      options[index].scrollIntoView({
        block: 'nearest', // Only scroll if needed
        behavior: 'smooth' // Smooth scroll for better UX during keyboard nav
      });
    }
  }

  /**
   * toggles the dropdown open/closed
   */
  toggleDropdown() {
    if (this.getAttribute('aria-hidden') === 'true') {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * selects an option from the dropdown
   * @param {Event} e - the click event
   */
  selectOption(e) {
    const option = e.target.closest('select-option');
    if (!option) return;

    // update aria-selected on all options
    this.#options.forEach((opt) => {
      opt.setAttribute('aria-selected', 'false');
      opt.removeAttribute('selected');
    });

    // mark selected option (keep both attributes in sync)
    option.setAttribute('aria-selected', 'true');
    option.setAttribute('selected', '');

    // update the input value
    if (this.#input) {
      this.#input.value = this.#getOptionValue(option);
    }

    // update the visible label
    if (this.#label) {
      this.#label.textContent = option.textContent.trim();
    }

    // dispatch change event
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: this.#getOptionValue(option),
          text: option.textContent.trim(),
        },
        bubbles: true,
      })
    );

    // close the dropdown
    this.hide();
  }

  /**
   * Determines if the dropdown should open upward based on available space
   * @private
   */
  #determineDirection() {
    // If position is explicitly set, honor that
    const userPosition = this.getAttribute('position');
    if (userPosition === 'up' || userPosition === 'down') {
      return userPosition;
    }

    // Calculate available space
    const rect = this.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const estimatedOptionsHeight = Math.min(
      this.#options.length * 40, // Rough estimate of option height
      parseInt(getComputedStyle(this).getPropertyValue('--options-max-height') || '15rem') * 16 // Convert rem to px
    );

    // Determine if there's not enough space below, but more space above
    if (spaceBelow < estimatedOptionsHeight && rect.top > estimatedOptionsHeight) {
      return 'up';
    }

    // Default to down
    return 'down';
  }

  /**
   * shows the dropdown options
   */
  show() {
    // Determine direction to open
    const direction = this.#determineDirection();
    this.setAttribute('direction', direction);

    // set attributes for open state
    this.setAttribute('aria-hidden', 'false');
    this.#trigger.setAttribute('aria-expanded', 'true');

    // find selected option or default to first
    const selectedOption = Array.from(this.#options).find(
      (opt) => opt.getAttribute('aria-selected') === 'true'
    );

    if (selectedOption) {
      const selectedIndex = Array.from(this.#options).indexOf(selectedOption);
      this.focusOption(selectedIndex);
      // For initial open, ensure selected item is centered for better visibility
      selectedOption.scrollIntoView({
        block: 'center',  // Center the selected item in view
        behavior: 'instant' // No animation on initial open
      });
    } else if (this.#options.length > 0) {
      this.focusOption(0);
    }

    // add global event listeners
    document.addEventListener('click', this.#handleDocumentClick);
    document.addEventListener('keydown', this.#handleKeyDown);
  }

  /**
   * hides the dropdown options
   */
  hide() {
    // set attributes for closed state
    this.setAttribute('aria-hidden', 'true');
    this.#trigger.setAttribute('aria-expanded', 'false');

    // Remove direction attribute
    this.removeAttribute('direction');

    // reset the current focus index
    this.#currentFocusIndex = -1;

    // remove global event listeners
    document.removeEventListener('click', this.#handleDocumentClick);
    document.removeEventListener('keydown', this.#handleKeyDown);

    // return focus to trigger
    this.#trigger.focus();
  }
}
