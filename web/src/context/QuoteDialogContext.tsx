import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type QuoteDialogContextValue = {
  open: boolean
  openQuote: () => void
  closeQuote: () => void
}

const QuoteDialogContext = createContext<QuoteDialogContextValue | null>(null)

export function QuoteDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openQuote = useCallback(() => setOpen(true), [])
  const closeQuote = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ open, openQuote, closeQuote }),
    [open, openQuote, closeQuote],
  )

  return (
    <QuoteDialogContext.Provider value={value}>
      {children}
    </QuoteDialogContext.Provider>
  )
}

export function useQuoteDialog() {
  const ctx = useContext(QuoteDialogContext)
  if (!ctx) {
    throw new Error('useQuoteDialog must be used within QuoteDialogProvider')
  }
  return ctx
}
