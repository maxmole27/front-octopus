import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Heading from "@/ui/components/heading/heading"
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload'

import FormLabel from "@/ui/components/form-label/form-label"
import FormSeparator from "@/ui/components/form-separator/form-separator"
import { handleOnUpload } from "@/shared/utils/upload.utils"


function FormCreateSystem(){
  const [isDisabledForm, setIsDisabledForm] = useState(false)

  const { register, handleSubmit, control, setValue } = useForm()

  const onSubmit = (data: any) => {
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

  const onUpload = (response: FileUploadUploadEvent) => {
    const res = handleOnUpload(response)
    setValue('system-profile-image', res?.filename)
    setIsDisabledForm(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading level={2}>
        Create New System
      </Heading>
      <div>
        <div className="grid">
          <div className="col-xs-12 col-s-12 col-l-4 form-element">
            <FormLabel htmlFor="system-name">System Name</FormLabel>
            <InputText placeholder="MyNew System" {...register('system-name')} />
          </div>
         
          <div className="col-xs-12 col-s-12 col-l-8 form-element"></div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-initial-bankroll">Initial Bankroll</FormLabel>
            <Controller
              name="system-currency"
              control={control}
              render={({ field }) => {
                return (
                  <InputNumber placeholder="1000" {...field} value={field?.value?.value} />
                )}
              }
            />
            
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-description"> Description (optional) </FormLabel>
            <InputText placeholder="My Amazing System Flat stake" {...register('system-description')} />
          </div>
          <div className="col-xs-12 col-s-6 col-l-2 form-element">
            <FormLabel htmlFor="system-is-backtesting"> Is Backtesting? </FormLabel>
            
            <Controller
              name="system-is-backtesting"
              control={control}
              render={({ field }) => (
                <InputSwitch checked={field.value} onChange={(e) => field.onChange(e.value)} />
              )}
            />
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
            <Controller 
              name="system-default-stake"
              control={control}
              render={({ field }) => (
                <InputNumber placeholder="100" {...field} value={field?.value?.value} />
                
              )}
            />
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="system-default-bookie">Bookie by Default</FormLabel>
            <Controller
              name="system-default-bookie"
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
                  filter
                  {...field} 
                />
              )}
            />
          </div>
          <div className="col-xs-12 col-s-12 col-l-4 form-element">
            <FormLabel htmlFor="system-profile-image">System Image</FormLabel>
            <div className="form-element" style={{display: 'flex', position: 'relative', width: '100%'}} >
              <FileUpload 
                  accept="image/*" 
                  auto 
                  chooseLabel={"Browse Image"}
                  maxFileSize={1000000} 
                  mode="advanced" 
                  name="demo" 
                  onUpload={onUpload} 
                  onProgress={() => setIsDisabledForm(true)}
                  url={`${import.meta.env.VITE_API_BASE_URL}/upload`}
                />
            </div>
          </div>
        </div>
        
        <div className="grid">
          <div className="col-xs-12" style={{ margin: '2rem 0'}}>
            <Button loading={true} label="Create System" severity="success" type="submit" disabled={isDisabledForm} />
          </div>
        </div>
      </div>

    </form>
  )
}

export default FormCreateSystem