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
* You pass the label and placeholder for display, the form control name for serving it to the reactive form's form builder and, optionally, a mask for filtering the input.<br>
* The reactive form will handle the error messages, together with the built in features.

You can also type a mask according to these tokens:
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

<ul>
    <li>Mask: `NNN-LLLL`</li>
    <li>Input: `12a3BcDe`</li>
    <li>Output: `123-BcDe`</li>
</ul>
