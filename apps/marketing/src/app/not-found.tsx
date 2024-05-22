import Container from '@components/ui/Container'
import MainLayout from './(main)/layout'
import { Section } from '@components/common'
import LinkInline from '@components/ui/LinkInline'
import routes from '@lib/routes'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const NotFound = () => {
  return (
    <MainLayout>
      <Container>
        <Section gutter="lg" className="flex flex-col items-center">
          <h1 className="text-4xl font-medium">
            Oops! We can&apos;t find the page you are looking for.
          </h1>

          <br />
          <br />
          <p className="text-xl">Here are some helpful links instead:</p>

          <br />
          <Link href={routes.internal.home.href()} label="Homepage" />
          <Link href={routes.internal.catalog.href()} label="Catalog" />
          <Link href={routes.external.support.href()} label="Help center" />
        </Section>
      </Container>
    </MainLayout>
  )
}

const Link = ({ href, label }: { href: string; label: string }) => {
  return (
    <LinkInline href={href} className="flex items-center gap-1">
      {label} <ArrowRightIcon className="w-4 h-4" />
    </LinkInline>
  )
}

export default NotFound
