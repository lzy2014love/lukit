import { AssertError } from './error'

/**
 * 断言， `value` 值为 `false` 时报错
 * @param value 判断值
 * @param message 错误消息
 */
export function assert(value?: unknown, message?: string) {
  if (!value) {
    throw new AssertError(message ?? 'Assertion Failed')
  }
}
