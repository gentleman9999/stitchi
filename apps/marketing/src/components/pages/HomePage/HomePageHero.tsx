import { Hero } from '@components/common'
import routes from '@lib/routes'
import { ArrowRight } from 'icons'
import React from 'react'

const HomePageHero = () => {
  return (
    <Hero
      title={
        <>
          <div className="inline font-headingDisplay">
            The merch platform <br /> built for scale
            <span className="text-primary">.</span>
          </div>
        </>
      }
      subtitle={
        <>
          The most successful merchandise programs in the world have access to
          the best tools — and now so do you.
        </>
      }
      primaryCta={{
        // title: (
        //   <div className="group sm:!text-xl flex items-center">
        //     <span>Start creating merch</span>
        //     <span className="ml-2 relative transition-all w-[16px] h-[16px]">
        //       <span className="absolute top-[2px] left-0 ml-1/2 group-hover:left-1.5 duration-200">
        //         <ArrowRight strokeWidth="4" width="16px" height="16px" />
        //       </span>
        //     </span>
        //   </div>
        // ),
        title: 'Start creating merch',
        href: routes.internal.catalog.href(),
        endIcon: <ArrowRight strokeWidth="2" className="w-4 h-4" />,
      }}
    />
  )
}

export default HomePageHero
