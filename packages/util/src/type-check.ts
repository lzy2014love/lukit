/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 类型检测
 */

import {
  arrayBufferTag,
  asyncTag,
  baseGetTag,
  boolTag,
  dateTag,
  domExcTag,
  errorTag,
  funcTag,
  funcToString,
  genTag,
  getPrototype,
  getTag,
  isLength,
  mapTag,
  nativeHasOwnProperty,
  numberTag,
  objectCtorString,
  objectTag,
  proxyTag,
  regexpTag,
  setTag,
  stringTag,
  symbolTag,
  weakMapTag,
  weakSetTag,
} from './type-check-util'
import { Fn, Nil } from './interface'

/**
 * `Array.isArray` 的别名
 */
export const { isArray } = Array

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * isObject({});
 * // => true
 *
 * isObject([1, 2, 3]);
 * // => true
 *
 * isObject(noop);
 * // => true
 *
 * isObject(null);
 * // => false
 */
export function isObject(value: unknown): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * 检查 `value` 是否是 类对象, 实现： `typeof value === 'object' && value !== null`
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 */
export function isObjectLike(value: any): value is object {
  return typeof value === 'object' && value !== null
}

/**
 * 判断是否是空对象
 */
export function isEmptyObject(obj: unknown): obj is Record<string, never> {
  if (!isObject(obj)) {
    return false
  }

  for (const key in obj) {
    if (nativeHasOwnProperty.call(obj, key)) {
      return false
    }
  }

  return true
}

/**
 * 检查 `value` 是否是 `null` 或者 `undefined`。
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * isNil(null);
 * // => true
 *
 * isNil(void 0);
 * // => true
 *
 * isNil(NaN);
 * // => false
 */
export function isNil(value: any): value is Nil {
  return value == null
}

/**
 * 检查 `value` 是否是 `null`
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * isNull(null);
 * // => true
 *
 * isNull(void 0);
 * // => false
 */
export function isNull(value: any): value is null {
  return value === null
}

/**
 * 检查 `value` 是否是 `undefined`
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * isUndefined(undefined);
 * // => true
 *
 * isUndefined(void 0);
 * // => false
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined
}

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `isFinite` method.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * isNumber(3);
 * // => true
 *
 * isNumber(Number.MIN_VALUE);
 * // => true
 *
 * isNumber(Infinity);
 * // => true
 *
 * isNumber('3');
 * // => false
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' || (isObjectLike(value) && baseGetTag(value) === numberTag)
}

/**
 * 检查 `value` 是否是 `NaN`
 *
 * **Note:** This method is based on
 * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
 * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
 * `undefined` and other non-number values.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * isNaN(NaN);
 * // => true
 *
 * isNaN(new Number(NaN));
 * // => true
 *
 * isNaN(undefined);
 * // => true
 *
 * isNaN(undefined);
 * // => false
 */
export function isNaN(value: any): value is number {
  // An `NaN` primitive is the only value that is not equal to itself.
  // Perform the `toStringTag` check first to avoid errors with some
  // ActiveX objects in IE.
  // eslint-disable-next-line eqeqeq
  return isNumber(value) && value != +value
}

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * isRegExp(/abc/);
 * // => true
 *
 * isRegExp('/abc/');
 * // => false
 */
export function isRegExp(value: any): value is RegExp {
  return isObjectLike(value) && baseGetTag(value) === regexpTag
}

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(2));
 * // => true
 *
 * isArrayBuffer(new Array(2));
 * // => false
 */
export function isArrayBuffer(value: any): value is ArrayBuffer {
  return isObjectLike(value) && baseGetTag(value) === arrayBufferTag
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * isFunction(_);
 * // => true
 *
 * isFunction(/abc/);
 * // => false
 */
export function isFunction(value: any): value is Fn {
  if (!isObject(value)) {
    return false
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  const tag = baseGetTag(value)
  const newLocal = tag === funcTag || tag === genTag || tag === asyncTag || tag === proxyTag
  return newLocal
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *

 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * isArrayLike([1, 2, 3]);
 * // => true
 *
 * isArrayLike(document.body.children);
 * // => true
 *
 * isArrayLike('abc');
 * // => true
 *
 * isArrayLike(noop);
 * // => false
 */
export function isArrayLike(value: any) {
  return value != null && isLength(value.length) && !isFunction(value)
}

/**
 * This method is like `isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * isArrayLikeObject(document.body.children);
 * // => true
 *
 * isArrayLikeObject('abc');
 * // => false
 *
 * isArrayLikeObject(noop);
 * // => false
 */
export function isArrayLikeObject(value: any) {
  return isObjectLike(value) && isArrayLike(value)
}

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false);
 * // => true
 *
 * isBoolean(null);
 * // => false
 */
export function isBoolean(value: any): value is boolean {
  return value === true || value === false || (isObjectLike(value) && baseGetTag(value) === boolTag)
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * isBuffer(new Buffer(2));
 * // => true
 *
 * isBuffer(new Uint8Array(2));
 * // => false
 */
export function isBuffer(value: any): value is Buffer {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value)
}

/**
 * The base implementation of `isDate` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 */
export function isDate(value: any): value is Date {
  return isObjectLike(value) && baseGetTag(value) === dateTag
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * isPlainObject(new Foo);
 * // => false
 *
 * isPlainObject([1, 2, 3]);
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * isPlainObject(Object.create(null));
 * // => true
 */
export function isPlainObject(value: any): value is object {
  if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
    return false
  }
  const proto = getPrototype(value)
  if (proto === null) {
    return true
  }
  const Ctor = nativeHasOwnProperty.call(proto, 'constructor') && proto.constructor
  return typeof Ctor === 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString
}

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * isError(new Error);
 * // => true
 *
 * isError(Error);
 * // => false
 */
export function isError(value: any): value is Error {
  if (!isObjectLike(value)) {
    return false
  }
  const tag = baseGetTag(value)
  return (
    tag === errorTag ||
    tag === domExcTag ||
    (typeof (value as any).message === 'string' && typeof (value as any).name === 'string' && !isPlainObject(value))
  )
}

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * isInteger(3);
 * // => true
 *
 * isInteger(Number.MIN_VALUE);
 * // => false
 *
 * isInteger(Infinity);
 * // => false
 *
 * isInteger('3');
 * // => false
 */
export function isInteger(value: any): value is number {
  return typeof value === 'number' && Number.isInteger(value)
}

/**
 * The base implementation of `isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
export function isMap(value: any): value is Map<any, any> {
  return isObjectLike(value) && getTag(value) === mapTag
}

/**
 * The base implementation of `isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
export function baseIsSet(value: any): value is Set<any> {
  return isObjectLike(value) && getTag(value) === setTag
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc');
 * // => true
 *
 * isString(1);
 * // => false
 */
export function isString(value: any): value is string {
  return typeof value === 'string' || (!isArray(value) && isObjectLike(value) && baseGetTag(value) === stringTag)
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator);
 * // => true
 *
 * isSymbol('abc');
 * // => false
 */
export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol' || (isObjectLike(value) && baseGetTag(value) === symbolTag)
}

/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * isWeakMap(new WeakMap);
 * // => true
 *
 * isWeakMap(new Map);
 * // => false
 */
export function isWeakMap(value: any): value is WeakMap<object, any> {
  return isObjectLike(value) && getTag(value) === weakMapTag
}

/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * isWeakSet(new WeakSet);
 * // => true
 *
 * isWeakSet(new Set);
 * // => false
 */
export function isWeakSet(value: any): value is WeakSet<any> {
  return isObjectLike(value) && baseGetTag(value) === weakSetTag
}
