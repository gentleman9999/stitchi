import { Thing, WithContext } from 'schema-dts'

export const JsonLd = <T extends Thing>({
  json,
  scriptId,
}: {
  json: WithContext<T>
  scriptId: string
}) => {
  return (
    <script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(json, null, 2),
      }}
    />
  )
}
