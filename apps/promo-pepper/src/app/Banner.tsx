import { Container } from '@/components/ui'
import React from 'react'
import { ArrowRight } from 'icons'
import dot from 'public/square-dot.svg'

interface Props {}

const Banner = () => {
  return (
    <form>
      <Container>
        <div className="py-4 grid grid-cols-6 font-bold">
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
              className="w-full text-center py-2 px-3 bg-gray-200 rounded-full"
            />
          </div>
          <div className="col-span-1 flex items-center"></div>
          <div className="col-span-1 flex items-center justify-end">
            <button className="text-primary">
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
    </form>
  )
}

export default Banner
