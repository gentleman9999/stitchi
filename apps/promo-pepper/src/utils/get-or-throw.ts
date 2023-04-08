/**
 * Throws an error if provided value is not defined.
 *
 * This function is commonly used to ensure environment variables have
 * been properly defined during application startup.
 *
 * @param value Argument which must not be undefined.
 * @param name Name of the argument. Useful for logging purposes.
 */
export default function getOrThrow(
  value: string | undefined,
  name: string,
  { allowEmpty }: { allowEmpty?: boolean } = {},
) {
  if (!value) {
    if (allowEmpty === false) {
      throw new Error(`Undefined environment variable: ${name}`)
    }
  }

  return value
}
