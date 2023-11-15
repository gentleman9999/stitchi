interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      Marketing layout
      {children}
    </>
  )
}

export default Layout
