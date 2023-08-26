import { makeTemplates, Templates } from '../templates'

export type NotificationTemplateId = keyof Templates

export type GetNotificationTemplateFn = (
  id: NotificationTemplateId,
) => Templates[typeof id]

const makeMethod =
  (
    {
      templates,
    }: {
      templates: Templates
    } = {
      templates: makeTemplates(),
    },
  ): GetNotificationTemplateFn =>
  notificationTemplateId => {
    const template = templates[notificationTemplateId]

    if (!template) {
      throw new Error(
        `Unknown notification template: ${notificationTemplateId}`,
      )
    }

    return template
  }

export { makeMethod }
