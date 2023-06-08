import { expect, it } from 'vitest'

// callback
const fetchUser = (cb: (str: string) => void) => {
  setTimeout(() => {
    cb('hello')
  }, 1000)
}

const userPromise = () => Promise.resolve('hello')

it('test callback', () => {
  return new Promise<void>((done) => {
    fetchUser((data) => {
      expect(data).toBe('hello')
      done()
    })
  })
})

it('test promise', async () => {
  return userPromise().then((data) => {
    expect(data).toBe('hello')
  })
})

it('test async await', async () => {
  const data = await userPromise()
  expect(data).toBe('hello')
})

it('test async expect resolves', () => {
  return expect(userPromise()).resolves.toBe('hello')
})

const rejectPromise = () => Promise.reject('error')

it('test async expect resolves', () => {
  return expect(rejectPromise()).rejects.toBe('error')
})
