import Image from 'next/image'
import { Inter } from 'next/font/google'
import product from './product'
import Form from './components/Form'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const featuredImage = product.images[0]
  return (
    <main className="min-h-screen">
      <div className="p-24">
        <div className="flex flex-row-reverse">
          <div className="flex-1 flex flex-col gap-8">
            <h1 className="text-4xl font-medium">{product.title}</h1>
            <Form product={product} />

            <hr />
            <p>{product.description}</p>
          </div>

          <div className="flex-1">
            <Image {...featuredImage} priority alt={product.title} />
          </div>
        </div>
      </div>
    </main>
  )
}
