import Heading from "@/ui/components/heading/heading"
import SystemCard from "@system-manager/components/system-card/system-card"
import { Button } from 'primereact/button'
import { Link } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import systemService from "./services/system.service"

function SystemManager() {

  const { data: systemsData, isLoading, error } = useQuery({
    queryKey: ['systems'],
    queryFn: () => systemService()
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div style={{position: 'relative'}}>
        <Heading level={3}>System Manager</Heading>
        <div style={{position: "absolute", right: '10px', top: '0px'}}>
          <Link to="/systems-manager/create">
            <Button icon="pi pi-plus" label="New System" severity="success" />
          </Link>
        </div>
      </div>
      <div className="grid" style={{gap: '1rem'}}>
        {
          systemsData?.map((system: SystemResponse) => (
            <div className="col-xs-12 col-s-6 col-l-3" key={system.ID}>
              <SystemCard 
                key={`${system.ID}-${system.Name}`}
                id={system.ID}
                name={system.Name}
                image={system.ImageUrl}
              />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SystemManager
