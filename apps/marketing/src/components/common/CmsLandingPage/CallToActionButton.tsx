import Button, { ButtonProps } from '@components/ui/ButtonV2/Button'
import getOrThrow from '@lib/utils/get-or-throw'
import Link from 'next/link'
import React from 'react'
import HeroIcon from './HeroIcon'

const siteUrl = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL ',
)

export interface Props extends ButtonProps {
  url: string
  iconId?: string | null
}

const CallToActionButton = (props: Props) => {
  const { url, iconId, ...rest } = props

  let Component: ButtonProps['Component'] = 'a'
  let href = url

  if (url.startsWith(siteUrl)) {
    Component = Link
    href = url.replace(siteUrl, '')
  }

  return (
    <Button
      Component={Component}
      href={href}
      {...rest}
      endIcon={
        iconId ? <HeroIcon icon={iconId} className="w-4 h-4" /> : rest.endIcon
      }
    />
  )
}

export default CallToActionButton
