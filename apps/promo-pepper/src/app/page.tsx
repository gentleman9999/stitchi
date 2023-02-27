import { Container } from '@/components/ui'
import Image from 'next/image'

export default function Home() {
  return (
    <Container>
      <div className="py-10">
        <h1 className="text-5xl font-bold max-w-2xl leading-normal">
          Discover the internet&apos;s best merch and how its made
        </h1>
      </div>
    </Container>
  )
}
