/**
 * 正则表达式
 */

/**
 * 第二代身份证号码
 */
export const idCardRegexp = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

/**
 * 手机号码，宽松校验
 */
export const mobilePhoneRegexp = /^1[0-9]{10}$/

/**
 * 邮箱
 */
// eslint-disable-next-line no-useless-escape
export const emailRegexp = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/

/**
 * 包含中文正则
 */
export const chineseRegexp = /[\u4E00-\u9FA5]/

/**
 * 邮政编码
 */
export const postCodeRegexp = /[1-9]{1}(\d+){5}/

/**
 * ipv4地址正则
 */
export const ipRegexp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

/**
 * URL正则
 */
// eslint-disable-next-line no-useless-escape
export const urlRegexp = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
