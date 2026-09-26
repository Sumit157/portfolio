import { createContext, useContext } from 'react'

export interface LenisScrollEvent {
  scroll: number
}

export interface LenisContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void
  onScroll: (callback: (event: LenisScrollEvent) => void) => () => void
}

export const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
  onScroll: () => () => {},
})

export const useSmoothScroll = () => useContext(LenisContext)
