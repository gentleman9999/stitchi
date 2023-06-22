import React from 'react'

interface Image {
  id: number
  url: string
  width: number
  height: number
}

interface Proof {
  id: number
  name: string
  primaryImage: Image
  secondaryImages: Image[]
  createdAt: string
}

const proofs: Proof[] = [
  {
    id: 1,
    name: 'Proof 1',
    primaryImage: {
      id: 1,
      height: 500,
      width: 500,
      url: 'https://picsum.photos/500/500',
    },
    secondaryImages: [],
    createdAt: '2021-08-10T00:00:00.000Z',
  },
]

interface Props {}

const DesignRequestPreview = ({}: Props) => {
  const [activeProof, setActiveProof] = React.useState<Proof | null>(proofs[0])

  if (!activeProof) {
    // TODO
    return null
  }

  return (
    <div>
      <img
        src={activeProof.primaryImage.url}
        alt={activeProof.name}
        className="aspect-square"
        width={activeProof.primaryImage.width}
        height={activeProof.primaryImage.height}
      />
    </div>
  )
}

export default DesignRequestPreview
