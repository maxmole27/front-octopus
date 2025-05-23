import React from 'react'
import ReactDOM from 'react-dom/client'
import '@ui/index.css'
import 'primeicons/primeicons.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { Router } from './routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalLoading from './features/common/global-loading/global-loading'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalLoading />
    </QueryClientProvider>
  </React.StrictMode>
)
