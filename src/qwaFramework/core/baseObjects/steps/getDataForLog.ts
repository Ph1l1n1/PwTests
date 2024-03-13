import QwaElement from '../QwaElement'

export function getQwaParentNameForLog(element: QwaElement): string {
  const qwaParent = element.qwaParent?.name
  return String(qwaParent)
}
