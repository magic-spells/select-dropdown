# @magic-spells/select-dropdown

A fully accessible custom select dropdown web component with keyboard navigation, theming via CSS custom properties, and zero dependencies.

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

## Events

```js
dropdown.addEventListener('change', (e) => {
  console.log(e.detail.value) // selected value
  console.log(e.detail.text)  // selected text
})
```

## Theming

Style with CSS custom properties:

```css
select-dropdown {
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
| `↑` `↓` | Navigate options |
| `Home` / `End` | Jump to first/last option |
| `Escape` | Close dropdown |
| Any letter | Jump to matching option |

## Attributes

- `position="up|down"` on `<select-dropdown>` — force open direction
- `selected` on `<select-option>` — pre-select an option
- `value` on `<select-option>` — the option's value

## License

MIT
