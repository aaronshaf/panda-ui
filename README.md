Panda UI is a set of stylesheets and web components in the likeness (and based on the work of) [InstUI](https://github.com/instructure/instructure-ui).

Status: Proof of concept made during a hackweek.

## Global stylesheets

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://unpkg.com/@aaronshaf/panda-ui@1/dist/themes/canvas.css"
/>
<!-- or -->
<link
  rel="stylesheet"
  type="text/css"
  href="https://unpkg.com/@aaronshaf/panda-ui@1/dist/themes/canvas-high-contrast.css"
/>
```

```css
.body {
  font-family: var(--typography-fontFamily);
}
```

## Web components

### Alert

```html
<script
  src="https://unpkg.com/@aaronshaf/panda-ui@1/dist/elements/alert.js"
  defer
></script>
<script
  src="https://unpkg.com/@aaronshaf/panda-ui@1/dist/icons/checkmark.js"
  defer
></script>
```

```html
<panda-alert variant="success">
  <div slot="icon">
    <panda-icon-checkmark></panda-icon-checkmark>
  </div>
  <div slot="content">
    Sample success alert text.
  </div>
</panda-alert>
```

### Button

```html
<script src="https://unpkg.com/@aaronshaf/panda-ui@1/dist/elements/button.js"></script>
```

```html
<panda-button variant="primary">
  Primary button
</panda-button>
```

### Progress Bar

```html
<script
  src="https://unpkg.com/@aaronshaf/panda-ui@1/dist/elements/progress-bar.js"
  defer
></script>
```

```html
<panda-progress-bar
  label="Loading completion"
  max="60"
  value="20"
  variant="primary"
>
  Primary button
</panda-progress-bar>
```

## Dev

```
yarn
yarn run prepare
yarn run dev
```
