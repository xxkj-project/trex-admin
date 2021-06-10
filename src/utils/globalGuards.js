/**
 * 全局守卫
 */
import defaultSettings from '@/settings'

/**
 * 设置标题
 */
function setDocumentTitle(to, from) {
  const title = defaultSettings.title
  document.title = to.meta.title ? to.meta.title + ' - ' + title : title
}

export default {
  /**
   * 设置标题
   */
  setDocumentTitle
}
