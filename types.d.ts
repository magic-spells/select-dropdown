/** Detail payload of the `select-dropdown:change` event */
export interface SelectDropdownChangeDetail {
	/** The selected option's value (its `value` attribute, else its trimmed text) */
	value: string;
	/** The selected option's trimmed text content */
	label: string;
}

export class SelectDropdown extends HTMLElement {
	/** Observed attributes: `value`, `disabled`, `required` */
	static readonly observedAttributes: string[];
	/** Form-associated for validity (`required`) and reset; the hidden input carries the value */
	static readonly formAssociated: true;
	handlers: Record<string, EventListener>;
	/**
	 * Read the selected value, or write one. A value whose option does not exist
	 * yet is remembered and applied as soon as that option appears.
	 * Programmatic writes dispatch no events.
	 */
	value: string;
	/** Trimmed text of the selected option, or '' when nothing is selected */
	readonly selectedText: string;
	show(): void;
	hide(options?: { restoreFocus?: boolean }): void;
	selectOption(e: { target: HTMLElement }): void;
	focusOption(index: number): void;
	setupAriaAttributes(): void;
	attachListeners(): void;
	detachListeners(): void;
	queryDOM(): void;
	initializeSelectedOption(): void;
	/** Form reset: restores the option marked `selected` in the markup */
	formResetCallback(): void;
}

export class SelectTrigger extends HTMLElement {
	handlers: Record<string, EventListener>;
	attachListeners(): void;
	detachListeners(): void;
}

export class SelectPanel extends HTMLElement {}

export class SelectOption extends HTMLElement {
	handlers: Record<string, EventListener>;
	attachListeners(): void;
	detachListeners(): void;
}

export class SelectDivider extends HTMLElement {}

export class SelectLabel extends HTMLElement {}

declare global {
	interface HTMLElementTagNameMap {
		'select-dropdown': SelectDropdown;
		'select-trigger': SelectTrigger;
		'select-panel': SelectPanel;
		'select-option': SelectOption;
		'select-divider': SelectDivider;
		'select-label': SelectLabel;
	}

	interface HTMLElementEventMap {
		'select-dropdown:change': CustomEvent<SelectDropdownChangeDetail>;
		'select-dropdown:show': CustomEvent<void>;
		'select-dropdown:hide': CustomEvent<void>;
	}
}
