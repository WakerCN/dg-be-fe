import { expect, it } from 'vitest'

it('it common matcher', () => {
  expect(2 + 2).toBe(4)
})

it('it not equal', () => {
  expect(2 + 2).not.toBe(5)
})

it('it to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

it('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})

it('test Object', () => {
  expect({ name: 'waker' }).toEqual({ name: 'waker' })
})
