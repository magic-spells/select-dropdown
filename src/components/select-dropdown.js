// import engines
import { MorphEngine } from '../../../morph-engine/src/index.js';

/**
 * select-dropdown component that handles the functionality of a custom dropdown
 * @class SelectDropdown
 * @extends HTMLElement
 */
export class SelectDropdown extends HTMLElement {
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

	// morph engine drives the trigger↔panel container transform
	#morphEngine = null;
	#pendingFocusRestore = false;

	/**
	 * Live getter for option elements — supports dynamically added/removed options
	 * @returns {NodeList}
	 * @private
	 */
	get #options() {
		return this.querySelectorAll('select-option');
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
		_.#createMorphEngine();
		_.attachListeners();
		_.initializeSelectedOption();
		_.hide();
	}

	/**
	 * Creates the morph engine that animates the trigger↔panel container
	 * transform and wires up its shown/hidden lifecycle handlers. Options aren't
	 * focusable until the morph reveals the panel, and the trigger is
	 * visibility:hidden while shown, so focus moves are deferred to these events.
	 * @private
	 */
	#createMorphEngine() {
		const _ = this;

		_.#morphEngine = new MorphEngine({ revealAt: 0.7, lockScroll: false });

		// panel fully revealed — move focus into it. Prefer the option the user
		// may have arrow-navigated to mid-flight, then the selected option, then
		// the first option.
		_.handlers.shown = () => {
			if (!_.hasAttribute('visible')) return;

			const options = Array.from(_.#options);
			let index = _.#currentFocusIndex;
			if (index < 0) {
				index = options.findIndex((opt) => opt.getAttribute('aria-selected') === 'true');
			}
			if (index < 0) index = 0;

			_.focusOption(index);
		};

		// panel fully morphed back into the trigger — restore focus to the trigger
		// now that it's visible again (focusing it earlier, while hidden, fails)
		_.handlers.hidden = () => {
			if (_.#pendingFocusRestore) {
				_.#pendingFocusRestore = false;
				_.#trigger?.focus();
			}
		};

		_.#morphEngine.on('shown', _.handlers.shown);
		_.#morphEngine.on('hidden', _.handlers.hidden);
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
	 * clean up event listeners and the morph engine when element is removed
	 */
	disconnectedCallback() {
		this.detachListeners();

		// destroy() restores all inline styles and removes the blob; recreated
		// per connectedCallback
		this.#morphEngine?.destroy();
		this.#morphEngine = null;
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

		// Clear previous positioning (the engine owns transform/transformOrigin)
		panel.style.top = '';
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
	 *
	 * The panel morphs out of the trigger via the morph engine. State (`visible`
	 * attr, aria, document listeners, event) is set synchronously so the scroll
	 * lock and trigger caret stay coherent; option focus is deferred to the
	 * engine's `shown` event because the options aren't revealed — and therefore
	 * not focusable — until the morph lands.
	 */
	show() {
		const _ = this;

		// bail if already shown
		if (_.hasAttribute('visible')) return;

		// set attributes for shown state — `visible` flips synchronously so the
		// scroll lock stays coherent (aria-expanded is set after engine.show)
		_.setAttribute('visible', '');
		_.#optionsContainer.setAttribute('aria-hidden', 'false');

		// reset typeahead buffer
		_.#typeaheadBuffer = '';

		// a reversed mid-hide show supersedes the engine's `hidden` event, so any
		// pending focus restore from that hide would go stale — clear it
		_.#pendingFocusRestore = false;

		// find selected option or default to first
		const options = Array.from(_.#options);
		const selectedOption = options.find((opt) => opt.getAttribute('aria-selected') === 'true');
		const targetOption = selectedOption || options[0];

		// position the panel before the engine measures it — but only from a
		// resting state. On a mid-hide reversal the engine keeps its stale
		// keyframes by design, so repositioning would desync the morph.
		if (_.#morphEngine.state === 'idle') {
			_.#positionPanel(targetOption);
		}

		// morph the trigger into the panel
		_.#morphEngine.show({ from: _.#trigger, to: _.#optionsContainer });

		// rotate the caret only after the engine has frozen the trigger clone, so
		// the blob keeps the unrotated caret while the morph plays
		_.#trigger.setAttribute('aria-expanded', 'true');

		// the engine hides the trigger synchronously, dropping focus to <body>;
		// anchor focus on the root (tabindex="-1") so document keydown navigation
		// works mid-flight
		_.focus({ preventScroll: true });

		// add global event listeners
		document.addEventListener('click', _.handlers.documentClick);
		document.addEventListener('keydown', _.handlers.keyDown);

		// dispatch show event
		_.dispatchEvent(new CustomEvent('select-dropdown:show', { bubbles: true }));
	}

	/**
	 * hides the dropdown options
	 *
	 * State (attr, aria, document listeners) is torn down synchronously so the
	 * scroll lock and trigger caret stay coherent; the panel morphs back into the
	 * trigger and focus is restored to the trigger from the engine's `hidden`
	 * event (the trigger is visibility:hidden until the morph lands).
	 * @param {Object} [options] - hide options
	 * @param {boolean} [options.restoreFocus=true] - whether to return focus to the trigger
	 */
	hide({ restoreFocus = true } = {}) {
		const _ = this;
		const wasOpen = _.hasAttribute('visible');

		// reset typeahead buffer
		_.#typeaheadBuffer = '';
		clearTimeout(_.#typeaheadTimer);

		// set attributes for hidden state — `visible` flips synchronously so the
		// scroll lock and trigger caret stay coherent with the morph
		_.removeAttribute('visible');
		_.#optionsContainer?.setAttribute('aria-hidden', 'true');
		_.#trigger?.setAttribute('aria-expanded', 'false');

		// reset the current focus index
		_.#currentFocusIndex = -1;

		// remove global event listeners
		document.removeEventListener('click', _.handlers.documentClick);
		document.removeEventListener('keydown', _.handlers.keyDown);

		// nothing was open (e.g. the initial hide from connectedCallback) — bail
		// before touching the engine
		if (!wasOpen) return;

		// the trigger is visibility:hidden until the morph lands, so defer its
		// focus to the `hidden` handler; park focus on the root in the meantime so
		// document keydown navigation keeps working while the panel morphs away
		if (_.contains(document.activeElement)) {
			_.focus({ preventScroll: true });
		}
		_.#pendingFocusRestore = restoreFocus;

		// morph the panel back into the trigger — only while a morph is live
		if (_.#morphEngine.state === 'shown' || _.#morphEngine.state === 'showing') {
			_.#morphEngine.hide();
		}

		// dispatch hide event
		_.dispatchEvent(new CustomEvent('select-dropdown:hide', { bubbles: true }));
	}
}
