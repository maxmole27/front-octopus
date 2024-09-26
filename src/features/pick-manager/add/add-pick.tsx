import { useState, Fragment } from 'react'
import SmartBetRegister from '../components/smart-bet-register/smart-bet-register'
import FormLabel from '@/ui/components/form-label/form-label'

import { HeadingWithImage } from '@/ui/components/heading/heading'
import { pickManagerStore } from '../store/pick-manager.store'
// import { InputText } from 'primereact/inputtext'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Message } from 'primereact/message'
import { Dropdown } from 'primereact/dropdown'
import rawBookiesService from '@/features/common/bookies/bookies.service'
import { useQuery } from '@tanstack/react-query'
import FormSeparator from '@/ui/components/form-separator/form-separator'
import rawSportsService from '@/features/common/sports/sports.service'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { IndividualPick } from '../types/individual-pick'

interface FormPickInterface {
  picks: IndividualPick[]
  systemDefaultBookie: string
}

function AddPick () {
  const selectedSystem = pickManagerStore((state) => state.selectedSystem)
  const [isSmartBetRegisterVisible, setIsSmartBetRegisterVisible] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<FormPickInterface>({
    defaultValues: {
      picks: [
        {
          sport: '',
          teamPlayer1: '',
          teamPlayer2: '',
          odds: 0
        }
      ],
      systemDefaultBookie: ''
    }
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'picks'
  })

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

  const { data: bookiesData, isLoading: isLoadingBookies } = useQuery({
    queryKey: ['bookies'],
    queryFn: () => rawBookiesService()
  })

  const { data: sportsData } = useQuery({
    queryKey: ['sports'],
    queryFn: () => rawSportsService()
  })

  const appendToSmartBet = (data: IndividualPick[]) => {
    append(data)
  }

  return (
    <div>
      <HeadingWithImage
        level={3}
        image={selectedSystem?.systemImageUrl ?? 'setDefaultImage'}
      >
        Register New Pick: {selectedSystem?.systemName}{' '}
      </HeadingWithImage>
      <SmartBetRegister setIsVisible={(isVisible: boolean) => setIsSmartBetRegisterVisible(isVisible)} isVisible={isSmartBetRegisterVisible} appendData={appendToSmartBet} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="systemDefaultBookie">Bookie</FormLabel>
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
                    disabled={isLoadingBookies}
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
        </div>
        {fields.map((_, index) => (
          <Fragment key={`form-elem-${index}`}>
            <div className="grid">
              <div className="col-xs-12 col-s-6 col-l-4">
                <FormSeparator title={`Pick N°${index + 1}`} />
              </div>
            </div>
            <div className="grid">
              <div className="col-xs-6 col-s-6 col-l-4 form-element">
                <FormLabel htmlFor="systemDefaultSports">Sport</FormLabel>
                <Controller
                  name={`picks.${index}.sport`}
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
                {errors?.picks?.[index]?.sport?.message && (
                  <Message
                    severity="info"
                    text={errors?.picks?.[index].sport.message as string}
                  />
                )}
              </div>
              <div className="col-xs-6 col-l-4 form-element">
                <FormLabel htmlFor="teamPlayer1">Team/Player 1</FormLabel>
                <Controller
                  name={`picks.${index}.teamPlayer1`}
                  control={control}
                  render={({ field }) => {
                    return <InputText placeholder="Team/Player 1" {...field} />
                  }}
                />
              </div>
              <div className="col-xs-6 col-l-4 form-element">
                <FormLabel htmlFor="teamPlayer1">Team/Player 2</FormLabel>
                <Controller
                  name={`picks.${index}.teamPlayer2`}
                  control={control}
                  render={({ field }) => {
                    return <InputText placeholder="Team/Player 2" {...field} />
                  }}
                />
              </div>
              <div className="col-xs-6 col-l-4 form-element">
                <FormLabel htmlFor="teamPlayer1">Odds</FormLabel>
                <Controller
                  name={`picks.${index}.odds`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputNumber
                        placeholder="Odds"
                        minFractionDigits={2}
                        maxFractionDigits={5}
                        {...field}
                      />
                    )
                  }}
                />
              </div>
            </div>
          </Fragment>
        ))}

        <button
          onClick={() =>
            append({
              sport: '1',
              teamPlayer1: '',
              teamPlayer2: '',
              odds: 0
            })
          }
        >
          {' '}
          Agregar pick al parlay
        </button>

        <Button type="submit" label="Enviar Formulario" />
        <Button onClick={() => setIsSmartBetRegisterVisible(!isSmartBetRegisterVisible)} label="Open Smart Bet" />
        <Button onClick={() => {
          setValue('picks.0.teamPlayer1', 'Seteado')
        }}> setear valor</Button>
      </form>
    </div>
  )
}

export default AddPick
