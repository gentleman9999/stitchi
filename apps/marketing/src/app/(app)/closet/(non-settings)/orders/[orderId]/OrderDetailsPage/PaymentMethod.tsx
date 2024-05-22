import React from 'react'

interface Card {
  brand: string | null
  expMonth: number | null
  expYear: number | null
  last4: string | null
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
    <div className="flex flex-col">
      <span>
        {capitalizeString(card?.brand || 'Card')} ending with {card?.last4}
      </span>
      {card?.expMonth && card.expYear ? (
        <span className="text-gray-400">
          Expires {card.expMonth}/{card.expYear}
        </span>
      ) : null}
    </div>
  )
}

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default PaymentMethod
