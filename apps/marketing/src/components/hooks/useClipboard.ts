const useClipboard = () => {
  function copy(text: string) {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Copying to clipboard was successful!')
        return true
      },
      function (err) {
        console.error('Could not copy text: ', err)
        return false
      },
    )
  }

  return {
    copy,
  }
}

export default useClipboard
