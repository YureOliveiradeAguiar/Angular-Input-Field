<img src="demo.gif" width="350px" alt="Demo">

<strong>Use Example</strong><br>
```html
<app-input-field
    label="Identification"
    formControlName="identification"
    placeholder="AAA-999"
    mask="LLL-NNN"
/>
```
You can also type a mask according to these tokens:
### Mask Supported tokens

<table>
  <thead>
    <tr>
      <th>Token</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>N</code></td>
      <td>Numeric character (<code>0–9</code>)</td>
    </tr>
    <tr>
      <td><code>L</code></td>
      <td>Alphabetic character (<code>A–Z</code>, <code>a–z</code>)</td>
    </tr>
    <tr>
      <td><code>A</code></td>
      <td>Alphanumeric characters</td>
    </tr>
    <tr>
      <td><code>*</code></td>
      <td>Any character (N + L) (<code>A–Z</code>, <code>a–z</code>, <code>0–9</code>)</td>
    </tr>
  </tbody>
</table>
- Mask: `NNN-LLLL`
- Input: `12a3BcDe`
- Output: `123-BcDe`

You only pass the label and placeholder for display and the form control name for serving it to the reactive form's form builder. This one will handle the error messages, together with the built in features.
