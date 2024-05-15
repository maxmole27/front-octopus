import Heading from "@/ui/components/heading/heading"
import SystemCard from "@system-manager/components/system-card/system-card"
import { Button } from 'primereact/button'
import { Link } from "react-router-dom"

function SystemManager() {
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
        <div className="col-xs-12 col-s-6 col-l-3">
          <SystemCard />
        </div>
        <div className="col-xs-12 col-s-6  col-l-3">
          <SystemCard />
        </div>
        <div className="col-xs-12 col-s-6  col-l-3">
          <SystemCard />
        </div>
        <div className="col-xs-12 col-s-6  col-l-3">
          <SystemCard />
        </div>
      </div>
    </>
  )
}

export default SystemManager
