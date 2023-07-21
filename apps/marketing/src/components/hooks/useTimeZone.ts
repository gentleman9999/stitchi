const useTimeZone = () => {
  return { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }
}

export default useTimeZone
