'use client'

import React from 'react'

import twitterWidgetJs from './twitter-widget-url'
import Script from 'next/script'
import { useLogger } from 'next-axiom'

declare global {
  interface Window {
    twttr: any
  }
}

interface JSONObject {
  [k: string]: any
}

export interface TwitterTweetEmbedProps {
  /**
   * Tweet id that needs to be shown
   */
  tweetId: string
  /**
   * Additional options to pass to twitter widget plugin
   */
  options?: JSONObject
  /**
   * Placeholder while tweet is loading
   */
  placeholder?: string | React.ReactNode
  /**
   * Function to execute after load, return html element
   */
  onLoad?: (element: any) => void
}

const methodName = 'createTweet'

const TwitterTweetEmbed = (props: TwitterTweetEmbedProps): any => {
  const logger = useLogger()
  const ref = React.useRef<HTMLDivElement | null>(null)

  const handleLoad = () => {
    if (!window.twttr) {
      logger.error('Failure to load window.twttr, aborting load')
      return
    }
    if (!window.twttr.widgets[methodName]) {
      logger.error(
        `Method ${methodName} is not present anymore in twttr.widget api`,
      )
      return
    }

    window.twttr.widgets[methodName](
      props.tweetId,
      ref?.current,
      props.options,
    ).then((element: any) => {
      if (props.onLoad) {
        props.onLoad(element)
      }
    })
  }

  return (
    <React.Fragment>
      <Script src={twitterWidgetJs} onLoad={handleLoad} />
      <div ref={ref} />
    </React.Fragment>
  )
}

export default TwitterTweetEmbed
