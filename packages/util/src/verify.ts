abstract class Pattern {
  abstract regexp: RegExp

  abstract message: string

  verify(value: string) {
    if (!this.regexp.test(value)) {
      return this.message
    }
    return undefined
  }
}

export class IDPattern extends Pattern {
  regexp = /sss/

  constructor(public message: string) {
    super()
  }
}
