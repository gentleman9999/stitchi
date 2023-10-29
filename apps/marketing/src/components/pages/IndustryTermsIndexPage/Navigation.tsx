import { useRouter } from 'next/router'
import React from 'react'
import cx from 'classnames'
import Link from 'next/link'
import useIntersectionObserver from '@components/hooks/useIntersectionObserver'
import Transition from '@components/ui/Transition'
import Container from '@components/ui/Container'

interface Props {
  termSlugs: string[]
}

const Navigation = (props: Props) => {
  const staticFilterRef = React.useRef<HTMLDivElement>(null)
  const staticFilter = useIntersectionObserver(staticFilterRef, {})

  const showFloatingFilter =
    Boolean(staticFilter) && !staticFilter?.isIntersecting

  return (
    <>
      <div ref={staticFilterRef} className="overflow-scroll">
        <Inner {...props} />
      </div>
      <Transition.Root show={showFloatingFilter}>
        <Transition.FadeOpacity>
          <div className="fixed left-0 right-0 bottom-10 flex justify-center px-2">
            <Container>
              <div className="bg-white p-2 rounded-full shadow-md z-10 overflow-scroll px-2">
                <Inner {...props} />
              </div>
            </Container>
          </div>
        </Transition.FadeOpacity>
      </Transition.Root>
    </>
  )
}

const Inner = ({ termSlugs }: Props) => {
  const { asPath } = useRouter()

  const activeLetter = asPath.split('#')?.[1]?.[0]

  const alphabetMap = new Map<string, string | null>(
    alphabet.map(l => [l, termSlugs.find(s => s[0] === l) || null]),
  )
  return (
    <div className="flex gap-2 w-full justify-between">
      {Array.from(alphabetMap).map(([letter, slug]) => {
        return (
          <Link
            key={letter}
            href={`#${slug}`}
            passHref
            className={cx('text-gray-700', {
              'pointer-events-none text-gray-400': slug === null,
            })}
          >
            <div
              className={cx(
                'flex justify-center items-center rounded-full w-7 h-7',
                {
                  'bg-primary': activeLetter === letter,
                },
              )}
            >
              {letter.toUpperCase()}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Navigation

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]
