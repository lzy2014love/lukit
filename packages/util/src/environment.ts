/**
 * 环境判断
 */

export const isBrowser = typeof window === 'object' && typeof window.navigator === 'object'

export const isNode = typeof process !== 'undefined' && typeof global !== 'undefined'

export const ua = isBrowser ? window.navigator.userAgent.toLowerCase() : ''

export const isIE = ua && /msie|trident/.test(ua)

export const isIE9 = ua && ua.includes('msie 9.0')

export const isEdge = ua && /edge\/|Edg\//.test(ua)

export const isAndroid = ua && ua.includes('android')

export const isIOS = ua && /iphone|ipad|ipod|ios/.test(ua)

export const isChrome = ua && /chrome\/\d+/.test(ua) && !isEdge

export const isPhantomJS = ua && /phantomjs/.test(ua)

export const isFirefox = ua && ua.match(/firefox\/(\d+)/)

export const isWindows = (ua && ua.includes('Windows')) || (isNode && process.platform === 'win32')

export const isMacintosh = (ua && ua.includes('Macintosh')) || (isNode && process.platform === 'darwin')

export const isLinux = (ua && ua.includes('Linux')) || (isNode && process.platform === 'linux')

export const isElectron = typeof process?.versions?.electron === 'string'
