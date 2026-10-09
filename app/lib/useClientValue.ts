import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// A value that only exists in the browser (today's date, a random pick). The server render
// gets `serverValue`, the browser swaps in `get()` right after hydration, with no mismatch.
// `get` must return the same value each time it's called, or React re-renders forever.
export function useClientValue<T>(get: () => T, serverValue: T): T {
  return useSyncExternalStore(subscribe, get, () => serverValue)
}
