import { expect, it, vi } from 'vitest'

const fetchUser = (cb: (str: string) => void) => {
  setTimeout(() => {
    cb('userInfo')
  }, 1000)
}

const loopFetchUser = (cb: (str: string) => void) => {
  setTimeout(() => {
    cb('one')
    setTimeout(() => {
      cb('two')
    }, 2000)
  }, 1000)
}

vi.useFakeTimers()

it('test calback after 1 sec', () => {
  const callback = vi.fn()
  fetchUser(callback)
  vi.runAllTimers()
  expect(callback).toHaveBeenCalled()
})

it('test calback loop', () => {
  const callback = vi.fn()
  loopFetchUser(callback)
  vi.runOnlyPendingTimers()
  expect(callback).toHaveBeenCalledTimes(1)
  expect(callback).toHaveBeenCalledWith('one')
  vi.runOnlyPendingTimers()
  expect(callback).toHaveBeenCalledTimes(2)
  expect(callback).toHaveBeenCalledWith('two')
})

it('test callback with advance timer', () => {
  const callback = vi.fn()
  loopFetchUser(callback)
  vi.advanceTimersByTime(500)
  expect(callback).not.toHaveBeenCalled()
  vi.advanceTimersByTime(500)
  expect(callback).toHaveBeenCalled()
  vi.advanceTimersByTime(1000)
  expect(callback).not.toHaveBeenCalledTimes(2)
  vi.advanceTimersByTime(1000)
  expect(callback).toHaveBeenCalledTimes(2)
})
