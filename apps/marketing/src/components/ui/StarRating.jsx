import React from 'react'
import {Star} from 'icons'

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex gap-1">
      {[...Array(rating).keys()].map((index) => (
        <Star key={index} className="h-5 w-5 fill-current" />
      ))}
    </div>
  )
}

export default StarRating