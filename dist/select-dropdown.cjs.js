'use strict';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* select dropdown color variables */\n:root {\n  --select-color-text: #333;\n  --select-color-background: #fff;\n  --select-color-border: #ddd;\n  --select-color-border-hover: #aaa;\n  --select-color-border-dark: #666;\n  --select-color-primary: #4299e1;\n  --select-color-hover: #f0f0f0;\n  --select-color-focus: #e6f7ff;\n  --select-color-selected: #e6f7ff;\n}\n\n/* dropdown component styles */\nselect-dropdown {\n  position: relative;\n  width: 300px;\n  margin-bottom: 1rem;\n  display: block;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen,\n    Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: var(--select-color-text);\n  box-sizing: border-box;\n}\n\nselect-dropdown * {\n  box-sizing: border-box;\n}\n\n/* panel shown state */\nselect-dropdown[aria-hidden=\"false\"] select-panel {\n  opacity: 1;\n  transform: scale(1);\n  filter: blur(0);\n  pointer-events: auto;\n  visibility: visible;\n}\n\n/* trigger button styles */\nselect-trigger {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  background-color: var(--select-color-background);\n  border: 1px solid var(--select-color-border);\n  border-radius: 0.25rem;\n  cursor: pointer;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n\nselect-trigger:hover {\n  border-color: var(--select-color-border-hover);\n}\n\nselect-trigger:focus {\n  outline: none;\n  border-color: var(--select-color-primary);\n  box-shadow: 0 0 0 3px\n    color-mix(in srgb, var(--select-color-primary) 25%, transparent);\n}\n\n/* caret icon */\n.select-icon {\n  border-style: solid;\n  border-width: 0.25rem 0.25rem 0;\n  border-color: var(--select-color-border-dark) transparent transparent;\n  margin-left: 0.75rem;\n  transition: transform 0.2s;\n}\n\n/* Flipped caret when expanded */\nselect-trigger[aria-expanded=\"true\"] .select-icon {\n  transform: rotate(180deg);\n}\n\n/* options container */\nselect-panel {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  max-height: 15rem;\n  overflow-y: auto;\n  background-color: var(--select-color-background);\n  border: 1px solid var(--select-color-border);\n  border-radius: 0.25rem;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);\n  z-index: 10;\n  opacity: 0;\n  transform: scale(0.97);\n  filter: blur(3px);\n  pointer-events: none;\n  visibility: hidden;\n  transition: opacity 150ms ease-out, transform 150ms ease-out, filter 150ms ease-out, visibility 150ms;\n}\n\n/* option items */\nselect-option {\n  padding: 0.75rem 1rem;\n  cursor: pointer;\n  transition: background-color 0.2s;\n  display: block;\n}\n\nselect-option:hover {\n  background-color: var(--select-color-hover);\n}\n\nselect-option:focus {\n  outline: none;\n  background-color: var(--select-color-focus);\n  box-shadow: inset 0 0 0 2px var(--select-color-primary);\n}\n\nselect-option[aria-selected=\"true\"] {\n  background-color: var(--select-color-selected);\n  font-weight: 500;\n}\n\n/* hidden input */\nselect-dropdown > input {\n  display: none;\n}\n\n/* divider between option groups */\nselect-divider {\n  display: block;\n  height: 1px;\n  margin: 0.25rem 0;\n  background-color: var(--select-color-border);\n}\n\n/* label for option groups */\nselect-label {\n  display: block;\n  padding: 0.25rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #999;\n  cursor: default;\n  user-select: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdC1kcm9wZG93bi5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0NBQW9DO0FBQ3BDO0VBQ0UseUJBQXlCO0VBQ3pCLCtCQUErQjtFQUMvQiwyQkFBMkI7RUFDM0IsaUNBQWlDO0VBQ2pDLGdDQUFnQztFQUNoQywrQkFBK0I7RUFDL0IsNkJBQTZCO0VBQzdCLDZCQUE2QjtFQUM3QixnQ0FBZ0M7QUFDbEM7O0FBRUEsOEJBQThCO0FBQzlCO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsY0FBYztFQUNkO2dFQUM4RDtFQUM5RCxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLCtCQUErQjtFQUMvQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUEsc0JBQXNCO0FBQ3RCO0VBQ0UsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2Ysb0JBQW9CO0VBQ3BCLG1CQUFtQjtBQUNyQjs7QUFFQSwwQkFBMEI7QUFDMUI7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLGdEQUFnRDtFQUNoRCw0Q0FBNEM7RUFDNUMsc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZiw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSxhQUFhO0VBQ2IseUNBQXlDO0VBQ3pDO29FQUNrRTtBQUNwRTs7QUFFQSxlQUFlO0FBQ2Y7RUFDRSxtQkFBbUI7RUFDbkIsK0JBQStCO0VBQy9CLHFFQUFxRTtFQUNyRSxvQkFBb0I7RUFDcEIsMEJBQTBCO0FBQzVCOztBQUVBLGdDQUFnQztBQUNoQztFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQSxzQkFBc0I7QUFDdEI7RUFDRSxrQkFBa0I7RUFDbEIsT0FBTztFQUNQLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGdEQUFnRDtFQUNoRCw0Q0FBNEM7RUFDNUMsc0JBQXNCO0VBQ3RCLDBDQUEwQztFQUMxQyxXQUFXO0VBQ1gsVUFBVTtFQUNWLHNCQUFzQjtFQUN0QixpQkFBaUI7RUFDakIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixxR0FBcUc7QUFDdkc7O0FBRUEsaUJBQWlCO0FBQ2pCO0VBQ0UscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixpQ0FBaUM7RUFDakMsY0FBYztBQUNoQjs7QUFFQTtFQUNFLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLGFBQWE7RUFDYiwyQ0FBMkM7RUFDM0MsdURBQXVEO0FBQ3pEOztBQUVBO0VBQ0UsOENBQThDO0VBQzlDLGdCQUFnQjtBQUNsQjs7QUFFQSxpQkFBaUI7QUFDakI7RUFDRSxhQUFhO0FBQ2Y7O0FBRUEsa0NBQWtDO0FBQ2xDO0VBQ0UsY0FBYztFQUNkLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsNENBQTRDO0FBQzlDOztBQUVBLDRCQUE0QjtBQUM1QjtFQUNFLGNBQWM7RUFDZCxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxlQUFlO0VBQ2YsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNlbGVjdC1kcm9wZG93bi5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBzZWxlY3QgZHJvcGRvd24gY29sb3IgdmFyaWFibGVzICovXG46cm9vdCB7XG4gIC0tc2VsZWN0LWNvbG9yLXRleHQ6ICMzMzM7XG4gIC0tc2VsZWN0LWNvbG9yLWJhY2tncm91bmQ6ICNmZmY7XG4gIC0tc2VsZWN0LWNvbG9yLWJvcmRlcjogI2RkZDtcbiAgLS1zZWxlY3QtY29sb3ItYm9yZGVyLWhvdmVyOiAjYWFhO1xuICAtLXNlbGVjdC1jb2xvci1ib3JkZXItZGFyazogIzY2NjtcbiAgLS1zZWxlY3QtY29sb3ItcHJpbWFyeTogIzQyOTllMTtcbiAgLS1zZWxlY3QtY29sb3ItaG92ZXI6ICNmMGYwZjA7XG4gIC0tc2VsZWN0LWNvbG9yLWZvY3VzOiAjZTZmN2ZmO1xuICAtLXNlbGVjdC1jb2xvci1zZWxlY3RlZDogI2U2ZjdmZjtcbn1cblxuLyogZHJvcGRvd24gY29tcG9uZW50IHN0eWxlcyAqL1xuc2VsZWN0LWRyb3Bkb3duIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMzAwcHg7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgT3h5Z2VuLFxuICAgIFVidW50dSwgQ2FudGFyZWxsLCBcIk9wZW4gU2Fuc1wiLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgY29sb3I6IHZhcigtLXNlbGVjdC1jb2xvci10ZXh0KTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuc2VsZWN0LWRyb3Bkb3duICoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4vKiBwYW5lbCBzaG93biBzdGF0ZSAqL1xuc2VsZWN0LWRyb3Bkb3duW2FyaWEtaGlkZGVuPVwiZmFsc2VcIl0gc2VsZWN0LXBhbmVsIHtcbiAgb3BhY2l0eTogMTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgZmlsdGVyOiBibHVyKDApO1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuLyogdHJpZ2dlciBidXR0b24gc3R5bGVzICovXG5zZWxlY3QtdHJpZ2dlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDAuNzVyZW0gMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2VsZWN0LWNvbG9yLWJhY2tncm91bmQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1zZWxlY3QtY29sb3ItYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4ycywgYm94LXNoYWRvdyAwLjJzO1xufVxuXG5zZWxlY3QtdHJpZ2dlcjpob3ZlciB7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tc2VsZWN0LWNvbG9yLWJvcmRlci1ob3Zlcik7XG59XG5cbnNlbGVjdC10cmlnZ2VyOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1zZWxlY3QtY29sb3ItcHJpbWFyeSk7XG4gIGJveC1zaGFkb3c6IDAgMCAwIDNweFxuICAgIGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1zZWxlY3QtY29sb3ItcHJpbWFyeSkgMjUlLCB0cmFuc3BhcmVudCk7XG59XG5cbi8qIGNhcmV0IGljb24gKi9cbi5zZWxlY3QtaWNvbiB7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci13aWR0aDogMC4yNXJlbSAwLjI1cmVtIDA7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tc2VsZWN0LWNvbG9yLWJvcmRlci1kYXJrKSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcbiAgbWFyZ2luLWxlZnQ6IDAuNzVyZW07XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjJzO1xufVxuXG4vKiBGbGlwcGVkIGNhcmV0IHdoZW4gZXhwYW5kZWQgKi9cbnNlbGVjdC10cmlnZ2VyW2FyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJdIC5zZWxlY3QtaWNvbiB7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG59XG5cbi8qIG9wdGlvbnMgY29udGFpbmVyICovXG5zZWxlY3QtcGFuZWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxNXJlbTtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2VsZWN0LWNvbG9yLWJhY2tncm91bmQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1zZWxlY3QtY29sb3ItYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xuICB6LWluZGV4OiAxMDtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgZmlsdGVyOiBibHVyKDNweCk7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMTUwbXMgZWFzZS1vdXQsIHRyYW5zZm9ybSAxNTBtcyBlYXNlLW91dCwgZmlsdGVyIDE1MG1zIGVhc2Utb3V0LCB2aXNpYmlsaXR5IDE1MG1zO1xufVxuXG4vKiBvcHRpb24gaXRlbXMgKi9cbnNlbGVjdC1vcHRpb24ge1xuICBwYWRkaW5nOiAwLjc1cmVtIDFyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjJzO1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuc2VsZWN0LW9wdGlvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlbGVjdC1jb2xvci1ob3Zlcik7XG59XG5cbnNlbGVjdC1vcHRpb246Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zZWxlY3QtY29sb3ItZm9jdXMpO1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAycHggdmFyKC0tc2VsZWN0LWNvbG9yLXByaW1hcnkpO1xufVxuXG5zZWxlY3Qtb3B0aW9uW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2VsZWN0LWNvbG9yLXNlbGVjdGVkKTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLyogaGlkZGVuIGlucHV0ICovXG5zZWxlY3QtZHJvcGRvd24gPiBpbnB1dCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi8qIGRpdmlkZXIgYmV0d2VlbiBvcHRpb24gZ3JvdXBzICovXG5zZWxlY3QtZGl2aWRlciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDFweDtcbiAgbWFyZ2luOiAwLjI1cmVtIDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNlbGVjdC1jb2xvci1ib3JkZXIpO1xufVxuXG4vKiBsYWJlbCBmb3Igb3B0aW9uIGdyb3VwcyAqL1xuc2VsZWN0LWxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHBhZGRpbmc6IDAuMjVyZW0gMXJlbTtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xuICBjb2xvcjogIzk5OTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbn1cbiJdfQ== */";
styleInject(css_248z);

/**
 * select-dropdown component that handles the functionality of a custom dropdown
 * @class SelectDropdown
 * @extends HTMLElement
 */
class SelectDropdown extends HTMLElement {
  // private fields for event handlers
  #handleDocumentClick;
  #handleKeyDown;

  // private fields for elements
  #trigger;
  #input;
  #optionsContainer;
  #options;
  #label;
  #currentFocusIndex = -1;

  // Observed attributes
  static get observedAttributes() {
    return [];
  }

  constructor() {
    super();

    // set default attributes
    this.setAttribute('aria-hidden', 'true');

    // bind event handlers
    this.#handleDocumentClick = this.handleOutsideClick.bind(this);
    this.#handleKeyDown = this.handleKeyboardNavigation.bind(this);
  }

  /**
   * when element is connected to the dom
   */
  connectedCallback() {
    const _ = this;

    _.queryDOM();
    _.setAttribute('tabindex', '-1');
    _.setupAriaAttributes();
    _.bindUI();
    _.initializeSelectedOption();
    _.hide();
  }

  /**
   * Queries and caches all DOM elements needed for the component
   * @private
   */
  queryDOM() {
    const _ = this;

    _.#trigger = _.querySelector('select-trigger');
    _.#input = _.querySelector('input');
    _.#optionsContainer = _.querySelector('select-panel');
    _.#options = _.querySelectorAll('select-option');
    _.#label = _.#trigger?.querySelector('.select-label-text');
  }

  /**
   * clean up event listeners when element is removed
   */
  disconnectedCallback() {
    this.unbindUI();
  }

  /**
   * Gets the value from an option element, supporting both 'value' and 'data-value' attributes
   * @param {HTMLElement} option - The option element
   * @returns {string} The option value
   * @private
   */
  #getOptionValue(option) {
    return option.getAttribute('value') || option.dataset.value || option.textContent.trim();
  }

  /**
   * Initializes any pre-selected options based on 'selected' attribute or existing aria-selected
   * @private
   */
  initializeSelectedOption() {
    const _ = this;

    // Look for options with 'selected' attribute first
    let selectedOption = Array.from(_.#options).find(
      (opt) => opt.hasAttribute('selected')
    );

    // If no 'selected' attribute, look for aria-selected="true"
    if (!selectedOption) {
      selectedOption = Array.from(_.#options).find(
        (opt) => opt.getAttribute('aria-selected') === 'true'
      );
    }

    // If we found a selected option, update the component state
    if (selectedOption) {
      // Clear all selections first
      _.#options.forEach((opt) => {
        opt.removeAttribute('selected');
        opt.setAttribute('aria-selected', 'false');
      });

      // Set the selected option (keep both attributes in sync)
      selectedOption.setAttribute('aria-selected', 'true');
      selectedOption.setAttribute('selected', '');

      // Update the input value
      if (_.#input) {
        _.#input.value = _.#getOptionValue(selectedOption);
      }

      // Update the visible label
      if (_.#label) {
        _.#label.textContent = selectedOption.textContent.trim();
      }

      // Dispatch change event for initial state
      _.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            value: _.#getOptionValue(selectedOption),
            text: selectedOption.textContent.trim(),
          },
          bubbles: true,
        })
      );
    }
  }

  /**
   * sets up aria attributes for accessibility
   */
  setupAriaAttributes() {
    const _ = this;
    const listbox = _.#optionsContainer;
    const trigger = _.#trigger;

    // setup trigger button
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('role', 'combobox');

    if (!trigger.id) {
      trigger.id = `select-trigger-${Date.now()}`;
    }

    // setup listbox
    listbox.setAttribute('role', 'listbox');
    listbox.setAttribute('aria-labelledby', trigger.id);

    // setup options
    _.#options.forEach((option, index) => {
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.setAttribute('tabindex', '-1');
      option.id = `${trigger.id}-option-${index}`;
    });
  }

  /**
   * binds the necessary ui events to the component
   */
  bindUI() {
    // No need to bind element events - child components manage their own events
    // This method is kept for potential future global event binding
  }

  /**
   * unbinds event listeners
   */
  unbindUI() {
    // No element events to remove - child components manage their own events
    // This method is kept for potential future global event cleanup

    // remove document events if they exist
    document.removeEventListener('click', this.#handleDocumentClick);
    document.removeEventListener('keydown', this.#handleKeyDown);
  }

  /**
   * handles click events outside of the dropdown to hide it
   * @param {Event} e - the click event
   */
  handleOutsideClick(e) {
    // if click is outside of the dropdown, hide it
    if (!this.contains(e.target)) {
      this.hide();
    }
  }

  /**
   * handles keyboard navigation in the dropdown
   * @param {KeyboardEvent} e - the keyboard event
   */
  handleKeyboardNavigation(e) {
    const _ = this;
    const options = Array.from(_.#options);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        _.hide();
        break

      case 'ArrowDown':
        e.preventDefault();

        // if focus is on trigger, move to first option
        if (document.activeElement === _.#trigger) {
          _.#currentFocusIndex = -1;
        }

        // move to next option or loop to first
        if (_.#currentFocusIndex < options.length - 1) {
          _.focusOption(_.#currentFocusIndex + 1);
        }
        break

      case 'ArrowUp':
        e.preventDefault();

        // move to previous option or loop to last
        if (_.#currentFocusIndex > 0) {
          _.focusOption(_.#currentFocusIndex - 1);
        } else if (_.#currentFocusIndex === 0) {
          // if on first option, move focus back to trigger
          _.#trigger.focus();
          _.#currentFocusIndex = -1;
        }
        break

      case 'Home':
        e.preventDefault();
        _.focusOption(0);
        break

      case 'End':
        e.preventDefault();
        _.focusOption(options.length - 1);
        break

      case 'Enter':
      case ' ':
        e.preventDefault();

        // if dropdown is hidden and trigger is focused, show it
        if (
          _.getAttribute('aria-hidden') === 'true' &&
          document.activeElement === _.#trigger
        ) {
          _.show();
          return
        }

        // if focus is on an option, select it
        if (_.#currentFocusIndex >= 0) {
          _.selectOption({ target: options[_.#currentFocusIndex] });
        } else if (document.activeElement === _.#trigger) {
          _.show();
        }
        break

      default:
        // handle typeahead - find option starting with pressed key
        const key = e.key.toLowerCase();

        // only proceed if it's a single character
        if (key.length === 1) {
          // find the first option that starts with the pressed key
          const matchingOption = options.find((option) =>
            option.textContent.trim().toLowerCase().startsWith(key)
          );

          if (matchingOption) {
            const index = options.indexOf(matchingOption);
            _.focusOption(index);
          }
        }
        break
    }
  }

  /**
   * focuses a specific option by index
   * @param {number} index - the index of the option to focus
   */
  focusOption(index) {
    const _ = this;
    const options = Array.from(_.#options);

    // reset tabindex on all options
    options.forEach((opt) => {
      opt.setAttribute('tabindex', '-1');
    });

    // set tabindex on target option and focus it
    if (options[index]) {
      options[index].setAttribute('tabindex', '0');
      options[index].focus();
      _.#currentFocusIndex = index;

      // Ensure the option is visible in the dropdown
      options[index].scrollIntoView({
        block: 'nearest',
        behavior: 'instant'
      });
    }
  }

  /**
   * selects an option from the dropdown
   * @param {Event} e - the click event
   */
  selectOption(e) {
    const _ = this;
    const option = e.target.closest('select-option');
    if (!option) return

    // update aria-selected on all options
    _.#options.forEach((opt) => {
      opt.setAttribute('aria-selected', 'false');
      opt.removeAttribute('selected');
    });

    // mark selected option (keep both attributes in sync)
    option.setAttribute('aria-selected', 'true');
    option.setAttribute('selected', '');

    // update the input value
    if (_.#input) {
      _.#input.value = _.#getOptionValue(option);
    }

    // update the visible label
    if (_.#label) {
      _.#label.textContent = option.textContent.trim();
    }

    // dispatch change event
    _.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: _.#getOptionValue(option),
          text: option.textContent.trim(),
        },
        bubbles: true,
      })
    );

    // hide the dropdown
    _.hide();
  }

  /**
   * Positions the panel so the target option overlays the trigger
   * @param {HTMLElement} targetOption - the option to align over the trigger
   * @private
   */
  #positionPanel(targetOption) {
    const _ = this;
    const panel = _.#optionsContainer;
    if (!panel) return

    // Clear previous positioning
    panel.style.top = '';
    panel.style.transformOrigin = '';
    panel.scrollTop = 0;

    // Measure geometry
    const hostRect = _.getBoundingClientRect();
    const triggerRect = _.#trigger.getBoundingClientRect();
    const triggerOffset = triggerRect.top - hostRect.top;
    const panelHeight = panel.offsetHeight;

    let idealTop = triggerOffset;

    if (targetOption) {
      const optionOffsetTop = targetOption.offsetTop;

      // If the option is beyond the visible panel area, scroll internally
      if (optionOffsetTop > panelHeight - targetOption.offsetHeight) {
        const scrollTarget = optionOffsetTop - (panelHeight / 2) + (targetOption.offsetHeight / 2);
        panel.scrollTop = Math.max(0, scrollTarget);
        const visibleOptionOffset = optionOffsetTop - panel.scrollTop;
        idealTop = triggerOffset - visibleOptionOffset;
      } else {
        idealTop = triggerOffset - optionOffsetTop;
      }

      // Set transform-origin at the target option's visual position
      const originY = optionOffsetTop - panel.scrollTop + (targetOption.offsetHeight / 2);
      panel.style.transformOrigin = `center ${originY}px`;
    }

    // Viewport clamping — keep panel within the viewport
    const panelScreenTop = hostRect.top + idealTop;
    const panelScreenBottom = panelScreenTop + panelHeight;

    if (panelScreenBottom > window.innerHeight) {
      idealTop -= (panelScreenBottom - window.innerHeight);
    }

    // Re-check top edge after shifting up
    const newPanelScreenTop = hostRect.top + idealTop;
    if (newPanelScreenTop < 0) {
      idealTop -= newPanelScreenTop;
    }

    panel.style.top = `${idealTop}px`;
  }

  /**
   * shows the dropdown options
   */
  show() {
    const _ = this;

    // bail if already shown
    if (_.getAttribute('aria-hidden') === 'false') return

    // set attributes for shown state
    _.setAttribute('aria-hidden', 'false');
    _.#trigger.setAttribute('aria-expanded', 'true');

    // find selected option or default to first
    const options = Array.from(_.#options);
    const selectedOption = options.find(
      (opt) => opt.getAttribute('aria-selected') === 'true'
    );
    const targetOption = selectedOption || options[0];

    // position the panel overlay
    _.#positionPanel(targetOption);

    // focus the target option
    if (targetOption) {
      _.focusOption(options.indexOf(targetOption));
    }

    // add global event listeners
    document.addEventListener('click', _.#handleDocumentClick);
    document.addEventListener('keydown', _.#handleKeyDown);
  }

  /**
   * hides the dropdown options
   */
  hide() {
    const _ = this;

    // set attributes for hidden state — inline positioning stays
    // so the panel animates out in place (cleared on next show)
    _.setAttribute('aria-hidden', 'true');
    _.#trigger.setAttribute('aria-expanded', 'false');

    // reset the current focus index
    _.#currentFocusIndex = -1;

    // remove global event listeners
    document.removeEventListener('click', _.#handleDocumentClick);
    document.removeEventListener('keydown', _.#handleKeyDown);

    // return focus to trigger
    _.#trigger.focus();
  }
}

/**
 * select-trigger component
 * @class SelectTrigger
 * @extends HTMLElement
 */
class SelectTrigger extends HTMLElement {
  #handleKeyDown;
  #handleClick;

  constructor() {
    super();
    // Make the trigger focusable
    this.setAttribute('tabindex', '0');
    this.#handleKeyDown = this.#onKeyDown.bind(this);
    this.#handleClick = this.#onClick.bind(this);
  }

  connectedCallback() {
    // Add icon if not present
    if (!this.querySelector('.select-icon')) {
      const caret = document.createElement('span');
      caret.className = 'select-icon';
      this.appendChild(caret);
    }

    // Add event listeners
    this.addEventListener('keydown', this.#handleKeyDown);
    this.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.#handleKeyDown);
    this.removeEventListener('click', this.#handleClick);
  }

  /**
   * Handle keydown events on the trigger
   * @param {KeyboardEvent} e - The keyboard event
   * @private
   */
  #onKeyDown(e) {
    // Handle Enter and Space key presses
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling
      this.#openDropdown();
    }
  }

  /**
   * Handle click events on the trigger
   * @param {MouseEvent} e - The mouse event
   * @private
   */
  #onClick(e) {
    this.#openDropdown();
  }

  /**
   * Toggle the parent dropdown
   * @private
   */
  #openDropdown() {
    const dropdown = this.closest('select-dropdown');
    if (dropdown && typeof dropdown.show === 'function') {
      dropdown.show();
    }
  }
}

/**
 * select-panel component
 * @class SelectPanel
 * @extends HTMLElement
 */
class SelectPanel extends HTMLElement {
  constructor() {
    super();
  }
}

/**
 * select-option component
 * @class SelectOption
 * @extends HTMLElement
 */
class SelectOption extends HTMLElement {
  #handleClick;

  constructor() {
    super();
    this.#handleClick = this.#onClick.bind(this);
  }

  connectedCallback() {
    // Add click event listener
    this.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    // Clean up event listener
    this.removeEventListener('click', this.#handleClick);
  }

  /**
   * Handle click events on the option
   * @param {MouseEvent} e - The mouse event
   * @private
   */
  #onClick(e) {
    e.preventDefault();
    this.#notifySelection();
  }

  /**
   * Notify the parent dropdown that this option was selected
   * @private
   */
  #notifySelection() {
    const dropdown = this.closest('select-dropdown');
    if (dropdown && typeof dropdown.selectOption === 'function') {
      dropdown.selectOption({ target: this });
    }
  }
}

/**
 * select-divider component - visual separator between option groups
 * @class SelectDivider
 * @extends HTMLElement
 */
class SelectDivider extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'separator');
  }
}

/**
 * select-label component - non-interactive group heading within a select panel
 * @class SelectLabel
 * @extends HTMLElement
 */
class SelectLabel extends HTMLElement {
  constructor() {
    super();
    this.setAttribute('role', 'presentation');
  }
}

/**
 * @file Main entry point for select-dropdown web component
 * @author Cory Schulz
 * @version 1.0.0
 */


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

exports.SelectDivider = SelectDivider;
exports.SelectDropdown = SelectDropdown;
exports.SelectLabel = SelectLabel;
exports.SelectOption = SelectOption;
exports.SelectPanel = SelectPanel;
exports.SelectTrigger = SelectTrigger;
//# sourceMappingURL=select-dropdown.cjs.js.map
