import { Node } from 'datocms-structured-text-utils'
import { render as toPlainText } from 'datocms-structured-text-to-plain-text'

const anchorTagFromNode = (node: Node) =>
  toPlainText(node)
    ?.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

export { anchorTagFromNode }
