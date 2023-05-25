import React from 'react'

interface Card {
  brand: string
  expMonth: number
  expYear: number
  last4: string
}

interface Props {
  type?: string | null
  card?: Card | null
}

const PaymentMethod = ({ type, card }: Props) => {
  if (!type) {
    return <>No payment method</>
  }

  if (type !== 'card') {
    return <>{capitalizeString(type.split('_').join(' '))}</>
  }

  return (
    <>
      <span>
        {capitalizeString(card?.brand || 'Card')} ending with {card?.last4}
      </span>
      {card?.expMonth && card.expYear ? (
        <>
          <br />

          <span className="text-gray-400">
            Expires {card.expMonth}/{card.expYear}
          </span>
        </>
      ) : null}
    </>
  )
}

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default PaymentMethod
