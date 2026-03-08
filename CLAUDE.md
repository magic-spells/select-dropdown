# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run build` - Build the component for production
- `npm run dev` - Start development server with live reload
- `npm run serve` - Alias for dev command
- `npm run lint` - Run ESLint for code linting
- `npm run format` - Format all files with Prettier

## Code Style Guidelines
- **File Structure**: Web components in `src/components/`, styles in `src/styles/` (plain CSS, no preprocessors)
- **Exports**: ES Modules with named exports
- **Imports**: Order imports by: 1) styles 2) components 3) utilities
- **JavaScript**: Private class fields with `#` prefix, JSDoc comments on methods
- **Comments**: Use JSDoc for documenting classes and methods
- **Formatting**: 2-space indentation, no trailing semicolons
- **Naming**: Kebab-case for components, camelCase for methods/properties
- **A11y**: Keep WAI-ARIA attributes updated for accessibility compliance
- **Error Handling**: Validate inputs and handle edge cases gracefully

## Component Usage Guidelines
- **HTML Structure**: Use simplified structure without UL/LI elements for options
- **Attributes**: Use `value` attribute on `select-option` elements (not `data-value`)
- **Preselected Options**: Use `selected` attribute on `select-option` for initial selection
- **Form Integration**: Hidden input element is required for form submissions
- **Group Labels**: Use `<select-label>` for non-interactive group headings
- **Dividers**: Use `<select-divider>` for visual separators between groups

## Elements
| Element | Class | Description |
|---|---|---|
| `<select-dropdown>` | `SelectDropdown` | Root container, orchestrates state |
| `<select-trigger>` | `SelectTrigger` | Clickable trigger with caret |
| `<select-panel>` | `SelectPanel` | Options container (listbox) |
| `<select-option>` | `SelectOption` | Selectable option |
| `<select-divider>` | `SelectDivider` | Visual separator (`role="separator"`) |
| `<select-label>` | `SelectLabel` | Group heading (`role="presentation"`) |

## Example Structure
```html
<select-dropdown>
  <select-trigger>
    <span class="select-label-text">Pick a fruit</span>
  </select-trigger>

  <input type="hidden" name="fruit" />

  <select-panel>
    <select-label>Fruits</select-label>
    <select-option value="apple">Apple</select-option>
    <select-option value="banana" selected>Banana</select-option>
    <select-divider></select-divider>
    <select-label>Nuts</select-label>
    <select-option value="almond">Almond</select-option>
  </select-panel>
</select-dropdown>
```
