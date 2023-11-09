import { CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import Skeleton from '@components/ui/Skeleton'
import React from 'react'

const Loading = () => {
  return (
    <>
      <CardHeader>
        <CardTitle title={<Skeleton className="h-2 w-20" />} />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[40vh] w-full" />
      </CardContent>
      <CardContent>
        <div className="flex gap-4 items-center justify-end">
          <Skeleton className="w-10 h-2" />
          <Skeleton className="w-10 h-2" />
          <Skeleton className="w-10 h-2" />
        </div>
      </CardContent>
    </>
  )
}

export default Loading
