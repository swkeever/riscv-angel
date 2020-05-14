// grabs styles from design system declared in CSS
//
// if you need a style from the design system,
// then get the property value and export it
// using the naming convention described in the
// comments.
const cssStyles = getComputedStyle(document.body);

const styles = {};
for (let i = 1; i <= 9; i += 1) {
  styles[`colorP${i}`] = cssStyles.getPropertyValue(`--color-p${i}`);
  styles[`colorG${i}`] = cssStyles.getPropertyValue(`--color-g${i}`);
  styles[`sz${i}`] = cssStyles.getPropertyValue(`--sz-${i}`);
  if (i <= 4) {
    styles[`tiny${i}`] = cssStyles.getPropertyValue(`--tiny-${i}`);
  }
}

styles.font = cssStyles.getPropertyValue('--font');
styles.fontMono = cssStyles.getPropertyValue('--font-mono');

export default styles;
