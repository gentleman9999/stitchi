import { Button } from '@components/ui'
import routes from '@lib/routes'
import React from 'react'

interface Props {
  humanOrderId: string
}

const ContactUs = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <h2 className="text-gray-900 text-2xl font-medium font-heading">
        Have a question about your order?
      </h2>
      <div className="flex flex-col items-center gap-4">
        <Button
          variant="ghost"
          className="!border-gray-900"
          Component="a"
          href={routes.external.support.email.href({
            params: {
              subject: `Order #${props.humanOrderId}`,
            },
          })}
          {...{ target: '_blank' }}
        >
          <span className="hidden sm:block">Send us an email</span>
          <span className="sm:hidden">Email us</span>
        </Button>
        <div className="text-sm">
          or give us a call{' '}
          <Button
            slim
            variant="naked"
            Component="a"
            className="!text-lg"
            href={routes.external.support.phone.href()}
            {...{ target: '_blank' }}
          >
            {routes.external.support.phone.href().replace('tel:', '')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
