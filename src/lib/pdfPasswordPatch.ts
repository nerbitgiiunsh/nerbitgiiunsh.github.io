const passwordsByPath = new Map<string, string>()

function pathKey(url: string): string {
  try {
    return new URL(url, window.location.origin).pathname
  } catch {
    return url
  }
}

export function registerPdfPassword(pdfUrl: string, password: string) {
  passwordsByPath.set(pathKey(pdfUrl), password)
}

function passwordForSource(src: string | { url?: string }): string | undefined {
  const url = typeof src === 'string' ? src : src?.url ?? ''
  const key = pathKey(url)
  if (passwordsByPath.has(key)) return passwordsByPath.get(key)
  for (const [k, v] of passwordsByPath) {
    if (key.includes(k) || url.includes(k)) return v
  }
  return undefined
}

type PdfJsLib = {
  getDocument: (src: unknown) => { promise: Promise<unknown> }
}

function patchPdfJs(pdfjs: PdfJsLib) {
  if ((pdfjs.getDocument as { __patched?: boolean }).__patched) return
  const original = pdfjs.getDocument.bind(pdfjs)
  pdfjs.getDocument = function patchedGetDocument(src: unknown) {
    const pwd = passwordForSource(
      typeof src === 'string' ? src : (src as { url?: string }),
    )
    if (pwd) {
      const next =
        typeof src === 'string'
          ? { url: src, password: pwd }
          : { ...(src as object), password: pwd }
      return original(next)
    }
    return original(src)
  }
  ;(pdfjs.getDocument as { __patched?: boolean }).__patched = true
}

export function installPdfPasswordPatch() {
  const attach = () => {
    const win = window as Window & { pdfjsLib?: PdfJsLib; PDFJS?: PdfJsLib }
    const pdfjs = win.pdfjsLib ?? win.PDFJS
    if (pdfjs?.getDocument) {
      patchPdfJs(pdfjs)
      return true
    }
    return false
  }

  if (attach()) return

  const timer = window.setInterval(() => {
    if (attach()) window.clearInterval(timer)
  }, 50)
  window.setTimeout(() => window.clearInterval(timer), 30_000)
}
