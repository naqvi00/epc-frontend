import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={clsx(
        'fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white shadow-card transition-all hover:bg-brand-navy2 focus-visible:outline-none',
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3',
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
