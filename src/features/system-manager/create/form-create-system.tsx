import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Heading from "@/ui/components/heading/heading"
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import { Dropdown } from 'primereact/dropdown'

import FormLabel from "@/ui/components/form-label/form-label"
import FormSeparator from "@/ui/components/form-separator/form-separator"


function FormCreateSystem(){
  const [checked, setChecked] = useState(false)

  //react hook form
  const { register, handleSubmit, control } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  const bookies = [
    { name: 'Bet365', code: 'B365' },
    { name: 'Pinnacle', code: 'PIN' },
    { name: 'Betway', code: 'BWY' },
    { name: '888sport', code: '888' },
    { name: 'Betinasia', code: 'BIA' }
  ]

  const sports = [
    { name: 'Soccer', code: 'SOCCER' },
    { name: 'Basketball', code: 'BASKETBALL' },
    { name: 'Tennis', code: 'TENNIS' },
    { name: 'Hockey', code: 'HOCKEY' },
    { name: 'Baseball', code: 'BASEBALL' }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading level={2}>
        Create New System
      </Heading>
      <div>
        <div className="grid">
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-name">System Name</FormLabel>
            <InputText placeholder="MyNew System" {...register('system-name')} />
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
            <Controller
              name="system-default-odds"
              control={control}
              render={({ field }) => (
                <Dropdown 
                  placeholder="Select a Bookie" 
                  options={bookies} 
                  optionLabel="name" 
                  {...field} 
                />
              )}
            />
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-default-profit">Sport by Default</FormLabel>
            <Controller
              name="system-default-sports"
              control={control}
              render={({ field }) => (
                <Dropdown 
                  placeholder="Select a Sport" 
                  options={sports} 
                  optionLabel="name" 
                  {...field} 
                />
              )}
            />
          </div>
        </div>
        <div className="grid">
          <div className="col-xs-12" style={{ margin: '2rem 0'}}>
            <Button label="Create System" severity="success" type="submit" />
          </div>
        </div>
      </div>

    </form>
  )
}

export default FormCreateSystem