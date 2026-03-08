(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SelectDropdown = {}));
})(this, (function (exports) { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "/* select dropdown color variables */\n:root {\n  --select-color-text: #333;\n  --select-color-background: #fff;\n  --select-color-border: #ddd;\n  --select-color-border-hover: #aaa;\n  --select-color-border-dark: #666;\n  --select-color-primary: #4299e1;\n  --select-color-hover: #f0f0f0;\n  --select-color-focus: #e6f7ff;\n  --select-color-selected: #e6f7ff;\n}\n\n/* dropdown component styles */\nselect-dropdown {\n  position: relative;\n  width: 300px;\n  margin-bottom: 1rem;\n  display: block;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: var(--select-color-text);\n  box-sizing: border-box;\n}\n\nselect-dropdown * {\n  box-sizing: border-box;\n}\n\n/* hide dropdown when aria-hidden=\"true\" */\nselect-dropdown[aria-hidden=\"true\"] select-panel {\n  display: none;\n}\n\n/* trigger button styles */\nselect-trigger {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  background-color: var(--select-color-background);\n  border: 1px solid var(--select-color-border);\n  border-radius: 0.25rem;\n  cursor: pointer;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n\nselect-trigger:hover {\n  border-color: var(--select-color-border-hover);\n}\n\nselect-trigger:focus {\n  outline: none;\n  border-color: var(--select-color-primary);\n  box-shadow: 0 0 0 3px\n    color-mix(in srgb, var(--select-color-primary) 25%, transparent);\n}\n\n/* caret icon */\n.select-caret {\n  border-style: solid;\n  border-width: 0.25rem 0.25rem 0;\n  border-color: var(--select-color-border-dark) transparent transparent;\n  margin-left: 0.75rem;\n  transition: transform 0.2s;\n}\n\n/* Flipped caret when expanded (default direction) */\nselect-dropdown:not([direction=\"up\"])\n  select-trigger[aria-expanded=\"true\"]\n  .select-caret {\n  transform: rotate(180deg);\n}\n\n/* Already flipped caret for upward dropdowns when closed */\nselect-dropdown[direction=\"up\"] .select-caret {\n  transform: rotate(180deg);\n  border-width: 0 0.25rem 0.25rem;\n  border-color: transparent transparent var(--select-color-border-dark);\n}\n\n/* Flip back to normal when expanded for upward dropdowns */\nselect-dropdown[direction=\"up\"]\n  select-trigger[aria-expanded=\"true\"]\n  .select-caret {\n  transform: rotate(0);\n}\n\n/* options container */\nselect-panel {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  max-height: 15rem;\n  overflow-y: auto;\n  background-color: var(--select-color-background);\n  border: 1px solid var(--select-color-border);\n  border-radius: 0.25rem;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  z-index: 10;\n}\n\n/* Default direction (down) */\nselect-dropdown:not([direction=\"up\"]) select-panel {\n  top: calc(100% + 0.25rem);\n}\n\n/* Direction up */\nselect-dropdown[direction=\"up\"] select-panel {\n  bottom: calc(100% + 0.25rem);\n}\n\n/* Add some elevation for upward direction to create nice shadow */\nselect-dropdown[direction=\"up\"] select-panel {\n  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);\n}\n\n/* option items */\nselect-option {\n  padding: 0.75rem 1rem;\n  cursor: pointer;\n  transition: background-color 0.2s;\n  display: block;\n}\n\nselect-option:hover {\n  background-color: var(--select-color-hover);\n}\n\nselect-option:focus {\n  outline: none;\n  background-color: var(--select-color-focus);\n  box-shadow: inset 0 0 0 2px var(--select-color-primary);\n}\n\nselect-option[aria-selected=\"true\"] {\n  background-color: var(--select-color-selected);\n  font-weight: 500;\n}\n\n/* hidden input */\nselect-dropdown > input {\n  display: none;\n}\n\n/* divider between option groups */\nselect-divider {\n  display: block;\n  height: 1px;\n  margin: 0.25rem 0;\n  background-color: var(--select-color-border);\n}\n\n/* label for option groups */\nselect-label {\n  display: block;\n  padding: 0.25rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #999;\n  cursor: default;\n  user-select: none;\n}\n";
  styleInject(css_248z);

  /**
   * select-dropdown component that handles the functionality of a custom dropdown
   * @class SelectDropdown
   * @extends HTMLElement
   */
  class SelectDropdown extends HTMLElement {
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

  /**
   * select-trigger component
   * @class SelectTrigger
   * @extends HTMLElement
   */
  class SelectTrigger extends HTMLElement {
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
      // Add caret if not present
      if (!this.querySelector('.select-caret')) {
        const caret = document.createElement('span');
        caret.className = 'select-caret';
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
        this.#toggleDropdown();
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
      const dropdown = this.closest('select-dropdown');
      if (dropdown && typeof dropdown.toggleDropdown === 'function') {
        dropdown.toggleDropdown();
      }
    }
  }

  /**
   * select-panel component
   * @class SelectPanel
   * @extends HTMLElement
   */
  class SelectPanel extends HTMLElement {
    constructor() {
      super();
    }
  }

  /**
   * select-option component
   * @class SelectOption
   * @extends HTMLElement
   */
  class SelectOption extends HTMLElement {
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

  /**
   * select-divider component - visual separator between option groups
   * @class SelectDivider
   * @extends HTMLElement
   */
  class SelectDivider extends HTMLElement {
    constructor() {
      super();
      this.setAttribute('role', 'separator');
    }
  }

  /**
   * select-label component - non-interactive group heading within a select panel
   * @class SelectLabel
   * @extends HTMLElement
   */
  class SelectLabel extends HTMLElement {
    constructor() {
      super();
      this.setAttribute('role', 'presentation');
    }
  }

  /**
   * @file Main entry point for select-dropdown web component
   * @author Cory Schulz
   * @version 1.0.0
   */


  // define custom elements if not already defined
  if (!customElements.get('select-dropdown')) {
    customElements.define('select-dropdown', SelectDropdown);
  }

  if (!customElements.get('select-trigger')) {
    customElements.define('select-trigger', SelectTrigger);
  }

  if (!customElements.get('select-panel')) {
    customElements.define('select-panel', SelectPanel);
  }

  if (!customElements.get('select-option')) {
    customElements.define('select-option', SelectOption);
  }

  if (!customElements.get('select-divider')) {
    customElements.define('select-divider', SelectDivider);
  }

  if (!customElements.get('select-label')) {
    customElements.define('select-label', SelectLabel);
  }

  exports.SelectDivider = SelectDivider;
  exports.SelectDropdown = SelectDropdown;
  exports.SelectLabel = SelectLabel;
  exports.SelectOption = SelectOption;
  exports.SelectPanel = SelectPanel;
  exports.SelectTrigger = SelectTrigger;

}));
