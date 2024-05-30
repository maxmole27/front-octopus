import Heading from '@/ui/components/heading/heading'
import SystemCard from '@system-manager/components/system-card/system-card'
import { Button } from 'primereact/button'
import { Link } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getSystemsService } from './services/system.service'
import { checkLastPage } from '@/shared/utils/queries.utils'

import NoPicture from '@assets/nopicture.png'

function SystemManager () {
  const {
    data: systemsData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching
  } = useInfiniteQuery({
    queryKey: ['systems'],
    queryFn: getSystemsService,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => checkLastPage(lastPage)

  })

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Heading level={3}>System Manager</Heading>
        <div style={{ position: 'absolute', right: '10px', top: '0px' }}>
          <Link to="/systems-manager/create">
            <Button icon="pi pi-plus" label="New System" severity="success" />
          </Link>
        </div>
      </div>
      <div className="grid" style={{ gap: '1rem' }}>
        {
          systemsData?.pages.map((group) => {
            return group.systems.map((system: SystemResponse) => (
              <div className="col-xs-12 col-s-6 col-l-3" key={system.ID}>
                <SystemCard
                  key={`${system.ID}-${system.Name}`}
                  id={system.ID}
                  name={system.Name}
                  image={system.ImageUrl ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${system.ImageUrl}` : NoPicture}
                />
              </div>
            ))
          })
        }
      </div>
      { isFetching && <div>Loading...</div>}
      <section style={{ display: 'flex', justifyContent: 'center' }}>
      {
        hasNextPage && (
          <Button label="Load More" className="p-button-outlined" onClick={() => {
            fetchNextPage()
          }} />
        )
      }
      </section>

    </>
  )
}

export default SystemManager
