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
    return [];
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
    const _ = this

    _.queryDOM()
    _.setAttribute('tabindex', '-1')
    _.setupAriaAttributes()
    _.bindUI()
    _.initializeSelectedOption()
    _.hide()
  }

  /**
   * Queries and caches all DOM elements needed for the component
   * @private
   */
  queryDOM() {
    const _ = this

    _.#trigger = _.querySelector('select-trigger')
    _.#input = _.querySelector('input')
    _.#optionsContainer = _.querySelector('select-panel')
    _.#options = _.querySelectorAll('select-option')
    _.#label = _.#trigger?.querySelector('.select-label-text')
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
    const _ = this

    // Look for options with 'selected' attribute first
    let selectedOption = Array.from(_.#options).find(
      (opt) => opt.hasAttribute('selected')
    )

    // If no 'selected' attribute, look for aria-selected="true"
    if (!selectedOption) {
      selectedOption = Array.from(_.#options).find(
        (opt) => opt.getAttribute('aria-selected') === 'true'
      )
    }

    // If we found a selected option, update the component state
    if (selectedOption) {
      // Clear all selections first
      _.#options.forEach((opt) => {
        opt.removeAttribute('selected')
        opt.setAttribute('aria-selected', 'false')
      })

      // Set the selected option (keep both attributes in sync)
      selectedOption.setAttribute('aria-selected', 'true')
      selectedOption.setAttribute('selected', '')

      // Update the input value
      if (_.#input) {
        _.#input.value = _.#getOptionValue(selectedOption)
      }

      // Update the visible label
      if (_.#label) {
        _.#label.textContent = selectedOption.textContent.trim()
      }

      // Dispatch change event for initial state
      _.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            value: _.#getOptionValue(selectedOption),
            text: selectedOption.textContent.trim(),
          },
          bubbles: true,
        })
      )
    }
  }

  /**
   * sets up aria attributes for accessibility
   */
  setupAriaAttributes() {
    const _ = this
    const listbox = _.#optionsContainer
    const trigger = _.#trigger

    // setup trigger button
    trigger.setAttribute('aria-haspopup', 'listbox')
    trigger.setAttribute('aria-expanded', 'false')
    trigger.setAttribute('role', 'combobox')

    if (!trigger.id) {
      trigger.id = `select-trigger-${Date.now()}`
    }

    // setup listbox
    listbox.setAttribute('role', 'listbox')
    listbox.setAttribute('aria-labelledby', trigger.id)

    // setup options
    _.#options.forEach((option, index) => {
      option.setAttribute('role', 'option')
      option.setAttribute('aria-selected', 'false')
      option.setAttribute('tabindex', '-1')
      option.id = `${trigger.id}-option-${index}`
    })
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
   * handles click events outside of the dropdown to hide it
   * @param {Event} e - the click event
   */
  handleOutsideClick(e) {
    // if click is outside of the dropdown, hide it
    if (!this.contains(e.target)) {
      this.hide();
    }
  }

  /**
   * handles keyboard navigation in the dropdown
   * @param {KeyboardEvent} e - the keyboard event
   */
  handleKeyboardNavigation(e) {
    const _ = this
    const options = Array.from(_.#options)

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        _.hide()
        break

      case 'ArrowDown':
        e.preventDefault()

        // if focus is on trigger, move to first option
        if (document.activeElement === _.#trigger) {
          _.#currentFocusIndex = -1
        }

        // move to next option or loop to first
        if (_.#currentFocusIndex < options.length - 1) {
          _.focusOption(_.#currentFocusIndex + 1)
        }
        break

      case 'ArrowUp':
        e.preventDefault()

        // move to previous option or loop to last
        if (_.#currentFocusIndex > 0) {
          _.focusOption(_.#currentFocusIndex - 1)
        } else if (_.#currentFocusIndex === 0) {
          // if on first option, move focus back to trigger
          _.#trigger.focus()
          _.#currentFocusIndex = -1
        }
        break

      case 'Home':
        e.preventDefault()
        _.focusOption(0)
        break

      case 'End':
        e.preventDefault()
        _.focusOption(options.length - 1)
        break

      case 'Enter':
      case ' ':
        e.preventDefault()

        // if dropdown is hidden and trigger is focused, show it
        if (
          _.getAttribute('aria-hidden') === 'true' &&
          document.activeElement === _.#trigger
        ) {
          _.show()
          return
        }

        // if focus is on an option, select it
        if (_.#currentFocusIndex >= 0) {
          _.selectOption({ target: options[_.#currentFocusIndex] })
        } else if (document.activeElement === _.#trigger) {
          _.show()
        }
        break

      default:
        // handle typeahead - find option starting with pressed key
        const key = e.key.toLowerCase()

        // only proceed if it's a single character
        if (key.length === 1) {
          // find the first option that starts with the pressed key
          const matchingOption = options.find((option) =>
            option.textContent.trim().toLowerCase().startsWith(key)
          )

          if (matchingOption) {
            const index = options.indexOf(matchingOption)
            _.focusOption(index)
          }
        }
        break
    }
  }

  /**
   * focuses a specific option by index
   * @param {number} index - the index of the option to focus
   */
  focusOption(index) {
    const _ = this
    const options = Array.from(_.#options)

    // reset tabindex on all options
    options.forEach((opt) => {
      opt.setAttribute('tabindex', '-1')
    })

    // set tabindex on target option and focus it
    if (options[index]) {
      options[index].setAttribute('tabindex', '0')
      options[index].focus()
      _.#currentFocusIndex = index

      // Ensure the option is visible in the dropdown
      options[index].scrollIntoView({
        block: 'nearest',
        behavior: 'instant'
      })
    }
  }

  /**
   * selects an option from the dropdown
   * @param {Event} e - the click event
   */
  selectOption(e) {
    const _ = this
    const option = e.target.closest('select-option')
    if (!option) return

    // update aria-selected on all options
    _.#options.forEach((opt) => {
      opt.setAttribute('aria-selected', 'false')
      opt.removeAttribute('selected')
    })

    // mark selected option (keep both attributes in sync)
    option.setAttribute('aria-selected', 'true')
    option.setAttribute('selected', '')

    // update the input value
    if (_.#input) {
      _.#input.value = _.#getOptionValue(option)
    }

    // update the visible label
    if (_.#label) {
      _.#label.textContent = option.textContent.trim()
    }

    // dispatch change event
    _.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: _.#getOptionValue(option),
          text: option.textContent.trim(),
        },
        bubbles: true,
      })
    )

    // hide the dropdown
    _.hide()
  }

  /**
   * Positions the panel so the target option overlays the trigger
   * @param {HTMLElement} targetOption - the option to align over the trigger
   * @private
   */
  #positionPanel(targetOption) {
    const _ = this
    const panel = _.#optionsContainer
    if (!panel) return

    // Clear previous positioning
    panel.style.top = ''
    panel.style.transformOrigin = ''
    panel.scrollTop = 0

    // Measure geometry
    const hostRect = _.getBoundingClientRect()
    const triggerRect = _.#trigger.getBoundingClientRect()
    const triggerOffset = triggerRect.top - hostRect.top
    const panelHeight = panel.offsetHeight

    let idealTop = triggerOffset

    if (targetOption) {
      const optionOffsetTop = targetOption.offsetTop

      // If the option is beyond the visible panel area, scroll internally
      if (optionOffsetTop > panelHeight - targetOption.offsetHeight) {
        const scrollTarget = optionOffsetTop - (panelHeight / 2) + (targetOption.offsetHeight / 2)
        panel.scrollTop = Math.max(0, scrollTarget)
        const visibleOptionOffset = optionOffsetTop - panel.scrollTop
        idealTop = triggerOffset - visibleOptionOffset
      } else {
        idealTop = triggerOffset - optionOffsetTop
      }

      // Set transform-origin at the target option's visual position
      const originY = optionOffsetTop - panel.scrollTop + (targetOption.offsetHeight / 2)
      panel.style.transformOrigin = `center ${originY}px`
    }

    // Viewport clamping — keep panel within the viewport
    const panelScreenTop = hostRect.top + idealTop
    const panelScreenBottom = panelScreenTop + panelHeight

    if (panelScreenBottom > window.innerHeight) {
      idealTop -= (panelScreenBottom - window.innerHeight)
    }

    // Re-check top edge after shifting up
    const newPanelScreenTop = hostRect.top + idealTop
    if (newPanelScreenTop < 0) {
      idealTop -= newPanelScreenTop
    }

    panel.style.top = `${idealTop}px`
  }

  /**
   * shows the dropdown options
   */
  show() {
    const _ = this

    // bail if already shown
    if (_.getAttribute('aria-hidden') === 'false') return

    // set attributes for shown state
    _.setAttribute('aria-hidden', 'false')
    _.#trigger.setAttribute('aria-expanded', 'true')

    // find selected option or default to first
    const options = Array.from(_.#options)
    const selectedOption = options.find(
      (opt) => opt.getAttribute('aria-selected') === 'true'
    )
    const targetOption = selectedOption || options[0]

    // position the panel overlay
    _.#positionPanel(targetOption)

    // focus the target option
    if (targetOption) {
      _.focusOption(options.indexOf(targetOption))
    }

    // add global event listeners
    document.addEventListener('click', _.#handleDocumentClick)
    document.addEventListener('keydown', _.#handleKeyDown)
  }

  /**
   * hides the dropdown options
   */
  hide() {
    const _ = this

    // set attributes for hidden state — inline positioning stays
    // so the panel animates out in place (cleared on next show)
    _.setAttribute('aria-hidden', 'true')
    _.#trigger.setAttribute('aria-expanded', 'false')

    // reset the current focus index
    _.#currentFocusIndex = -1

    // remove global event listeners
    document.removeEventListener('click', _.#handleDocumentClick)
    document.removeEventListener('keydown', _.#handleKeyDown)

    // return focus to trigger
    _.#trigger.focus()
  }
}
