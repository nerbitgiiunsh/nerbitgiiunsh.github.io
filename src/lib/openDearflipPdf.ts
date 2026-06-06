type DearFlipApi = {
  defaults: { fakeZoom?: number }
  openFileOptions: {
    hasSpiral?: boolean
    is3D?: boolean
    direction?: number
    source?: string
  }
  openURL: (url: string) => void
  DIRECTION?: { LTR: number; RTL: number }
  READ_DIRECTION?: { LTR: number; RTL: number }
}

function getDearFlipApi(): DearFlipApi | undefined {
  const win = window as Window & {
    DEARFLIP?: DearFlipApi
    DFLIP?: DearFlipApi
  }
  return win.DEARFLIP ?? win.DFLIP
}

let lastOpenedPdf: string | null = null
let dearFlipHookInstalled = false

function applyOpenOptions(api: DearFlipApi) {
  api.defaults.fakeZoom = 3
  api.openFileOptions = api.openFileOptions || {}
  api.openFileOptions.hasSpiral = false
  api.openFileOptions.is3D = false
  const dir = api.READ_DIRECTION ?? api.DIRECTION
  api.openFileOptions.direction = dir?.LTR ?? 1
}

export function openDearflipPdf(pdfUrl: string) {
  if (lastOpenedPdf === pdfUrl) return

  const api = getDearFlipApi()
  if (!api?.openURL) return

  lastOpenedPdf = pdfUrl
  applyOpenOptions(api)
  api.openURL(pdfUrl)
}

let pendingPdf: string | null = null

function tryOpenPending() {
  if (pendingPdf) openDearflipPdf(pendingPdf)
}

export function waitAndOpenDearflipPdf(pdfUrl: string) {
  pendingPdf = pdfUrl

  if (!dearFlipHookInstalled) {
    dearFlipHookInstalled = true
    const prev = window.onBeforeDearFlipInit
    window.onBeforeDearFlipInit = function (...args: unknown[]) {
      if (typeof prev === 'function') {
        ;(prev as (...a: unknown[]) => void).apply(window, args)
      }
      tryOpenPending()
    }
  }

  if (getDearFlipApi()?.openURL) {
    tryOpenPending()
    return () => {}
  }

  const timer = window.setInterval(() => {
    if (getDearFlipApi()?.openURL) {
      window.clearInterval(timer)
      tryOpenPending()
    }
  }, 50)

  return () => window.clearInterval(timer)
}
