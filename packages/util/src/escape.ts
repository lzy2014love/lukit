/** Used to map characters to HTML entities. */
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

type Keys = keyof typeof htmlEscapes
/**
 * 转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
 * @example
 *
 * escape('fred, barney, & pebbles')
 * // => 'fred, barney, &amp; pebbles'
 */
export function escapeHtml(htmlString: string) {
  return htmlString && reHasUnescapedHtml.test(htmlString)
    ? htmlString.replace(reUnescapedHtml, (chr) => htmlEscapes[chr as Keys])
    : htmlString || ''
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
const reHasRegExpChar = RegExp(reRegExpChar.source)

/**
 * 转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", ", ", 和 "|" in .
 *
 * @example
 *
 * escapeRegExp('[lodash](https://lodash.com/)')
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
export function escapeRegExp(regexpString: string) {
  return regexpString && reHasRegExpChar.test(regexpString)
    ? regexpString.replace(reRegExpChar, '\\$&')
    : regexpString || ''
}
