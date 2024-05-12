import Heading from "@/ui/components/heading/heading"
import SystemCard from "@system-manager/components/system-card/system-card"

function SystemManager() {
  return (
    <>
      <Heading level={3}>System Manager</Heading>
      <div className="grid" style={{gap: '1rem'}}>
        <div className="col-xs-3">
          <SystemCard />
        </div>
        <div className="col-xs-3">
          <SystemCard />
        </div>
        <div className="col-xs-3">
          <SystemCard />
        </div>
        <div className="col-xs-3">
          <SystemCard />
        </div>
      </div>
    </>
  )
}

export default SystemManager
