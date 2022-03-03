import { Heading, Node } from 'datocms-structured-text-utils'
import { render as toPlainText } from 'datocms-structured-text-to-plain-text'
import { anchorTagFromNode } from '@utils/structured-text'

const listItem = (node: Node) =>
  `<li><a name="${anchorTagFromNode(node)}" href="#${anchorTagFromNode(
    node,
  )}">${toPlainText(node)}</a></li>`

const recursiveListGenerator = (
  layer: Heading[],
  prevLevel: number,
  generatedCode: string,
  closeCount: number,
): string => {
  // This is the base-case. We need to terminate the algorithm when there are no more headings to recurse over
  if (layer.length === 0) {
    // Unconditional close tag to close out our final list
    generatedCode += '</ol>'
    return generatedCode
  }

  // Each header has the context for what type it is (h1, h2, h3, etc)
  const currentDepth = layer[0].level

  // If there is no change in the depth from the previous element, we simply append another <li> because they exist at the same layer!
  if (layer[0].level === prevLevel) {
    generatedCode += listItem(layer[0])

    // Remove the element so we don't infinite loop and cause a stack overflow!
    layer.shift()

    // Recurse (new invocation on callstack pulls the next header in the list and uses current depth as the previous depth in next invocation)
    return recursiveListGenerator(
      layer,
      currentDepth,
      generatedCode,
      closeCount,
    )
  }

  // Similar logic to our MD parser where we see if anything has changed in the grouping. If a grouping has changed, we either reset or go deeper
  if (layer[0].level > prevLevel) {
    // Tells us how much deeper we need to recurse down the tree
    // IE. if current depth is 2 (## hello) and next is 3 (### hello), the delta is 1 recursive invocation
    const calculatedRecursionDepth = layer[0].level - prevLevel

    // Now you can't just simply append a nested <li> because the depth may not just be one higher. What we do is we track the delta between the last heading
    // and the current one to understand how many nested <ol>'s we need.
    let tempCloseCount = 0
    for (let i = 0; i < calculatedRecursionDepth; i++) {
      // Helps us track when to close our unordered lists later, irrespective of the current stackframe we're executing against.
      generatedCode += '<ol>'
      tempCloseCount++
    }

    generatedCode += listItem(layer[0])
    layer.shift()

    return recursiveListGenerator(
      layer,
      currentDepth,
      generatedCode,
      tempCloseCount,
    )
  } else {
    // This would be executed when the grouping has been reset, in which case we need to close out N unclosed <ol> tags to ensure our list is accurate.
    while (closeCount--) generatedCode += '</ol>'
    generatedCode += listItem(layer[0])
    layer.shift()

    return recursiveListGenerator(
      layer,
      currentDepth,
      generatedCode,
      closeCount,
    )
  }
}

export default recursiveListGenerator
