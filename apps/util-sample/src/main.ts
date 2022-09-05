import '@lukit/css'
import * as LKUtil from '@lukit/util'

console.log('================')
console.log('LKUtil  >>>>>>', ((window as any).LKUtil = LKUtil))
console.log('LKUtil toString  >>>>>>', Object.prototype.toString.call(LKUtil))
console.log('================')
