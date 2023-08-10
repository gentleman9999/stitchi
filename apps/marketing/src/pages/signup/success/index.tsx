import routes from '@lib/routes'
import { GetServerSideProps } from 'next'

const getServerSideProps: GetServerSideProps = async context => {
  return {
    redirect: {
      destination: routes.internal.closet.href(),
      permanent: false,
    },
  }
}

const Page = () => {
  return null
}

export { getServerSideProps }
export default Page
