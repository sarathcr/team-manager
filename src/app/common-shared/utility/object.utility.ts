// Function removes object freeze property
export function unfreeze(object: object | any[]): any {
  return JSON.parse(JSON.stringify(object))
}
