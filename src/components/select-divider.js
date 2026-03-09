/**
 * select-divider component - visual separator between option groups
 * @class SelectDivider
 * @extends HTMLElement
 */
export class SelectDivider extends HTMLElement {
	constructor() {
		super();
		this.setAttribute('role', 'separator');
	}
}
