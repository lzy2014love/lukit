/**
 * 环境判断
 */

export const isBrowser = typeof window === 'object' && typeof window.navigator === 'object'

export const isNode = typeof process !== 'undefined' && typeof global !== 'undefined'

export const ua = isBrowser ? window.navigator.userAgent.toLowerCase() : ''

export const isIE = ua ? /msie|trident/.test(ua) : false

export const isIE9 = ua ? ua.includes('msie 9.0') : false

export const isEdge = ua ? /edge\/|Edg\//.test(ua) : false

export const isAndroid = ua ? ua.includes('android') : false

export const isIOS = ua ? /iphone|ipad|ipod|ios/.test(ua) : false

export const isChrome = ua ? /chrome\/\d+/.test(ua) && !isEdge : false

export const isPhantomJS = ua ? /phantomjs/.test(ua) : false

export const isFirefox = ua ? ua.match(/firefox\/(\d+)/) : false

export const isWindows = (ua && ua.includes('Windows')) || (isNode && process.platform === 'win32')

export const isMacintosh = (ua && ua.includes('Macintosh')) || (isNode && process.platform === 'darwin')

export const isLinux = (ua && ua.includes('Linux')) || (isNode && process.platform === 'linux')

export const isElectronRendererProcess =
  typeof window !== 'undefined' && typeof window.process === 'object' && (window.process as any).type === 'renderer'

export const isElectronMainProcess =
  typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron

export const isElectronBrowser =
  typeof navigator === 'object' &&
  typeof navigator.userAgent === 'string' &&
  navigator.userAgent.indexOf('Electron') >= 0

export const isElectron = isElectronRendererProcess || isElectronMainProcess || isElectronBrowser
