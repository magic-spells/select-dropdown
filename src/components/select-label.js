/**
 * select-label component - non-interactive group heading within a select panel
 * @class SelectLabel
 * @extends HTMLElement
 */
export class SelectLabel extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		// Set here, not in the constructor: a custom element constructor may not
		// add attributes, and document.createElement() on a defined element
		// throws NotSupportedError if it does.
		if (!this.hasAttribute('role')) {
			this.setAttribute('role', 'presentation');
		}
	}
}
