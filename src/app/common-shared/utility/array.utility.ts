/*
Array.utility.ts contains the util functions related to array.
*/

// Function returns true when both the input arrays are equal
export function compareArray(arry1: any[], arry2: any[]): boolean {
  return JSON.stringify(arry1) === JSON.stringify(arry2)
}
