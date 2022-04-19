import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  RHFTextField,
  Grid,
  Box,
  InputAdornment,
  ColorDot,
} from '@components/ui'
import useCreateColor from './useCreateColor'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema, { Schema } from './schema'
import { useSnackbar } from 'notistack'

interface Props {
  onClose: () => void
  onSubmit: (colorId: string) => void
}

const ColorCreator = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [create, { loading }] = useCreateColor()
  const form = useForm<Schema>({
    resolver: yupResolver(schema),
  })

  const { control, watch } = form

  const handleSubmit = form.handleSubmit(async data => {
    try {
      const color = await create(data)
      props.onSubmit(color.id)
    } catch (e) {
      console.error("Can't create color", { context: { error: e } })
      enqueueSnackbar('Failed to create color', { variant: 'error' })
    }
  })

  const hex = watch('hex')

  return (
    <Dialog fullWidth maxWidth="xs" open={true} onClose={props.onClose}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RHFTextField control={control} name="name" label="Color name" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField
                control={control}
                name="hex"
                label="Color hex"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ColorDot hex={hex} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button variant="contained" type="submit" loading={loading}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ColorCreator
