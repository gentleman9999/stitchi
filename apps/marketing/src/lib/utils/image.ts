import theme from 'tailwindcss/defaultTheme'

type Sizes = keyof typeof theme.screens

export const generateImageSizes = (
  sizes: { maxWidth?: Sizes | string; imageWidth: string }[],
) => {
  return sizes
    .map(({ imageWidth, maxWidth }) => {
      const isDefault =
        maxWidth && Object.keys(theme.screens).includes(maxWidth)

      return maxWidth
        ? `(max-width: ${
            isDefault
              ? theme.screens[maxWidth as keyof typeof theme.screens]
              : maxWidth
          }) ${imageWidth}`
        : imageWidth
    })
    .join(', ')
}
