import React, { ReactChild } from 'react'
import NextLink from 'next/link'
import Image from 'next/legacy/image'

type Icon = { url: string; height: number; width: number } | ReactChild | null

interface Props {
  href: string
  label: string
  description?: string | null
  icon?: Icon
  external?: boolean
}

const NavbarDropdownItemDesktop = ({
  href,
  icon,
  label,
  description,
  external,
}: Props) => {
  const Link = ({ children }: { children: React.ReactNode }) => {
    if (external) {
      return (
        <StyledATag external href={href}>
          {children}
        </StyledATag>
      )
    } else {
      return (
        <NextLink href={href} passHref legacyBehavior>
          <StyledATag>{children}</StyledATag>
        </NextLink>
      )
    }
  }

  const Icon = () => {
    if (typeof icon === 'object' && icon !== null) {
      if ('url' in icon) {
        return (
          <Image
            src={icon.url}
            height={icon.height}
            width={icon.width}
            alt={`${label} icon`}
          />
        )
      } else {
        return icon
      }
    }
    return null
  }

  return (
    <div className="py-1 col-span-1" key={href}>
      <Link>
        <div className="flex items-center">
          {icon && (
            <span className="mr-2 h-12 w-12 rounded-full bg-black flex justify-center items-center flex-shrink-0">
              <Icon />
            </span>
          )}
          <div>
            <h4 className="font-extrabold font-heading">{label}</h4>
            <span className="text-midnight">{description}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

const StyledATag = (props: {
  children: React.ReactNode
  href?: string
  external?: boolean
}) => {
  const linkProps = {
    ...props,
    className:
      'cursor-pointer block p-4 text-sm hover:bg-gray-50 transition-all rounded-sm ring-2 ring-transparent hover:ring-primary',
    ...(props.external ? { target: '_blank', rel: 'noreferrer' } : {}),
  }
  return <a {...linkProps} />
}

export default NavbarDropdownItemDesktop
