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

/**
 * 编译到 es6 正常
 * @link {https://www.hikerpig.cn/2018-04-02-Customize-Error-in-Typescript/}
 */
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
