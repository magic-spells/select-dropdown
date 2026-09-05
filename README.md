# @magic-spells/select-dropdown

**~3.9 KB** gzipped (JS + CSS) · Zero dependencies

A fully accessible custom select dropdown web component with keyboard navigation, theming via CSS custom properties.

🔍 **[Live Demo](https://magic-spells.github.io/select-dropdown/demo/)** - See it in action!


## Install

```bash
npm install @magic-spells/select-dropdown
```

## Usage

### ES Module

```js
import '@magic-spells/select-dropdown'
```

### CDN / Script Tag

```html
<link rel="stylesheet" href="https://unpkg.com/@magic-spells/select-dropdown/dist/select-dropdown.css" />
<script src="https://unpkg.com/@magic-spells/select-dropdown"></script>
```

### HTML

```html
<select-dropdown>
  <select-trigger>
    <span class="select-label-text">Pick a fruit</span>
  </select-trigger>

  <input type="hidden" name="fruit" />

  <select-panel>
    <select-option value="apple">Apple</select-option>
    <select-option value="banana" selected>Banana</select-option>
    <select-option value="cherry">Cherry</select-option>
  </select-panel>
</select-dropdown>
```

## Elements

| Element | Description |
|---|---|
| `<select-dropdown>` | Root container |
| `<select-trigger>` | Clickable trigger button |
| `<select-panel>` | Options list container |
| `<select-option>` | Selectable option |
| `<select-divider>` | Visual separator between groups |
| `<select-label>` | Non-interactive group heading |

## Grouped Options

Use `<select-label>` and `<select-divider>` to organize options into groups. These elements are automatically skipped during keyboard navigation.

```html
<select-panel>
  <select-label>Fruits</select-label>
  <select-option value="apple">Apple</select-option>
  <select-option value="banana">Banana</select-option>
  <select-divider></select-divider>
  <select-label>Nuts</select-label>
  <select-option value="almond">Almond</select-option>
</select-panel>
```

## Disabled

`disabled` works on the host and on individual options.

```html
<select-dropdown disabled>…</select-dropdown>

<select-option value="pro" disabled>Pro (sold out)</select-option>
```

A disabled host refuses to open, drops its trigger out of the tab order and reports `aria-disabled="true"`. A disabled option gets `aria-disabled="true"` and is skipped by selection, the arrow keys, `Home`/`End` and type-ahead — `Home`/`End` land on the first/last **enabled** option.

## Bring your own trigger

The stock caret (`<span class="select-icon">`) is injected only when the trigger has **no element child other than `.select-label-text`**. Put anything else inside and the component leaves the chrome to you:

```html
<select-trigger>
  <span class="select-label-text">Custom chrome</span>
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7l5 6 5-6" /></svg>
</select-trigger>
```

The component writes the selected label into `.select-label-text` when it is present, and is happy without one. `<select-trigger>` is the control — do not put interactive elements inside it.

## Events

| Event | Detail | Fires when |
|---|---|---|
| `change` | — | A user selects a different option (bubbles; read `dropdown.value`) |
| `select-dropdown:change` | `{ value, label }` | A user selects a different option (bubbles) |
| `select-dropdown:show` | — | The panel opens |
| `select-dropdown:hide` | — | The panel closes |

```js
dropdown.addEventListener('select-dropdown:change', (e) => {
  console.log(e.detail.value, e.detail.label)
})
```

**Programmatic writes dispatch nothing.** Setting `value` never echoes an event, so a host framework will not hear its own write.

```js
dropdown.value = 'banana'
dropdown.selectedText // 'Banana' — readable immediately
```

A value whose option does not exist yet is remembered and applied as soon as that option appears, so this works:

```js
dropdown.value = 'banana' // no options in the panel yet
panel.append(bananaOption) // resolves on the next microtask
```

Option values come from the `value` attribute. If an option has no `value`, its trimmed text content is used.

## Dynamic options

Options may be added or removed at any time. A `MutationObserver` on the panel re-runs the aria wiring for new options and re-applies the current or pending value, coalesced to one microtask.

The whole list may be replaced: the selection is restored **by value**, so a framework re-rendering its options does not lose the user's pick. If that value is not among the new options, the control falls back to its placeholder label with an empty `value` — silently, since that is not a user selection, so re-read `dropdown.value` after a re-render if you mirror it.

The trigger and panel themselves may also arrive after the host connects (a script in `<head>`, streamed HTML, a framework rendering children after upgrade). The component waits for them and wires up when they appear; `show()` does nothing until they exist.

## Theming

Style with CSS custom properties:

```css
select-dropdown {
  --select-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  --select-shadow-soft: 0 0 4px rgba(0, 0, 0, 0.08);
  --select-color-text: #333;
  --select-color-background: #fff;
  --select-color-border: #ddd;
  --select-color-border-hover: #aaa;
  --select-color-border-dark: #666;
  --select-color-primary: #4299e1;
  --select-color-hover: #f0f0f0;
  --select-color-focus: #e6f7ff;
  --select-color-selected: #e6f7ff;
}
```

## Keyboard Navigation

| Key | Action |
|---|---|
| `Tab` | Focus the dropdown |
| `Enter` / `Space` | Open dropdown or select option |
| `↑` `↓` | Open dropdown or navigate options |
| `Home` / `End` | Jump to first/last option |
| `Escape` | Close dropdown |
| Any letter | Jump to matching option |

The stylesheet ships **no layout or typography** on the host — no width, margin or font. Dropdowns size to their container; set what you want on the page:

```css
select-dropdown { width: 300px; }
```

The component also does **not** lock body scroll while open (removed in 0.3.0). Add that yourself if you need it.

## Attributes

### `<select-dropdown>` (observed)

| Attribute | Description |
|---|---|
| `value` | Selects the matching option. A value whose option does not exist yet is applied when it appears. |
| `disabled` | The panel refuses to open; the trigger leaves the tab order and reports `aria-disabled`. |
| `visible` | Set by the component while the panel is open — read it, do not write it. Use `show()` / `hide()`. |

### `<select-option>`

| Attribute | Description |
|---|---|
| `value` | The option's value (falls back to its trimmed text) |
| `selected` | Pre-select this option |
| `disabled` | Not selectable, not focusable, skipped by keyboard navigation |

## Properties & methods

| Member | Description |
|---|---|
| `value` | Get or set the selected value. Setting dispatches nothing. |
| `selectedText` | Trimmed text of the selected option (read-only) |
| `show()` / `hide({ restoreFocus })` | Open / close the panel |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made by <a href="https://github.com/coryschulz">Cory Schulz</a>
</p>
