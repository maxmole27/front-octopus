interface LastPageProps {
  totalRecords: number
  pageSize: number
  page: number
}

export const checkLastPage = (lastPage: LastPageProps) => {
  const totalPages = Math.ceil(lastPage.totalRecords / lastPage.pageSize)
  const nextPage = lastPage.page + 1
  return nextPage <= totalPages ? nextPage : undefined
}
