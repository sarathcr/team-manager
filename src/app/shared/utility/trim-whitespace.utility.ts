/*
trim-whitespace.utility.ts contains the util functions related to keypess.
*/

// Function returns trimmed string without any enter/extra whitespaces
export function trimWhitespace(data: string): string {
  return data.replace(/(\r\n|\n|\r)/gm, '')
}
