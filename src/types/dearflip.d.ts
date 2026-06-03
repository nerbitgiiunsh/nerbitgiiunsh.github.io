type DearFlipApi = {
  defaults: Record<string, unknown> & { fakeZoom?: number }
  openFileOptions: Record<string, unknown>
  openURL: (url: string) => void
  DIRECTION?: { LTR: number; RTL: number }
  READ_DIRECTION?: { LTR: number; RTL: number }
}

declare global {
  interface Window {
    dFlipLocation?: string
    dFlipWPGlobal?: Record<string, unknown>
    DFLIP?: DearFlipApi
    DEARFLIP?: DearFlipApi
    onBeforeDearFlipInit?: (...args: unknown[]) => void
    beforeDearFlipInit?: (...args: unknown[]) => void
  }
}

export {}
