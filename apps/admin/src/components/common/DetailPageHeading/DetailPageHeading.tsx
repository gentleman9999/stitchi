import React from 'react'
import {
  Avatar as AvatarBase,
  Skeleton,
  Typography,
  Box,
  AvatarProps,
} from '@components/ui'

export interface DetailPageHeadingProps {
  title?: string
  avatarUrl?: string | null
  loading?: boolean
}

const DetailPageHeading = ({
  title,
  avatarUrl,
  loading,
}: DetailPageHeadingProps) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="circular" sx={{ marginRight: 2 }}>
          <Avatar />
        </Skeleton>
        <Typography variant="h4" component="div">
          <Skeleton width={300} />
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {avatarUrl && <Avatar src={avatarUrl} sx={{ marginRight: 2 }} />}
      <Box>
        <Typography variant="h5" component="h1">
          <b>{title}</b>
        </Typography>
      </Box>
    </Box>
  )
}

const Avatar = (props: AvatarProps) => {
  const { sx, ...rest } = props
  return <AvatarBase sx={{ width: 80, height: 80, ...sx }} {...rest} />
}

export default DetailPageHeading
