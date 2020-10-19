// Custom table layouts
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
    paddingTop(i: number, node: any): number {
      return i === 0 ? 5 : 10
    },
    paddingBottom(i: number, node: any): number {
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
    paddingLeft(i: number): number {
      return i === 0 ? 10 : 0
    },
    paddingRight(i: number): number {
      return i === 0 ? 10 : 0
    },
    paddingTop(i: number): number {
      return i === 0 ? 4 : 12
    },
    paddingBottom(i: number): number {
      return i === 0 ? 4 : 12
    },
    fillColor(rowIndex: number): any {
      return rowIndex === 0 ? '#6400E4' : '#FAFBFB'
    },
  },
  tertiaryLayout: {
    hLineWidth(i: number, node: any): number {
      return i === node.table.body.length ? 0 : 2
    },
    vLineWidth(): number {
      return 2
    },
    hLineColor(i: number, node: any): string {
      return '#FFFFFF'
    },
    vLineColor(i: number, node: any): string {
      return i === 0 || i === node.table.widths.length ? '#6400E4' : '#FFFFFF'
    },
    paddingLeft(i: number, node: any): number {
      return i === 0 || i === 1 ? 14 : 8
    },
    paddingRight(i: number, node: any): number {
      return i === 0 || i === 1 ? 14 : 8
    },
    paddingTop(): number {
      return 6
    },
    paddingBottom(): number {
      return 6
    },
    fillColor(rowIndex: number): any {
      return rowIndex === 0 ? '#FFFFFF' : '#FAFBFB'
    },
  },
  finalLayout: {
    hLineWidth(): number {
      return 2
    },
    vLineWidth(): number {
      return 2
    },
    hLineColor(i: number, node: any): string {
      return i === node.table.body.length ? '#6400E4' : '#FFFFFF'
    },
    vLineColor(i: number, node: any): string {
      return i === 0 || i === node.table.widths.length ? '#6400E4' : '#FFFFFF'
    },
    paddingLeft(i: number, node: any): number {
      return i === 0 || i === 1 ? 14 : 8
    },
    paddingRight(i: number, node: any): number {
      return i === 0 || i === 1 ? 14 : 8
    },
    paddingTop(): number {
      return 6
    },
    paddingBottom(): number {
      return 6
    },
    fillColor(rowIndex: number): any {
      return rowIndex === 0 ? '#FFFFFF' : '#FAFBFB'
    },
  },
  headerLayout: {
    hLineWidth(): number {
      return 0
    },
    vLineWidth(): number {
      return 0
    },
    hLineColor(): string {
      return '#6400E4'
    },
    vLineColor(): string {
      return '#6400E4'
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
    fillColor(): string {
      return '#6400E4'
    },
  },
  competencyLayout: {
    hLineWidth(): number {
      return 2
    },
    vLineWidth(): number {
      return 2
    },
    hLineColor(i: number, node: any): string {
      return i === node.table.body.length ? '#6400E4' : '#FFFFFF'
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
    paddingTop(i: number, node: any): number {
      return i === node.table.body.length - 1 ? 15 : 5
    },
    paddingBottom(i: number, node: any): number {
      return i === node.table.body.length - 1 ? 15 : 5
    },
    fillColor(rowIndex: number): any {
      return rowIndex === 0 ? '#FFFFFF' : '#FAFBFB'
    },
  },
  resumenLayout: {
    hLineWidth(): number {
      return 2
    },
    vLineWidth(): number {
      return 2
    },
    hLineColor(): string {
      return '#6400E4'
    },
    vLineColor(): string {
      return '#6400E4'
    },
    paddingLeft(i: number): number {
      return i % 2 ? 0 : 4
    },
    paddingRight(i: number): number {
      return i % 2 ? 0 : 4
    },
    paddingTop(i: number): number {
      return 2
    },
    paddingBottom(): number {
      return 2
    },
    fillColor(): any {
      return '#6400E4'
    },
  },
  activityList: {
    hLineWidth(i: number, node: any): number {
      return i === 0 || i === node.table.body.length ? 0 : 10
    },
    vLineWidth(i: number): number {
      return 0
    },
    hLineColor(): string {
      return '#fff'
    },
    vLineColor(i: number): string {
      return '#FAFBFB'
    },
    paddingLeft(i: number): number {
      return i === 0 ? 20 : 0
    },
    paddingRight(i: number): number {
      return i === 0 ? 6 : i % 2 ? 0 : 6
    },
    paddingTop(i: number): number {
      return i === 0 ? 0 : 12
    },
    paddingBottom(i: number, node: any): number {
      return i === 0 ? 0 : 12
    },
    fillColor(i: number): any {
      return i === 0 ? '#fff' : '#FAFBFB'
    },
  },
  activityDetails: {
    hLineWidth(i: number, node: any): number {
      return 1
    },
    vLineWidth(i: number): number {
      return 1
    },
    hLineColor(): string {
      return '#FAFBFB'
    },
    vLineColor(i: number): string {
      return '#FAFBFB'
    },
    paddingLeft(i: number, node: any): number {
      return i === 0 ? 20 : 5
    },
    paddingRight(i: number, node: any): number {
      return i === node.table.widths.length - 1 ? 20 : 5
    },
    paddingTop(i: number, node: any): number {
      return i === 0 ? 20 : 0
    },
    paddingBottom(i: number, node: any): number {
      return i === node.table.body.length - 1 ? 20 : 0
    },
    fillColor(): any {
      return '#FAFBFB'
    },
  },
  rowTable: {
    hLineWidth(i: number, node: any): number {
      return i === node.table.body.length ? 1 : 0
    },
    vLineWidth(i: number): number {
      return 0
    },
    hLineColor(): string {
      return '#E8EAEB'
    },
    paddingLeft(i: number, node: any): number {
      return 0
    },
    paddingRight(i: number, node: any): number {
      return i === 0 ? 20 : 0
    },
    paddingTop(i: number, node: any): number {
      return i === 0 ? 12 : 0
    },
    paddingBottom(i: number, node: any): number {
      return i === node.table.body.length - 1 ? 12 : 0
    },
    fillColor(): any {
      return '#FAFBFB'
    },
  },
}
