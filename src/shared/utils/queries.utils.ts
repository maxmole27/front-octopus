interface LastPageProps {
  totalItems: number
  totalPages: number
  currentPage: number
}

export const checkLastPage = (lastPage: LastPageProps) => {
  const nextPage = lastPage.currentPage + 1
  return nextPage < lastPage.totalPages ? nextPage : undefined
}
