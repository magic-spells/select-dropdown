# Changelog

All notable changes to `@magic-spells/select-dropdown` are documented here.

## 0.3.0

Adoption release. The component is now safe to wrap from a framework: attributes
drive it, options may arrive after upgrade, the change event carries a payload,
and the stylesheet no longer reaches outside the component.

### Breaking

- **The global body scroll lock is gone.** `body:has(select-dropdown[visible]) { overflow: hidden }`
  has been removed from `select-dropdown.css`. A component must not lock the page.
  If you relied on it, add the rule to your own stylesheet.
- **The host rule no longer ships layout or typography.** `width: 300px`,
  `margin-bottom: 1rem`, `font-family` and `font-size` were removed from the
  `select-dropdown` rule; those belong to the page. Dropdowns now size to their
  container. Set them yourself if you want the old look:

  ```css
  select-dropdown { width: 300px; margin-bottom: 1rem; }
  ```

### Added

- **`observedAttributes`: `value` and `disabled`.** Setting the `value` attribute
  selects the matching option; setting `disabled` disables the control.
- **Deferred `value`.** The `value` setter (and attribute) remembers a value whose
  option does not exist yet and applies it as soon as that option appears.
- **`disabled` on the host.** `show()` refuses to open, the trigger gets
  `tabindex="-1"` + `aria-disabled="true"` (both restored when the attribute is
  removed), and clicks on options are ignored.
- **`disabled` on `<select-option>`.** The option gets `aria-disabled="true"`, is
  skipped by selection, `ArrowUp`/`ArrowDown`, `Home`/`End` and type-ahead, and is
  never focused. `Home`/`End` land on the first/last *enabled* option.
- **A `MutationObserver` on the panel subtree.** Options added or removed after
  upgrade get their `role`/`id`/`tabindex`/`aria-disabled` wiring, and the pending
  or current value is re-applied. The re-run is coalesced to one microtask and the
  observer is disconnected in `disconnectedCallback`.
- **Children may arrive after the host connects.** When the host connects before
  its `<select-trigger>` / `<select-panel>` exist (a classic script in `<head>`,
  streamed HTML, a framework that renders children after upgrade), the observer
  watches the host until the panel appears, then re-queries the DOM, wires
  everything up and switches to the panel observer. `show()` is a no-op until the
  trigger and panel exist.
- **A selection survives a wholesale re-render of the option list.** A user
  selection becomes the standing value request, so replacing every
  `<select-option>` restores the same selection instead of dropping it — and a
  re-render can never revert a user's pick to an older programmatic request. If
  the selected value is not in the new set, the control falls back to its
  placeholder label and an empty value, silently (that is not a user selection).
- **`select-dropdown:change`** — a bubbling `CustomEvent` with
  `detail: { value, label }`, dispatched from a **user selection only**.
  Programmatic `value` writes dispatch nothing, so a host framework never echoes
  its own write. The bare `change` event is unchanged and still fires alongside it.
- **`--select-shadow` / `--select-shadow-soft`** custom properties for the panel
  shadow (defaults are the previous hardcoded values).
- **`select-dropdown:not(:defined) select-panel { display: none }`** so an
  un-upgraded option list never flashes.
- Expanded `types.d.ts`: `SelectDropdownChangeDetail`, `HTMLElementTagNameMap` and
  `HTMLElementEventMap` entries.

### Changed

- **The stock caret is now conditional.** `<select-trigger>` injects its
  `<span class="select-icon">` only when the trigger has no element child other
  than `.select-label-text`. Give the trigger an `<svg>` (or any other element) and
  the component leaves the chrome alone. Plain-HTML usage is unchanged.
- `<select-trigger>` sets its `tabindex` in `connectedCallback` rather than the
  constructor, so a disabled host's `tabindex="-1"` is not clobbered at upgrade.
- The trigger's `.select-label-text` is resolved live instead of cached, and every
  write to it is null-checked — a trigger without one no longer throws.
- `setupAriaAttributes()` is idempotent: existing ids and the current
  `aria-selected="true"` survive a re-run.

## 0.2.0

- Grouped options via `<select-label>` and `<select-divider>`.
- Multi-character type-ahead, `Home`/`End`, form-reset restore.
- Center-overlay panel positioning with viewport clamping.
