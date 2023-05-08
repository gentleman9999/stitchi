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
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
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

          {/* Google Tag Manager - Global base code */}
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
            }}
          />
          {/* Google Tag Manager - Global base code - end */}
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
