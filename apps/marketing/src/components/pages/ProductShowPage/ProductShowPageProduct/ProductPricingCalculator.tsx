import React from 'react'
import { Button } from '@components/ui'
import routes from '@lib/routes'
import Link from 'next/link'
import CalculatorForm from './CalculatorForm'

interface Props {
  productVariantEntityId?: number
}

const ProductPricingCalculator = (props: Props) => {
  const [showCalculator, setShowCalculator] = React.useState(false)

  return (
    <>
      <div className="flex flex-col gap-5 p-4 rounded-md border">
        {showCalculator && props.productVariantEntityId ? (
          <CalculatorForm
            productVariantEntityId={props.productVariantEntityId}
            onClose={() => setShowCalculator(false)}
          />
        ) : (
          <>
            {props.productVariantEntityId ? (
              <Button
                slim
                color="primary"
                variant="ghost"
                className="w-full !rounded-sm"
                onClick={() => setShowCalculator(true)}
              >
                Get instant quote
              </Button>
            ) : null}

            <Button
              slim
              Component={Link}
              color="brandPrimary"
              className="w-full !rounded-sm"
              href={routes.internal.getStarted.href()}
            >
              Talk to a designer
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default ProductPricingCalculator
