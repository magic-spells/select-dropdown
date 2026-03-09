/**
 * select-dropdown component that handles the functionality of a custom dropdown
 * @class SelectDropdown
 * @extends HTMLElement
 */
export class SelectDropdown extends HTMLElement {
  static #instanceCount = 0;

  // private fields for elements
  #trigger;
  #input;
  #optionsContainer;
  #label;
  #currentFocusIndex = -1;
  #typeaheadBuffer = '';
  #typeaheadTimer = null;

  /**
   * Live getter for option elements — supports dynamically added/removed options
   * @returns {NodeList}
   * @private
   */
  get #options() {
    return this.querySelectorAll('select-option');
  }

  // Observed attributes
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();
  }

  /**
   * when element is connected to the dom
   */
  connectedCallback() {
    const _ = this;

    _.handlers = {};
    _.queryDOM();
    _.setAttribute('tabindex', '-1');
    _.setupAriaAttributes();
    _.attachListeners();
    _.initializeSelectedOption();
    _.hide();
  }

  /**
   * Queries and caches all DOM elements needed for the component
   * @private
   */
  queryDOM() {
    const _ = this;

    _.#trigger = _.querySelector('select-trigger');
    _.#input = _.querySelector('input');
    _.#optionsContainer = _.querySelector('select-panel');
    _.#label = _.#trigger?.querySelector('.select-label-text');
  }

  /**
   * clean up event listeners when element is removed
   */
  disconnectedCallback() {
    this.detachListeners();
  }

  /**
   * Gets the value from an option element, supporting both 'value' and 'data-value' attributes
   * @param {HTMLElement} option - The option element
   * @returns {string} The option value
   * @private
   */
  #getOptionValue(option) {
    if (option.hasAttribute('value')) return option.getAttribute('value');
    if (option.hasAttribute('data-value')) return option.dataset.value;
    return option.textContent.trim();
  }

  /**
   * Initializes any pre-selected options based on 'selected' attribute
   * @private
   */
  initializeSelectedOption() {
    const _ = this;

    const selectedOption = Array.from(_.#options).find((opt) => opt.hasAttribute('selected'));

    // If we found a selected option, update the component state
    if (selectedOption) {
      // Clear all selections first
      _.#options.forEach((opt) => {
        opt.removeAttribute('selected');
        opt.setAttribute('aria-selected', 'false');
      });

      // Set the selected option (keep both attributes in sync)
      selectedOption.setAttribute('aria-selected', 'true');
      selectedOption.setAttribute('selected', '');

      // Update the input value
      if (_.#input) {
        _.#input.value = _.#getOptionValue(selectedOption);
      }

      // Update the visible label
      if (_.#label) {
        _.#label.textContent = selectedOption.textContent.trim();
      }
    }
  }

  /**
   * sets up aria attributes for accessibility
   */
  setupAriaAttributes() {
    const _ = this;
    const listbox = _.#optionsContainer;
    const trigger = _.#trigger;

    if (!trigger || !listbox) return;

    // setup trigger button
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('role', 'combobox');

    if (!trigger.id) {
      trigger.id = `select-trigger-${++SelectDropdown.#instanceCount}`;
    }

    // setup listbox
    listbox.setAttribute('role', 'listbox');
    listbox.setAttribute('aria-labelledby', trigger.id);

    // setup options
    _.#options.forEach((option, index) => {
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.setAttribute('tabindex', '-1');
      option.id = `${trigger.id}-option-${index}`;
    });
  }

  /**
   * Attaches event listeners to the component
   */
  attachListeners() {
    const _ = this;

    // bind event handlers
    _.handlers.documentClick = _.handleOutsideClick.bind(_);
    _.handlers.keyDown = _.handleKeyboardNavigation.bind(_);

    // listen for form reset to re-sync UI with markup
    const form = _.closest('form');
    if (form) {
      _.handlers.formReset = () => {
        // defer to let the browser reset the hidden input first
        requestAnimationFrame(() => {
          _.initializeSelectedOption();
        });
      };
      form.addEventListener('reset', _.handlers.formReset);
    }
  }

  /**
   * Detaches event listeners from the component
   */
  detachListeners() {
    document.removeEventListener('click', this.handlers.documentClick);
    document.removeEventListener('keydown', this.handlers.keyDown);

    // remove form reset listener
    if (this.handlers.formReset) {
      const form = this.closest('form');
      form?.removeEventListener('reset', this.handlers.formReset);
    }
  }

  /**
   * handles click events outside of the dropdown to hide it
   * @param {Event} e - the click event
   */
  handleOutsideClick(e) {
    // if click is outside of the dropdown, hide it
    if (!this.contains(e.target)) {
      this.hide({ restoreFocus: false });
    }
  }

  /**
   * handles keyboard navigation in the dropdown
   * @param {KeyboardEvent} e - the keyboard event
   */
  handleKeyboardNavigation(e) {
    const _ = this;
    const options = Array.from(_.#options);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        _.hide();
        break;

      case 'ArrowDown':
        e.preventDefault();

        // if focus is on trigger, start from selected option
        if (document.activeElement === _.#trigger) {
          const selectedIndex = options.findIndex(
            (opt) => opt.getAttribute('aria-selected') === 'true'
          );
          _.#currentFocusIndex = selectedIndex >= 0 ? selectedIndex : -1;
        }

        // move to next option
        if (_.#currentFocusIndex < options.length - 1) {
          _.focusOption(_.#currentFocusIndex + 1);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();

        // if focus is on trigger, start from selected option
        if (document.activeElement === _.#trigger) {
          const selectedIndex = options.findIndex(
            (opt) => opt.getAttribute('aria-selected') === 'true'
          );
          if (selectedIndex >= 0) {
            _.focusOption(selectedIndex);
            break;
          }
        }

        // move to previous option
        if (_.#currentFocusIndex > 0) {
          _.focusOption(_.#currentFocusIndex - 1);
        } else if (_.#currentFocusIndex === 0) {
          // if on first option, move focus back to trigger
          _.#trigger.focus();
          _.#currentFocusIndex = -1;
        }
        break;

      case 'Home':
        e.preventDefault();
        _.focusOption(0);
        break;

      case 'End':
        e.preventDefault();
        _.focusOption(options.length - 1);
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();

        // if dropdown is hidden and trigger is focused, show it
        if (!_.hasAttribute('visible') && document.activeElement === _.#trigger) {
          _.show();
          return;
        }

        // if focus is on an option, select it
        if (_.#currentFocusIndex >= 0) {
          _.selectOption({ target: options[_.#currentFocusIndex] });
        } else if (document.activeElement === _.#trigger) {
          _.show();
        }
        break;

      case 'Tab':
        // Close without preventing default — let focus move naturally
        _.hide({ restoreFocus: false });
        break;

      default:
        // handle typeahead - accumulate keystrokes for multi-char matching
        const key = e.key.toLowerCase();

        if (key.length === 1) {
          _.#typeaheadBuffer += key;
          clearTimeout(_.#typeaheadTimer);
          _.#typeaheadTimer = setTimeout(() => {
            _.#typeaheadBuffer = '';
          }, 500);

          const allSameChar = _.#typeaheadBuffer.split('').every((c) => c === key);

          if (allSameChar) {
            // cycle through options starting with this letter
            const startIndex = _.#currentFocusIndex + 1;
            const len = options.length;
            for (let i = 0; i < len; i++) {
              const idx = (startIndex + i) % len;
              if (options[idx].textContent.trim().toLowerCase().startsWith(key)) {
                _.focusOption(idx);
                break;
              }
            }
          } else {
            // multi-char prefix search from the beginning
            const match = options.findIndex((opt) =>
              opt.textContent.trim().toLowerCase().startsWith(_.#typeaheadBuffer)
            );
            if (match >= 0) {
              _.focusOption(match);
            }
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
    const _ = this;
    const options = Array.from(_.#options);

    // reset tabindex on all options
    options.forEach((opt) => {
      opt.setAttribute('tabindex', '-1');
    });

    // set tabindex on target option and focus it
    if (options[index]) {
      options[index].setAttribute('tabindex', '0');
      options[index].focus();
      _.#currentFocusIndex = index;

      // Ensure the option is visible in the dropdown
      options[index].scrollIntoView({
        block: 'nearest',
        behavior: 'instant',
      });
    }
  }

  /**
   * selects an option from the dropdown
   * @param {Event} e - the click event
   */
  selectOption(e) {
    const _ = this;
    const option = e.target.closest('select-option');
    if (!option) return;

    // skip if already selected (match native <select> behavior)
    const isAlreadySelected = option.getAttribute('aria-selected') === 'true';

    if (!isAlreadySelected) {
      // update aria-selected on all options
      _.#options.forEach((opt) => {
        opt.setAttribute('aria-selected', 'false');
        opt.removeAttribute('selected');
      });

      // mark selected option (keep both attributes in sync)
      option.setAttribute('aria-selected', 'true');
      option.setAttribute('selected', '');

      // update the input value
      if (_.#input) {
        _.#input.value = _.#getOptionValue(option);
      }

      // update the visible label
      if (_.#label) {
        _.#label.textContent = option.textContent.trim();
      }

      // dispatch change event
      _.dispatchEvent(
        new CustomEvent('select-dropdown:change', {
          detail: {
            value: _.#getOptionValue(option),
            text: option.textContent.trim(),
          },
          bubbles: true,
        })
      );
    }

    // hide the dropdown
    _.hide();
  }

  /**
   * Positions the panel so the target option overlays the trigger
   * @param {HTMLElement} targetOption - the option to align over the trigger
   * @private
   */
  #positionPanel(targetOption) {
    const _ = this;
    const panel = _.#optionsContainer;
    if (!panel) return;

    const viewportMargin = 8;

    // Clear previous positioning
    panel.style.top = '';
    panel.style.transformOrigin = '';
    panel.style.maxHeight = '';
    panel.scrollTop = 0;

    // Measure geometry
    const hostRect = _.getBoundingClientRect();
    const triggerRect = _.#trigger.getBoundingClientRect();
    const triggerOffset = triggerRect.top - hostRect.top;

    let idealTop = triggerOffset;

    if (targetOption) {
      // Shift panel up so target option aligns over the trigger
      idealTop = triggerOffset - targetOption.offsetTop;

      // Set transform-origin at the target option
      const originY = targetOption.offsetTop + targetOption.offsetHeight / 2;
      panel.style.transformOrigin = `center ${originY}px`;
    }

    // Max-height: from panel's top edge down to viewport bottom
    const panelScreenTop = hostRect.top + idealTop;
    const availableHeight = window.innerHeight - panelScreenTop - viewportMargin;

    // If panel would start above viewport, clamp top and scroll internally
    if (panelScreenTop < viewportMargin) {
      idealTop += viewportMargin - panelScreenTop;
      panel.style.maxHeight = `${window.innerHeight - viewportMargin * 2}px`;

      // Scroll so the target option aligns with the trigger's screen position
      if (targetOption) {
        const triggerScreenY = triggerRect.top - viewportMargin;
        panel.scrollTop = Math.max(0, targetOption.offsetTop - triggerScreenY);
      }
    } else {
      panel.style.maxHeight = `${Math.max(availableHeight, 120)}px`;
    }

    panel.style.top = `${idealTop}px`;
  }

  /**
   * shows the dropdown options
   */
  show() {
    const _ = this;

    // bail if already shown
    if (_.hasAttribute('visible')) return;

    // set attributes for shown state
    _.setAttribute('visible', '');
    _.#optionsContainer.setAttribute('aria-hidden', 'false');
    _.#trigger.setAttribute('aria-expanded', 'true');

    // reset typeahead buffer
    _.#typeaheadBuffer = '';

    // find selected option or default to first
    const options = Array.from(_.#options);
    const selectedOption = options.find((opt) => opt.getAttribute('aria-selected') === 'true');
    const targetOption = selectedOption || options[0];

    // position the panel overlay
    _.#positionPanel(targetOption);

    // focus the target option (deferred to survive browser click focus)
    if (targetOption) {
      requestAnimationFrame(() => {
        if (!_.hasAttribute('visible')) return;
        _.focusOption(options.indexOf(targetOption));
      });
    }

    // add global event listeners
    document.addEventListener('click', _.handlers.documentClick);
    document.addEventListener('keydown', _.handlers.keyDown);

    // dispatch show event
    _.dispatchEvent(new CustomEvent('select-dropdown:show', { bubbles: true }));
  }

  /**
   * hides the dropdown options
   * @param {Object} [options] - hide options
   * @param {boolean} [options.restoreFocus=true] - whether to return focus to the trigger
   */
  hide({ restoreFocus = true } = {}) {
    const _ = this;
    const wasOpen = _.hasAttribute('visible');

    // reset typeahead buffer
    _.#typeaheadBuffer = '';
    clearTimeout(_.#typeaheadTimer);

    // set attributes for hidden state — inline positioning stays
    // so the panel animates out in place (cleared on next show)
    _.removeAttribute('visible');
    _.#optionsContainer?.setAttribute('aria-hidden', 'true');
    _.#trigger?.setAttribute('aria-expanded', 'false');

    // reset the current focus index
    _.#currentFocusIndex = -1;

    // remove global event listeners
    document.removeEventListener('click', _.handlers.documentClick);
    document.removeEventListener('keydown', _.handlers.keyDown);

    // return focus to trigger only when closing an open panel
    if (wasOpen && restoreFocus) {
      _.#trigger?.focus();
    }

    // dispatch hide event
    if (wasOpen) {
      _.dispatchEvent(new CustomEvent('select-dropdown:hide', { bubbles: true }));
    }
  }
}
