import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Money Lover'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
