export class SelectDropdown extends HTMLElement {
  handlers: Record<string, EventListener>
  show(): void
  hide(options?: { restoreFocus?: boolean }): void
  selectOption(e: { target: HTMLElement }): void
  focusOption(index: number): void
}

export class SelectTrigger extends HTMLElement {
  handlers: Record<string, EventListener>
  attachListeners(): void
  detachListeners(): void
}

export class SelectPanel extends HTMLElement {}

export class SelectOption extends HTMLElement {
  handlers: Record<string, EventListener>
  attachListeners(): void
  detachListeners(): void
}

export class SelectDivider extends HTMLElement {}

export class SelectLabel extends HTMLElement {}
