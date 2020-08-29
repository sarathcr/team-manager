/*
Keyboard.utility.ts contains the util functions related to keypess.
*/

// Function returns true when keycode relates to a non-functional key
export function isNonFunctionalKey(keyCode: number): boolean {
  if (
    (keyCode > 47 && keyCode < 58) || // number keys
    keyCode === 32 ||
    keyCode === 8 || // spacebar & backspace
    (keyCode > 64 && keyCode < 91) || // letter keys
    (keyCode > 95 && keyCode < 112) || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223) // [\]' (in order)
  ) {
    return true
  }
  return false
}
