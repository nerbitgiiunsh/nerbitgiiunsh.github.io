export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#eee] px-4 text-center">
      <p className="text-7xl font-bold tracking-tight text-red-300">404</p>
      <h1 className="mt-2 text-xl font-semibold text-gray-900">
        Хуудас олдсонгүй
      </h1>
      <p className="mt-2 max-w-sm text-sm text-gray-600">
        Энэ ном байхгүй эсвэл холбоос буруу байна.
      </p>
      {/* <a
        href="./"
        className="mt-6 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Нүүр хуудас
      </a> */}
    </main>
  )
}
