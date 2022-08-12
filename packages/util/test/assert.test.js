import { describe, it, expect } from 'vitest'
import { assert as myAssert } from '../src/assert'
import { AssertError } from "../src/error";

describe.concurrent('assert', () => {
  it('assert(true)', () => {
    expect(myAssert(true)).toBe(undefined)
  })

  it('assert(false)', () => {
    try {
      myAssert(false)
    } catch (e) {
      expect(e instanceof AssertError).toBeTruthy()
      expect(e.message === 'Assertion Failed').toBeTruthy()
    }
  })

  it('assert(false, "error")', () => {
    try {
      myAssert(false, "error")
    } catch (e) {
      expect(e instanceof AssertError).toBeTruthy()
      expect(e.message === 'error').toBeTruthy()
    }
  })
})
