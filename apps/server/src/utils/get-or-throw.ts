const getOrThrow = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Undefined environment variable: ${name}`)
  }

  return value
}

export default getOrThrow
