import { useRef, useState } from 'react'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'

import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import { Dropdown } from 'primereact/dropdown'
import { Message } from 'primereact/message'
import { Toast } from 'primereact/toast'
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload'
import Heading from '@/ui/components/heading/heading'
import FormLabel from '@/ui/components/form-label/form-label'
import FormSeparator from '@/ui/components/form-separator/form-separator'

import { zodResolver } from '@hookform/resolvers/zod'
import { handleOnUpload } from '@/shared/utils/upload.utils'
import { createSystemTransformer } from '../services/system.transformer'
import { createSystemService } from '../services/system.service'
import { createSchema } from './form-create-resolver'

import rawBookiesService from '@/features/common/bookies/bookies.service'
import rawSportsService from '@/features/common/sports/sports.service'
import { useNavigate } from 'react-router'
import { FormSystemCreate, FormSystemRequest } from '../types/system'
import { SeverityOptions } from '@/ui/types/toast'

function FormCreateSystem () {
  const [isDisabledForm, setIsDisabledForm] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(createSchema)
  })

  const navigate = useNavigate()

  const toast = useRef<Toast>(null)

  const show = (severity: SeverityOptions, title: string, detail: string) => {
    toast.current?.show({ severity, summary: title, detail })
  }

  const { data: bookiesData, isLoading: isLoadingBookies } = useQuery({
    queryKey: ['bookies'],
    queryFn: () => rawBookiesService()
  })

  const { data: sportsData, isLoading: isLoadingSports } = useQuery({
    queryKey: ['sports'],
    queryFn: () => rawSportsService()
  })

  const mutateSystem = useMutation({
    mutationKey: ['systems'],
    mutationFn: (newSystem: FormSystemCreate) => createSystemService(newSystem)
  })
  const onUpload = async (response: FileUploadUploadEvent) => {
    const res = await handleOnUpload(response)
    setValue('systemProfileImage', res?.path)
    setIsDisabledForm(false)
  }

  const onSubmit = (data: FieldValues) => {
    setIsDisabledForm(true)
    // TODO: Owner ID is hardcoded, it should be dynamic when login works
    const system = { ...data, systemOwnerId: 1 } as FormSystemRequest
    const formattedData = createSystemTransformer(system)
    mutateSystem.mutate(formattedData, {
      onSuccess: () => {
        setIsDisabledForm(false)
        show('success', 'System Created', 'The system was created successfully!')
        setTimeout(() => {
          navigate('/systems-manager')
        }, 1000)
      },
      onError: (error) => {
        console.error('error', error)
        setIsDisabledForm(false)
        show('error', 'System Error', 'An error occurred while creating the system!')
      }
    })
  }

  if (isLoadingBookies && isLoadingSports) return <div>Loading...</div>

  return (
    <>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading level={2}>Create New System</Heading>
        <div>
          <div className="grid">
            <div className="col-xs-12 col-s-12 col-l-4 form-element">
              <FormLabel htmlFor="systemName">System Name</FormLabel>
              <InputText
                placeholder="MyNew System"
                {...register('systemName')}
              />
              {errors.systemName?.message && (
                <Message
                  severity="info"
                  text={errors.systemName?.message as string}
                />
              )}
            </div>

            <div className="col-xs-12 col-s-12 col-l-8 form-element"></div>
            <div className="col-xs-12 col-s-6 col-l-4 form-element">
              <FormLabel htmlFor="systemInitialBankroll">
                Initial Bankroll
              </FormLabel>
              <Controller
                name="systemInitialBankroll"
                control={control}
                render={({ field }) => {
                  const { onChange, onBlur, value, ref } = field
                  return (
                    <InputNumber
                      placeholder="1000"
                      value={value?.value}
                      onChange={(e) => onChange(e.value)}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  )
                }}
              />
              {errors.systemInitialBankroll?.message && (
                <Message
                  severity="info"
                  text={errors.systemInitialBankroll?.message as string}
                />
              )}
            </div>
            <div className="col-xs-12 col-s-6 col-l-4 form-element">
              <FormLabel htmlFor="systemDescription">
                Description (optional)
              </FormLabel>
              <InputText
                placeholder="My Amazing System Flat stake"
                {...register('systemDescription')}
              />

              {errors.systemDescription?.message && (
                <Message
                  severity="info"
                  text={errors.systemDescription?.message as string}
                />
              )}
            </div>
            <div className="col-xs-12 col-s-6 col-l-2 form-element">
              <FormLabel htmlFor="systemIsBacktesting">
                Is Backtesting?
              </FormLabel>

              <Controller
                name="systemIsBacktesting"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <InputSwitch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.value)}
                  />
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
              <FormLabel htmlFor="systemDefaultStake">
                Stake by Default
              </FormLabel>
              <Controller
                name="systemDefaultStake"
                control={control}
                render={({ field }) => {
                  const { onChange, onBlur, value, ref } = field
                  return (
                    <InputNumber
                      placeholder="100"
                      value={value?.value}
                      onChange={(e) => onChange(e.value)}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  )
                }}
              />
              {errors.systemDefaultStake?.message && (
                <Message
                  severity="info"
                  text={errors.systemDefaultStake?.message as string}
                />
              )}
            </div>
            <div className="col-xs-12 col-s-6 col-l-4 form-element">
              <FormLabel htmlFor="systemDefaultBookie">
                Bookie by Default
              </FormLabel>
              <Controller
                name="systemDefaultBookie"
                control={control}
                render={({ field }) => {
                  const { onChange, onBlur, value, ref } = field
                  return (
                    <Dropdown
                      placeholder="Select a Bookie"
                      options={bookiesData}
                      optionLabel="name"
                      optionValue="id"
                      value={value}
                      onChange={(e) => onChange(e.value)}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  )
                }}
              />
              {errors.systemDefaultBookie?.message && (
                <Message
                  severity="info"
                  text={errors.systemDefaultBookie?.message as string}
                />
              )}
            </div>
            <div className="col-xs-12 col-s-6 col-l-4 form-element">
              <FormLabel htmlFor="systemDefaultSports">
                Sport by Default
              </FormLabel>
              <Controller
                name="systemDefaultSports"
                control={control}
                render={({ field }) => {
                  const { onChange, onBlur, value, ref } = field
                  return (
                    <Dropdown
                      placeholder="Select a Sport"
                      options={sportsData}
                      optionLabel="name"
                      optionValue="id"
                      value={value}
                      onChange={(e) => onChange(e.value)}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  )
                }}
              />
              {errors.systemDefaultSports?.message && (
                <Message
                  severity="info"
                  text={errors.systemDefaultSports?.message as string}
                />
              )}
            </div>
            <div className="col-xs-12 col-s-12 col-l-4 form-element">
              <FormLabel htmlFor="systemProfileImage">System Image</FormLabel>
              <div
                className="form-element"
                style={{ display: 'flex', position: 'relative', width: '100%' }}
              >
                <FileUpload
                  accept="image/*"
                  auto
                  chooseLabel={'Browse Image'}
                  disabled={isDisabledForm}
                  maxFileSize={10000000}
                  mode="advanced"
                  name="file"
                  onUpload={onUpload}
                  onProgress={() => setIsDisabledForm(true)}
                  url={`${import.meta.env.VITE_API_BASE_URL}/file_uploader`}
                />
              </div>
            </div>
          </div>

          <div className="grid">
            <div className="col-xs-12" style={{ margin: '2rem 0' }}>
              <Button
                label="Create System"
                severity="success"
                type="submit"
                loading={isDisabledForm}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default FormCreateSystem
