import { Container } from '@/components/ui'
import React from 'react'
import { ArrowRight } from 'icons'

interface Props {}

const Banner = () => {
  return (
    <form className="flex justify-center p-4">
      <div className=" bg-primary rounded-md w-full">
        <Container>
          <div className="py-2 grid grid-cols-6 font-bold">
            <div className="col-span-1 flex items-center">
              <span>Get weekly emails</span>
            </div>
            <div className={`h-[10px] col-span-1 flex items-center`} />
            <div className="col-span-2 flex items-center justify-center">
              <input
                required
                name="email"
                autoComplete="email"
                placeholder="Your email address"
                className="w-full text-center py-2 px-3 bg-gray-100 rounded-md outline-primary"
              />
            </div>
            <div className="col-span-1 flex items-center"></div>
            <div className="col-span-1 flex items-center justify-end">
              <button className="">
                <div className="flex items-center group">
                  Sign up{' '}
                  <ArrowRight
                    strokeWidth={3}
                    height={16}
                    className="ml-1 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </form>
  )
}

export default Banner
