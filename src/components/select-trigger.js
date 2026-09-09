/**
 * select-trigger component
 * @class SelectTrigger
 * @extends HTMLElement
 */
export class SelectTrigger extends HTMLElement {
	constructor() {
		super();
		const _ = this;
		_.handlers = {};
		_.handlers.keyDown = _.#onKeyDown.bind(_);
		_.handlers.click = _.#onClick.bind(_);
	}

	connectedCallback() {
		const _ = this;

		// Make the trigger focusable. Set here, not in the constructor: the host
		// upgrades first and may already have stamped tabindex="-1" for a
		// disabled control — a constructor write would clobber it.
		if (!_.hasAttribute('tabindex')) {
			const host = _.closest('select-dropdown');
			_.setAttribute('tabindex', host?.hasAttribute('disabled') ? '-1' : '0');
		}

		// Add the stock caret only when the author owns no chrome of their own.
		// Any element child other than `.select-label-text` (an svg, a custom
		// span, an already-present `.select-icon`) means hands off.
		if (_.#shouldInjectCaret()) {
			const caret = document.createElement('span');
			caret.className = 'select-icon';
			_.appendChild(caret);
		}

		_.attachListeners();
	}

	/**
	 * Whether the stock caret should be injected
	 * @returns {boolean}
	 * @private
	 */
	#shouldInjectCaret() {
		return !Array.from(this.children).some(
			(child) => !child.classList.contains('select-label-text')
		);
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
