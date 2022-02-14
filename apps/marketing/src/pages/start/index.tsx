import { StartPage, StartPageProps } from '@components/pages'
import routes from '@lib/routes'
import { useRouter } from 'next/router'

const Start = () => {
  const router = useRouter()
  const handleSubmit: StartPageProps['onSubmit'] = values => {
    console.info('Start page form submitted', { values })

    router.push(routes.internal.home.href())
  }

  return (
    <>
      <StartPage onSubmit={handleSubmit} />
    </>
  )
}
export default Start
