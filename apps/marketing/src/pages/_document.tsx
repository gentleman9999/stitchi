import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GTM_ID } from '@lib/events'
import Script from 'next/script'
import getOrThrow from '@utils/get-or-throw'

const smartlookApiKey = getOrThrow(
  process.env.NEXT_PUBLIC_SMARTLOOK_API_KEY,
  'NEXT_PUBLIC_SMARTLOOK_API_KEY',
)

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/msx0isz.css" />

          {/* Smartlook */}
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
            smartlook('init', '${smartlookApiKey}', { region: 'eu' });
          `,
            }}
          />
          {/* Smartlook - end */}
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
