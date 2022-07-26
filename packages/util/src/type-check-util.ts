/* eslint-disable no-param-reassign */

import { Fn } from './interface'

/** `Object#toString` result references. */
export const nullTag = '[object Null]'
export const undefinedTag = '[object Undefined]'
export const argsTag = '[object Arguments]'
export const arrayTag = '[object Array]'
export const boolTag = '[object Boolean]'
export const dateTag = '[object Date]'
export const errorTag = '[object Error]'
export const funcTag = '[object Function]'
export const genTag = '[object GeneratorFunction]'
export const mapTag = '[object Map]'
export const numberTag = '[object Number]'
export const objectTag = '[object Object]'
export const regexpTag = '[object RegExp]'
export const setTag = '[object Set]'
export const stringTag = '[object String]'
export const symbolTag = '[object Symbol]'
export const weakMapTag = '[object WeakMap]'
export const weakSetTag = '[object WeakSet]'
export const arrayBufferTag = '[object ArrayBuffer]'
export const dataViewTag = '[object DataView]'
export const float32Tag = '[object Float32Array]'
export const float64Tag = '[object Float64Array]'
export const int8Tag = '[object Int8Array]'
export const int16Tag = '[object Int16Array]'
export const int32Tag = '[object Int32Array]'
export const uint8Tag = '[object Uint8Array]'
export const uint8ClampedTag = '[object Uint8ClampedArray]'
export const uint16Tag = '[object Uint16Array]'
export const uint32Tag = '[object Uint32Array]'
export const proxyTag = '[object Proxy]'
export const asyncTag = '[object AsyncFunction]'
export const domExcTag = '[object DOMException]'
export const symToStringTag = Symbol.toStringTag

export const objectProto = Object.prototype
export const funcProto = Function.prototype
export const funcToString = funcProto.toString
export const objectCtorString = funcToString.call(Object)

export const nativeHasOwnProperty = objectProto.hasOwnProperty
export const nativePropertyIsEnumerable = objectProto.propertyIsEnumerable
export const nativeToString = objectProto.toString

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
export function objectToString(value: any) {
  return nativeToString.call(value)
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
export function getRawTag(value: any) {
  const isOwn = nativeHasOwnProperty.call(value, symToStringTag)
  const tag = value[symToStringTag]
  let unmasked = false
  try {
    // eslint-disable-next-line no-param-reassign
    value[symToStringTag] = undefined
    unmasked = true
    // eslint-disable-next-line no-empty
  } catch (e) {}

  const result = nativeToString.call(value)
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`. `[object Undefined]` `[object Null]`
 */
export function getTag(value: any): string {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag
  }
  return toString.call(value)
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
export function baseGetTag(value: any) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value)
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *

 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * isLength(3);
 * // => true
 *
 * isLength(Number.MIN_VALUE);
 * // => false
 *
 * isLength(Infinity);
 * // => false
 *
 * isLength('3');
 * // => false
 */
export function isLength(value: any) {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func: Fn, transform: Fn) {
  return function (arg: any) {
    return func(transform(arg))
  }
}

export const getPrototype = overArg(Object.getPrototypeOf, Object)
