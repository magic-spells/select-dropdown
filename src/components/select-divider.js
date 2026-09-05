/**
 * select-divider component - visual separator between option groups
 * @class SelectDivider
 * @extends HTMLElement
 */
export class SelectDivider extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		// Set here, not in the constructor: a custom element constructor may not
		// add attributes, and document.createElement() on a defined element
		// throws NotSupportedError if it does.
		if (!this.hasAttribute('role')) {
			this.setAttribute('role', 'separator');
		}
	}
}
