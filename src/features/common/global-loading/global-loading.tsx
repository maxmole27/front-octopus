import { useGlobalConfigStore } from '@/shared/store/global-config.store'
import Loader from '@/ui/components/loader/loader'
import './global-loading.css'

function GlobalLoading() {
  const isLoading = useGlobalConfigStore((state) => state.globalLoading)

  return (
    isLoading && (
      <div className="global-loader__wrapper">
        <Loader />
      </div>
    )
  )
}

export default GlobalLoading
