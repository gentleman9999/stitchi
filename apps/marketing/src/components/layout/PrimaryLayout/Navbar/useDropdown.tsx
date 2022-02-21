import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function useDropdown() {
  const router = useRouter()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      setActive(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  const handleClick = (value?: boolean) => {
    if (value !== undefined) {
      setActive(value)
    } else {
      setActive(prev => !prev)
    }
  }

  const handleClose = () => {
    setActive(false)
  }

  return { active, handleClick, handleClose }
}
