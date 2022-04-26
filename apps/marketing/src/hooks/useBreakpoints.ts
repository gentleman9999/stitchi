import React from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config' // Fix the path

const fullConfig = resolveConfig(tailwindConfig as any)
const screens: Record<string, any> = fullConfig.theme.screens || {}

const useBreakpoints = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<
    string | null
  >(null)

  React.useEffect(() => {
    const set = () => {
      let currentBp: string = 'xs'
      let biggestBreakpointValue = 0
      for (const breakpoint of Object.keys(screens)) {
        const breakpointValue = getBreakpointValue(breakpoint)
        if (
          breakpointValue > biggestBreakpointValue &&
          window.innerWidth >= breakpointValue
        ) {
          biggestBreakpointValue = breakpointValue
          currentBp = breakpoint
        }
      }

      setCurrentBreakpoint(currentBp)
    }

    window.addEventListener('resize', set)
    set()

    return () => {
      window.removeEventListener('resize', set)
    }
  }, [])

  const getBreakpointValue = (value: string): number =>
    +screens[value].slice(0, screens[value].indexOf('px'))

  return {
    currentBreakpoint,
    getBreakpointValue,
  }
}

export default useBreakpoints
