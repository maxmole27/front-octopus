import Heading from "@/ui/components/heading/heading"
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import FormLabel from "@/ui/components/form-label/form-label"
import FormSeparator from "@/ui/components/form-separator/form-separator"
import { useState } from "react"


function FormCreateSystem(){
  const [checked, setChecked] = useState(false)
  return (
    <div>
      <Heading level={2}>
        Create New System
      </Heading>
      <form>
        <div className="grid">
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-name">System Name</FormLabel>
            <InputText placeholder="MyNew System" name="system-name" />
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-profile-image">Profile Image</FormLabel>
            <InputText placeholder="System Name" name="system-profile-image" />
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-initial-bankroll">Initial Bankroll</FormLabel>
            <InputNumber placeholder="1000" name="system-initial-bankroll" />
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-description"> Description (optional) </FormLabel>
            <InputText placeholder="My Amazing System Flat stake" name="system-description" />
          </div>
          <div className="col-xs-12 col-s-6 col-l-2 form-element">
            <FormLabel htmlFor="system-is-backtesting"> Is Backtesting? </FormLabel>
            <InputSwitch checked={checked} onClick={() => setChecked(!checked)} name="system-is-backtesting" />
          </div>
        </div>
        <div className="grid">
          <div className="col-xs-12 col-s-6 col-l-4">
            <FormSeparator title="Default Values" />
          </div>
        </div>
        <div className="grid">
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-default-stake">Stake by Default</FormLabel>
            <InputNumber placeholder="100" name="system-default-stake" />
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-default-odds">Bookie by Default</FormLabel>
            <InputText placeholder="Bet365" name="system-default-odds" />
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-default-profit">Sport by Default</FormLabel>
            <InputText placeholder="100" name="system-default-profit" />
          </div>
        </div>
        <div className="grid">
          <div className="col-xs-12" style={{ margin: '2rem 0'}}>
            <Button label="Create System" severity="success" />
          </div>
        </div>
      </form>

    </div>
  )
}

export default FormCreateSystem