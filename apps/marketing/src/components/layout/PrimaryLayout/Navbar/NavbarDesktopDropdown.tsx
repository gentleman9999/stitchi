import React, { ReactChild } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import cx from 'classnames'
import { Badge } from '@components/ui'

type Icon = { url: string; height: number; width: number } | ReactChild | null

interface Props {
  href: string
  label: string
  description?: string | null
  icon?: Icon
  external?: boolean
  beta?: boolean
}

const NavbarDesktopDropdown = ({
  href,
  icon,
  label,
  description,
  external,
  beta,
}: Props) => {
  const Link = ({ children }: { children: React.ReactNode }) => {
    const baseStyledATagProps = { disabled: Boolean(beta) }
    if (external) {
      return (
        <StyledATag {...baseStyledATagProps} external href={href}>
          {children}
        </StyledATag>
      )
    } else {
      return (
        <NextLink href={href} passHref>
          <StyledATag {...baseStyledATagProps}>{children}</StyledATag>
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
            <h4 className="font-extrabold">
              {label}{' '}
              {beta ? (
                <Badge label="Coming soon" size="small" className="m-0" />
              ) : null}{' '}
            </h4>
            <span className="text-secondary">{description}</span>
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
  disabled?: boolean
}) => {
  const linkProps = {
    ...props,
    className: cx(
      'cursor-pointer block p-4 text-sm hover:bg-gray-100 transition-all rounded-md ring-1 ring-transparent hover:ring-gray-200',
      {
        'pointer-events-none touch-none': props.disabled,
      },
    ),

    ...(props.external ? { target: '_blank', rel: 'noreferrer' } : {}),
  }
  return <a {...linkProps} />
}

export default NavbarDesktopDropdown