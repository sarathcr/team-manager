export const TableLayouts = {
  defaultLayout: {
    hLineWidth(i: number, node: any): number {
      return i === 0 ? 0 : 2
    },
    vLineWidth(i: number, node: any): number {
      return 2
    },
    hLineColor(i: number, node: any): string {
      return i === 0 || i === node.table.body.length ? '#6400E4' : '#FFFFFF'
    },
    vLineColor(i: number, node: any): string {
      return i === 0 || i === node.table.widths.length ? '#6400E4' : '#FFFFFF'
    },
    paddingLeft(): number {
      return 10
    },
    paddingRight(): number {
      return 10
    },
    paddingTop(i: number): number {
      return i === 0 ? 5 : 10
    },
    paddingBottom(i: number): number {
      return i === 0 ? 5 : 10
    },
    fillColor(rowIndex: number): any {
      return rowIndex === 0 ? '#6400E4' : '#FAFBFB'
    },
  },
  secondaryLayout: {
    hLineWidth(): number {
      return 2
    },
    vLineWidth(): number {
      return 2
    },
    hLineColor(i: number, node: any): string {
      return i === 0 || i === node.table.body.length ? '#6400E4' : '#FAFBFB'
    },
    vLineColor(i: number, node: any): string {
      return i === 0 || i === node.table.widths.length ? '#6400E4' : '#FFFFFF'
    },
    paddingLeft(): number {
      return 10
    },
    paddingRight(): number {
      return 10
    },
    paddingTop(): number {
      return 5
    },
    paddingBottom(): number {
      return 5
    },
    fillColor(rowIndex: number): any {
      return rowIndex === 0 ? '#6400E4' : '#FAFBFB'
    },
  },
}
