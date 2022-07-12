export function getErrorMessage(err: any): string {
  if (!err) {
    return 'Error'
  }

  if (err.message) {
    return err.message
  }

  if (err.stack) {
    return err.stack.split('\n')[0]
  }

  return String(err)
}

export class CustomError extends Error {
  constructor(message?: string) {
    super('CustomError')
    if (message) {
      this.message = message
    }
  }
}

export class AssertError extends CustomError {
  constructor(message?: string) {
    super('AssertError')
    if (message) {
      this.message = message
    }
  }
}
