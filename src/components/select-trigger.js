/**
 * select-trigger component
 * @class SelectTrigger
 * @extends HTMLElement
 */
export class SelectTrigger extends HTMLElement {
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
