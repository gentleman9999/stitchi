import Button from '@components/ui/ButtonV2/Button'
import Container from '@components/ui/Container'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import Link from 'next/link'
import image404 from '../../../../../../../public/404.png'
import Image from 'next/image'

const NotFound = () => {
  return (
    <Container className="min-h-[calc(100vh-var(--topbar-height))] flex flex-col items-center justify-center text-center">
      <Image {...image404} alt="404 monster" className="w-40" />
      <h2 className="text-3xl font-headingDisplay">Product Not Found</h2>
      <p className="mt-2">
        The product you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>

      <Button
        Component={Link}
        href={routes.internal.catalog.href()}
        size="xl"
        className="mt-10"
        startIcon={<ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />}
      >
        Return to Catalog
      </Button>
    </Container>
  )
}

export default NotFound
