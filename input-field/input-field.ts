import { CommonModule } from "@angular/common";
import { Component, forwardRef, Injector, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";

/**
 * @class A custom input field that uses Angular's control value accessor (CVA) for
 * relating its value to a reactive's form form group field.
 *
 * When a formControlName is given, Reactive form's form builder will handle the error messages.

 * Inputs:
 *
 * Label - The text that shows on the top left of the field box
 *
 * Placeholder - The text that shows temporary inside the field box
 *
 * Mask - Defines the shape of the data that can be typed

 * ### Supported tokens
 * | Token | Description |
 * |------|-------------|
 * | `N`  | Numeric character (`0–9`) |
 * | `L`  | Alphabetic character (`A–Z`, `a–z`) |
 * | `A`  | Alphanumeric characters |
 * | `*`  | Any character (N + L) (`A–Z`, `a–z`, `0–9`) |
 *
 * @example
 * ```html
 * <input-field mask="NNN-LLLL"/>
 * ```
 * - Mask: `NNN-LLLL`
 * - Input: `12a3BcDe`
 * - Output: `123-BcDe`
 *
 * @example
 * ```html
 * <input-field
 *   formControlName="name"
 *   label="Name"
 *   placeholder="Enter your name"
 * />
 * ```
 */
@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true,
    },
  ]
})
export class InputField implements ControlValueAccessor {

  @Input()
  label = "";

  @Input()
  placeholder = "";

  //====================The Mask=====================
  @Input()
  mask: String | null = null;

  // The mask max length based on its tokens (N, L..)
  private maskMaxRawLength: number | null = null;

  private readonly maskPatterns: Record<string, RegExp> = {
    'N': /[0-9]/,
    'L': /[a-zA-Z]/,
    'A': /[a-zA-Z0-9]/,
    '*': /./
  };
  //===================================================

  value: string | null = null;

  disabled = false;

  ngControl: NgControl | null = null;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });

    if (this.mask != null) {
      this.maskMaxRawLength = [...this.mask]
        .filter(c => this.maskPatterns[c])
        .length;
    }
  }

  get control() { // Makes the form control group accessible
    return this.ngControl?.control ?? null;
  }

  //================CVA callbacks=================
  private onChange = (_: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = this.applyMask(value) ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(value: string, input: HTMLInputElement) {
    const maskedValue = this.applyMask(value);
    const rawValue = this.removeMask(maskedValue);

    // The value emitted to the DOM html input field
    input.value = maskedValue;
    // The value emitted to the reactive form's form group
    this.onChange(rawValue);
  }

  handleBlur() {
    this.onTouched();
  }
  //==============================================

  /**
   * **Exclusively used internally**
   *
   * The method that actually applies the user-defined mask.
   *
   * It is used exclusively by the CVA callbacks inside the directive {@link InputMask}.
   * @param value The input value to be masked
   * @returns  The value of the input field altered by the mask
   */
  private applyMask(value: string): string {
    if (!this.mask) return value;

    let result = '';
    let valueIndex = 0;

    for (let maskIndex = 0; maskIndex < this.mask.length; maskIndex++) {
      const maskChar = this.mask[maskIndex];
      const valueChar = value[valueIndex];

      if (!valueChar) break;

      const pattern = this.maskPatterns[maskChar];

      if (pattern) {
        if (pattern.test(valueChar)) {
          result += valueChar;
          valueIndex++;
        } else {
          valueIndex++;
          maskIndex--;
        }
      } else {
        result += maskChar;
        if (valueChar === maskChar) {
          valueIndex++;
        }
      }
    }

    return result;
  }

  /**
   * **Exclusively used internally** by the CVA callback {@link onInput}.
   *
   * In it, its used for serving the form control with the raw value of the input.
   * @example
   * ```(12) 34-abcd becomes 1234abcd```
   *
   * @param value The input value
   * @returns The input value with only letters and numbers.
   * If theres a mask present, it will also limit the the length of this return.
   */
  private removeMask(value: string): string {
    const raw = value.replace(/[^a-zA-Z0-9]/g, ''); // “match any character that's NOT a letter or a digit”, replace them with ''

    if (!this.maskMaxRawLength) return raw;

    return raw.slice(0, this.maskMaxRawLength);
  }
}
