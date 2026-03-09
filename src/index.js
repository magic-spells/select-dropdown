/**
 * @file Main entry point for select-dropdown web component
 * @author Cory Schulz
 * @version 0.1.0
 */

// import styles
import './select-dropdown.css';

// import components
import { SelectDropdown } from './components/select-dropdown.js';
import { SelectTrigger } from './components/select-trigger.js';
import { SelectPanel } from './components/select-panel.js';
import { SelectOption } from './components/select-option.js';
import { SelectDivider } from './components/select-divider.js';
import { SelectLabel } from './components/select-label.js';

// export components for external use
export { SelectDropdown, SelectTrigger, SelectPanel, SelectOption, SelectDivider, SelectLabel };

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
