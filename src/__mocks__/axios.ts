import { vi } from 'vitest'

const axios = {
  get: vi.fn(() => Promise.resolve({ data: { username: 'waker' } }))
}

export default { default: axios }
