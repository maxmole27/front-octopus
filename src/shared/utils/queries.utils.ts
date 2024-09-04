interface LastPageProps {
  totalItems: number
  totalPages: number
  currentPage: number
}

export const checkLastPage = (lastPage: LastPageProps) => {
  const totalPages = Math.ceil(lastPage.totalItems / lastPage.totalPages)
  const nextPage = lastPage.currentPage + 1
  return nextPage < totalPages ? nextPage : undefined
}
