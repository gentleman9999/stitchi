import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:5000/graphql',
  ignoreNoDocuments: true,
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        nonOptionalTypename: true,
      },
    },
  },
}

export default config
