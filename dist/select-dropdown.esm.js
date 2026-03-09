/**
 * select-dropdown component that handles the functionality of a custom dropdown
 * @class SelectDropdown
 * @extends HTMLElement
 */
class SelectDropdown extends HTMLElement {
	static #instanceCount = 0;

	// private fields for elements
	#instanceId;
	#trigger;
	#input;
	#optionsContainer;
	#label;
	#currentFocusIndex = -1;
	#typeaheadBuffer = '';
	#typeaheadTimer = null;
	#defaultValue = null;
	#defaultValueCaptured = false;
	#originalLabelText = '';

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
		const _ = this;
		_.#instanceId = ++SelectDropdown.#instanceCount;
		_.handlers = {};
	}

	get value() {
		const selectedOption = this.#getSelectedOption();
		if (selectedOption) return this.#getOptionValue(selectedOption);
		return this.#input?.value || '';
	}

	get selectedText() {
		const selectedOption = this.#getSelectedOption();
		if (selectedOption) return this.#getOptionText(selectedOption);
		return '';
	}

	set value(nextValue) {
		if (nextValue === null || nextValue === undefined) return;

		const option = this.#findOptionByValue(String(nextValue));
		if (!option) return;

		this.#applySelection(option);
	}

	/**
	 * when element is connected to the dom
	 */
	connectedCallback() {
		const _ = this;

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
	 * Gets the value from an option element
	 * @param {HTMLElement} option - The option element
	 * @returns {string} The option value
	 * @private
	 */
	#getOptionValue(option) {
		if (option.hasAttribute('value')) return option.getAttribute('value');
		return option.textContent.trim();
	}

	/**
	 * Gets the label text from an option element
	 * @param {HTMLElement} option - The option element
	 * @returns {string} The option label
	 * @private
	 */
	#getOptionText(option) {
		return option.textContent.trim();
	}

	/**
	 * Finds the currently selected option
	 * @returns {HTMLElement | undefined}
	 * @private
	 */
	#getSelectedOption() {
		return Array.from(this.#options).find(
			(option) => option.getAttribute('aria-selected') === 'true'
		);
	}

	/**
	 * Finds an option matching the provided value
	 * @param {string} value - The option value to match
	 * @returns {HTMLElement | undefined}
	 * @private
	 */
	#findOptionByValue(value) {
		return Array.from(this.#options).find((option) => this.#getOptionValue(option) === value);
	}

	/**
	 * Applies selection state across the control
	 * @param {HTMLElement | null} option - The option to select
	 * @private
	 */
	#applySelection(option) {
		this.#options.forEach((opt) => {
			opt.removeAttribute('selected');
			opt.setAttribute('aria-selected', 'false');
		});

		if (!option) {
			if (this.#input) {
				this.#input.value = '';
			}

			if (this.#label) {
				this.#label.textContent = this.#originalLabelText;
			}

			this.#currentFocusIndex = -1;
			return;
		}

		option.setAttribute('aria-selected', 'true');
		option.setAttribute('selected', '');

		if (this.#input) {
			this.#input.value = this.#getOptionValue(option);
		}

		if (this.#label) {
			this.#label.textContent = this.#getOptionText(option);
		}

		this.#currentFocusIndex = Array.from(this.#options).indexOf(option);
	}

	/**
	 * Initializes any pre-selected options based on 'selected' attribute
	 * @private
	 */
	initializeSelectedOption() {
		const _ = this;

		const selectedOption = Array.from(_.#options).find((opt) => opt.hasAttribute('selected'));

		// Capture the default value and label on the first call
		if (!_.#defaultValueCaptured) {
			_.#defaultValue = selectedOption ? _.#getOptionValue(selectedOption) : null;
			_.#originalLabelText = _.#label ? _.#label.textContent : '';
			_.#defaultValueCaptured = true;
		}

		_.#applySelection(selectedOption || null);
	}

	/**
	 * Resets the component to its original default selection
	 * @private
	 */
	#resetToDefault() {
		const _ = this;
		const defaultOption =
			_.#defaultValue === null ? null : _.#findOptionByValue(_.#defaultValue) || null;

		_.#applySelection(defaultOption);
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
		trigger.setAttribute('role', 'button');

		if (!trigger.id) {
			trigger.id = `select-trigger-${_.#instanceId}`;
		}

		// assign an ID to the listbox panel and link via aria-controls
		if (!listbox.id) {
			listbox.id = `select-panel-${_.#instanceId}`;
		}
		trigger.setAttribute('aria-controls', listbox.id);

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

		// listen for form reset to restore the original default selection
		const form = _.closest('form');
		if (form) {
			_.handlers.formReset = () => {
				requestAnimationFrame(() => {
					_.#resetToDefault();
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
			_.#applySelection(option);
			_.dispatchEvent(new Event('change', { bubbles: true }));
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

/**
 * select-trigger component
 * @class SelectTrigger
 * @extends HTMLElement
 */
class SelectTrigger extends HTMLElement {
	constructor() {
		super();
		const _ = this;

		// Make the trigger focusable
		_.setAttribute('tabindex', '0');
		_.handlers = {};
		_.handlers.keyDown = _.#onKeyDown.bind(_);
		_.handlers.click = _.#onClick.bind(_);
	}

	connectedCallback() {
		const _ = this;

		// Add icon if not present
		if (!_.querySelector('.select-icon')) {
			const caret = document.createElement('span');
			caret.className = 'select-icon';
			_.appendChild(caret);
		}

		_.attachListeners();
	}

	disconnectedCallback() {
		this.detachListeners();
	}

	/**
	 * Attaches event listeners to the trigger
	 */
	attachListeners() {
		const _ = this;
		_.addEventListener('keydown', _.handlers.keyDown);
		_.addEventListener('click', _.handlers.click);
	}

	/**
	 * Detaches event listeners from the trigger
	 */
	detachListeners() {
		const _ = this;
		_.removeEventListener('keydown', _.handlers.keyDown);
		_.removeEventListener('click', _.handlers.click);
	}

	/**
	 * Handle keydown events on the trigger
	 * @param {KeyboardEvent} e - The keyboard event
	 * @private
	 */
	#onKeyDown(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			e.stopPropagation();
			this.#toggleDropdown();
			return;
		}

		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			const dropdown = this.closest('select-dropdown');
			if (dropdown && !dropdown.hasAttribute('visible')) {
				e.stopPropagation();
				this.#toggleDropdown();
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
		const dropdown = this.closest('select-dropdown');
		if (!dropdown) return;
		if (dropdown.hasAttribute('visible')) {
			dropdown.hide();
		} else {
			dropdown.show();
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
	constructor() {
		super();
		const _ = this;
		_.handlers = {};
		_.handlers.click = _.#onClick.bind(_);
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
 * @version 0.1.0
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

export { SelectDivider, SelectDropdown, SelectLabel, SelectOption, SelectPanel, SelectTrigger };
//# sourceMappingURL=select-dropdown.esm.js.map
