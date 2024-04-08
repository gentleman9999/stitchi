'use client'

import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.min.css'

const HighlightCode = () => {
  useEffect(() => {
    hljs.highlightAll()
  }, [])
  return null
}

export default HighlightCode
