export class ClearAllSetTimeouts {
  protected timeouts = []

  constructor() {}

  set add(timeout: any) {
    this.timeouts.push(timeout)
  }

  clearAll(): void {
    if (this.timeouts?.length) {
      this.timeouts.forEach((timeout) => timeout && clearTimeout(timeout))
    }
    this.timeouts = []
  }
}
