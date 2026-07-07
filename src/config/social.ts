export const INSTAGRAM_HANDLE = 'nerbitgiiunsh'
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`
export const DONATION_URL =
  'https://pay.wire.mn/link/plink_mywo5eolujpt5wmhd5sfh477lm'
export const INSTAGRAM_FOLLOW_DISMISSED_KEY = 'instagram-follow-dismissed'

export function hasDismissedFollowModal(): boolean {
  try {
    return localStorage.getItem(INSTAGRAM_FOLLOW_DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

export function dismissFollowModal(): void {
  try {
    localStorage.setItem(INSTAGRAM_FOLLOW_DISMISSED_KEY, '1')
  } catch {
    // ignore quota / private mode
  }
}
