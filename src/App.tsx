import {Button} from 'primereact/button'
import Heading from './ui/components/heading/heading'

function App() {

  return (
    <div style={{display: 'grid', minHeight: '100vh', alignItems: 'center'}}>
      <Button label='wololooo' badge="8" icon="pi pi-bell" />
      <Heading level={1}>Hello World</Heading>
      <div className="grid">
        <div className="col-xs-12 col-l-1">1</div>
        <div className="col-xs-12 col-l-1">2</div>
        <div className="col-xs-12 col-l-1">3</div>
        <div className="col-xs-12 col-l-1">4</div>
        <div className="col-xs-12 col-l-1">5</div>
        <div className="col-xs-12 col-l-1">6</div>
        <div className="col-xs-12 col-l-1">7</div>
        <div className="col-xs-12 col-l-1">8</div>
        <div className="col-xs-12 col-l-1">9</div>
        <div className="col-xs-12 col-l-1">10</div>
        <div className="col-xs-12 col-l-1">11</div>
        <div className="col-xs-12 col-l-1">12</div>
      </div>

      <div className="grid">
        <div className="col-xs-12 col-l-2">1</div>
        <div className="col-xs-12 col-l-2">2</div>
        <div className="col-xs-12 col-l-2">3</div>
        <div className="col-xs-12 col-l-2">4</div>
        <div className="col-xs-12 col-l-2">5</div>
        <div className="col-xs-12 col-l-2">6</div>
      </div>

      <div className="grid">
        <div className="col-xs-12 col-l-3">1</div>
        <div className="col-xs-12 col-l-3">2</div>
        <div className="col-xs-12 col-l-3">3</div>
        <div className="col-xs-12 col-l-3">4</div>
      </div>

      <div className="grid">
        <div className="col-xs-12 col-l-4">1</div>
        <div className="col-xs-12 col-l-4">2</div>
        <div className="col-xs-12 col-l-4">3</div>
      </div>

      <div className="grid">
        <div className="col-xs-12 col-l-6">1</div>
        <div className="col-xs-12 col-l-6">2</div>
      </div>

      <div className="grid">
        <div className="col-xs-12 col-l-12">1</div>
      </div>
    </div>
  )
}

export default App
