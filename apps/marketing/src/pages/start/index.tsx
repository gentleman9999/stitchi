import { PrimaryLayout } from '@components/layout'
import { StartPage, StartPageProps } from '@components/pages'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

const Start = () => {
  const router = useRouter()
  const handleSubmit: StartPageProps['onSubmit'] = values => {
    console.info('Start page form submitted', { values })

    router.push(
      routes.internal.getStarted.success.href({ email: values.email }),
    )
  }

  return (
    <>
      <StartPage onSubmit={handleSubmit} />
    </>
  )
}

Start.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

export default Start
