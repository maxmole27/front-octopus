import Heading from '@/ui/components/heading/heading'
import SystemCard from '@system-manager/components/system-card/system-card'
import { Button } from 'primereact/button'
import { Link } from 'react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSystemsService } from './services/system.service'
import { checkLastPage } from '@/shared/utils/queries.utils'

import NoPicture from '@assets/nopicture.png'
import React, { useEffect } from 'react'
import { SystemResponse } from './types/system'
import { useGlobalConfigStore } from '@/shared/store/global-config.store'
import SearchBar from './components/search-bar/search-bar'
import { useSystemsStore } from './store/systems.store'
function SystemManager() {
  const searchQuery = useSystemsStore((state) => state.search_query)

  const {
    data: systemsData,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['systems', searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      getSystemsService({ pageParam: pageParam, system_name: searchQuery }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return checkLastPage(lastPage)
    },
  })

  const setGlobalLoading = useGlobalConfigStore(
    (state) => state.setGlobalLoading
  )

  useEffect(() => {
    if (isLoading) {
      setGlobalLoading(true)
    } else {
      setGlobalLoading(false)
    }
  }, [isLoading])

  if (error) return <div>Error: {error.message}</div>
  return (
    <>
      <div style={{ position: 'relative' }}>
        <Heading level={3}>System Manager</Heading>
        <div
          style={{
            position: 'absolute',
            right: '5px',
            display: 'flex',
            gap: '1rem',
            top: '-7px',
          }}
        >
          <Link to="/pick-manager/bulk-upload">
            <Button icon="pi pi-plus" label="Bulk Upload" severity="help" />
          </Link>
          <Link to="/systems-manager/create">
            <Button icon="pi pi-plus" label="New System" severity="success" />
          </Link>
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
      <div className="grid" style={{ gap: '1rem' }}>
        {systemsData?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.map((system: SystemResponse) => (
              <div className="col-xs-12 col-s-6 col-l-3" key={system.id}>
                <SystemCard
                  key={`${system.id}-${system.name}`}
                  id={system.id}
                  name={system.name}
                  image={
                    system.image_url
                      ? `${import.meta.env.VITE_API_BASE_URL}/static/${
                          system.image_url
                        }`
                      : NoPicture
                  }
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        {hasNextPage && (
          <Button
            label="Load More"
            className="p-button-outlined"
            style={{ marginTop: '1rem' }}
            onClick={() => {
              fetchNextPage()
            }}
          />
        )}
      </section>
      {systemsData?.pages[0]?.totalPages === 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>No systems found</p>
          <Link to="/systems-manager/create">
            <Button severity="success" label="Start Adding a New System" />
          </Link>
        </div>
      )}
    </>
  )
}

export default SystemManager
