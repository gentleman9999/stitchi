import Link from 'next/link'
import React from 'react'
import HeroIcon from './HeroIcon'
import { SITE_URL } from '@lib/constants'
import ButtonV2, { ButtonProps } from '@components/ui/ButtonV2'

export interface Props extends ButtonProps {
  url: string
  iconId?: string | null
}

const CmsCallToActionButton = (props: Props) => {
  const { url, iconId, ...rest } = props

  let Component: ButtonProps['Component'] = 'a'
  let href = url

  if (url.startsWith(SITE_URL)) {
    Component = Link
    href = url.replace(SITE_URL, '')
  }

  return (
    <ButtonV2
      Component={Component}
      href={href}
      {...rest}
      endIcon={
        iconId ? <HeroIcon icon={iconId} className="w-4 h-4" /> : rest.endIcon
      }
    />
  )
}

export default CmsCallToActionButton