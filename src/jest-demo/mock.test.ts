import axios from 'axios'
import { expect, it, vi, type Mock } from 'vitest'

vi.mock('axios')
;(axios.get as Mock).mockResolvedValue(Promise.resolve({ data: { username: 'waker' } }))

it('test mock modules', () => {
    return axios.get('test').then((data) => {
    console.log('%c 🍭 data ', 'font-size:16px;color:#ffffff;background:#badc58', data)
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(1)
  })
})

function mockTest(shouldCall: boolean, cb: (msg: string) => void) {
  if (shouldCall) {
    return cb('callback')
  }
}

it('test', () => {
  const mockCb = vi.fn()
  mockTest(true, mockCb)
  expect(mockCb).toBeCalled()
  expect(mockCb).toHaveBeenCalled()
  expect(mockCb).toHaveBeenCalledWith('callback')
  expect(mockCb).toHaveBeenCalledTimes(1)
})

it('test mock with implementation', () => {
  const mockCb = vi.fn((x) => `${x} implement`)
  mockTest(true, mockCb)
})
