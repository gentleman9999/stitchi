import { makeTemplateMap, TemplateMap } from '../templates'

export type NotificationTemplateKey = keyof TemplateMap

export type GetNotificationTemplateFn = <T extends NotificationTemplateKey>(
  id: T,
) => TemplateMap[T]

type MakeMethodFn = (params?: {
  templateMap: TemplateMap
}) => GetNotificationTemplateFn

const makeMethod: MakeMethodFn =
  (
    {
      templateMap,
    }: {
      templateMap: TemplateMap
    } = {
      templateMap: makeTemplateMap(),
    },
  ) =>
  templateKey => {
    const template = templateMap[templateKey]

    if (!template) {
      throw new Error('Failed to get notification template')
    }

    return template
  }

export { makeMethod }
