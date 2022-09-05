/**
 * 环境判断
 */

export const isBrowser = typeof window === 'object' && typeof window.navigator === 'object'

export const isNode = typeof process !== 'undefined' && typeof global !== 'undefined'

export const ua = isBrowser ? window.navigator.userAgent.toLowerCase() : ''

export const isIE = ua ? /msie|trident/i.test(ua) : false

export const isIE9 = ua ? /msie 9\.0/i.test(ua) : false

export const isEdge = ua ? /edge\/|Edg\//i.test(ua) : false

export const isAndroid = ua ? /android/i.test(ua) : false

export const isIOS = ua ? /iphone|ipad|ipod|ios/i.test(ua) : false

export const isChrome = ua ? /chrome\/\d+/i.test(ua) && !isEdge : false

export const isPhantomJS = ua ? /phantomjs/i.test(ua) : false

export const isFirefox = ua ? /firefox\/(\d+)/i.test(ua) : false

export const isWindows = (ua && /Windows/i.test(ua)) || (isNode && process.platform === 'win32')

export const isMacintosh = (ua && /Macintosh/i.test(ua)) || (isNode && process.platform === 'darwin')

export const isLinux = (ua && /Linux/i.test(ua)) || (isNode && process.platform === 'linux')

export const isElectronRendererProcess =
  typeof window !== 'undefined' && typeof window.process === 'object' && (window.process as any).type === 'renderer'

export const isElectronMainProcess =
  typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron

export const isElectronBrowser =
  typeof navigator === 'object' &&
  typeof navigator.userAgent === 'string' &&
  navigator.userAgent.indexOf('Electron') >= 0

export const isElectron = isElectronRendererProcess || isElectronMainProcess || isElectronBrowser
