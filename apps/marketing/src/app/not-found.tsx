import Container from '@components/ui/Container'
import MarketingLayout from './(marketing)/layout'
import { Section, SectionHeader } from '@components/common'
import LinkInline from '@components/ui/LinkInline'
import routes from '@lib/routes'
import Button from '@components/ui/ButtonV2/Button'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const NotFound = () => {
  return (
    <MarketingLayout>
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
    </MarketingLayout>
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
