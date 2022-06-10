import getOrThrow from '@utils/get-or-throw'
import Script from 'next/script'
import React from 'react'

const SmartlookScript = () => {
  const [apiKey, setApiKey] = React.useState<string | null>(null)

  React.useEffect(() => {
    try {
      const smartlookApiKey = getOrThrow(
        process.env.NEXT_PUBLIC_SMARTLOOK_API_KEY,
        'NEXT_PUBLIC_SMARTLOOK_API_KEY',
      )

      setApiKey(smartlookApiKey)
    } catch (error) {
      console.warn(error)
    }
  }, [])

  if (!apiKey) {
    return null
  }

  return (
    <Script
      id="smarlook-global"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', '${apiKey}', { region: 'eu' });
          `,
      }}
    />
  )
}

export default SmartlookScript
