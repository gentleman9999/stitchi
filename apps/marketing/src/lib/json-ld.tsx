import { Thing, WithContext } from 'schema-dts'

export const JsonLd = <T extends Thing>({ json }: { json: WithContext<T> }) => {
  return <script type="application/ld+json">{JSON.stringify(json)}</script>
}
