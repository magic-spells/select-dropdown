/**
 * select-label component - non-interactive group heading within a select panel
 * @class SelectLabel
 * @extends HTMLElement
 */
export class SelectLabel extends HTMLElement {
	constructor() {
		super();
		this.setAttribute('role', 'presentation');
	}
}
