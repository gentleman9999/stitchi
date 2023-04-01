import Image from 'next/image'
import logo from 'public/promopepper-logo.png'
import textLogo from 'public/promopepper-logo-2.png'

export interface LogoProps {
  className?: string
  variant?: 'logo' | 'textLogo'
  [key: string]: any
}

const Logo = ({ className = '', variant = 'logo', ...props }: LogoProps) => (
  <Image
    {...(variant === 'logo' ? logo : textLogo)}
    alt="PromoPepper logo"
    className={className}
    {...props}
  />
)

export default Logo
