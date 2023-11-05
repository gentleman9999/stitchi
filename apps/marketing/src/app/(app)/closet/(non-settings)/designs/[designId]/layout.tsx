import react from 'react'

interface Props {
  children: React.ReactNode
  slideover: boolean
}

const Layout = ({ children, slideover }: Props) => {
  return (
    <>
      {children}
      {slideover}
    </>
  )
}

export default Layout
