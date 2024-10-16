import { useState, Fragment, useEffect, MouseEvent, useRef } from 'react'
import SmartBetRegister from '../components/smart-bet-register/smart-bet-register'
import FormLabel from '@/ui/components/form-label/form-label'

import { HeadingWithImage } from '@/ui/components/heading/heading'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Message } from 'primereact/message'
import { Dropdown } from 'primereact/dropdown'
import rawBookiesService from '@/features/common/bookies/bookies.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import FormSeparator from '@/ui/components/form-separator/form-separator'
import rawSportsService from '@/features/common/sports/sports.service'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { FormPickInterface } from '../types/individual-pick'
import { getSystemById } from '@/features/system-manager/services/system.service'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SystemResponse } from '@/features/system-manager/types/system'
import { createBetslipWithIndividualBets } from '@/features/common/betslips/betslip.service'
import betslipTransformer from '@/features/common/betslips/betslip.transformer'
import { getBetStatuses } from '../services/bet-statuses.service'
import { IndividualBetCreate } from '@/features/system-manager/types/individual-bet'
import './add-pick.css'
// import { createSchema } from './add-pick-resolver'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { v4 as uuid } from 'uuid'
import { Toast } from 'primereact/toast'
import { SeverityOptions } from '@/ui/types/toast'

function AddPick () {
  // const selectedSystem = pickManagerStore((state) => state.selectedSystem)
  const [isSmartBetRegisterVisible, setIsSmartBetRegisterVisible] =
    useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('system')
  // to update successfully the form elements form smart bet
  const [enumPicks, setEnumPicks] = useState<number>(0)
  const navigate = useNavigate()
  const { data: systemData } = useQuery<SystemResponse, Error>({
    queryKey: ['system', id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey // Extraer el id del queryKey
      return getSystemById(id as number) // Asegurar que id sea un número
    }
  })

  const toast = useRef<Toast>(null)

  const show = (severity: SeverityOptions, title: string, detail: string) => {
    toast.current?.show({ severity, summary: title, detail })
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    register
  } = useForm<FormPickInterface>({
    // resolver: zodResolver(createSchema),
    defaultValues: {
      picks: [
        {
          sport_id: 1,
          player_or_team1_id: -1,
          player_or_team2_id: -1,
          league_or_tournament_id: -1,
          bet_status_id: 1,
          league_or_tournament_str: '',
          player_or_team1_str: '',
          specific_bet: '',
          type_of_bet: '',
          player_or_team2_str: '',
          odds: 0
        }
      ],
      bookie_id: systemData?.bookie_by_default?.id ?? -1,
      stake: systemData?.stake_by_default ?? 1,
      money_stake: systemData?.stake_by_default ?? 0
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'picks'
  })

  useEffect(() => {
    if (getValues('picks.0.sport_id') === undefined && systemData) {
      setValue('picks.0.sport_id', systemData?.sport_by_default?.id ?? -1)
    }
    if (systemData) {
      setValue('bookie_id', systemData?.bookie_by_default?.id ?? -1)
    }
  }, [systemData, getValues, setValue])

  useEffect(() => {
    if (!searchParams.get('system')) {
      setSearchParams({ system: '0' })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    console.log('errors', errors)
  }, [errors])

  const onSubmit = async (data: unknown) => {
    console.log('data', data)
    const transformedData = betslipTransformer(data as FormPickInterface)
    mutation.mutate(transformedData)
    setTimeout(() => {
      navigate('/systems-manager')
    }, 1000)
  }

  const { data: bookiesData, isLoading: isLoadingBookies } = useQuery({
    queryKey: ['bookies'],
    queryFn: () => rawBookiesService()
  })

  const { data: sportsData } = useQuery({
    queryKey: ['sports'],
    queryFn: () => rawSportsService()
  })

  const { data: statusesData } = useQuery({
    queryKey: ['statuses'],
    queryFn: () => getBetStatuses()
  })

  const mutation = useMutation({
    mutationFn: createBetslipWithIndividualBets,
    onSuccess () {
      show('success', 'Pick created', 'The pick was created successfully')
      // go back with react router
    }
  })

  const appendToSmartBet = (data: IndividualBetCreate[]) => {
    setEnumPicks(enumPicks + 1)
    remove()
    data.forEach((item) => {
      append(item)
    })
  }

  function appendNewPickToParlay (e: MouseEvent) {
    e.preventDefault()
    setEnumPicks(enumPicks + 1)
    append({
      sport_id: systemData?.sport_by_default?.id ?? -1,
      player_or_team1_id: -1,
      player_or_team2_id: -1,
      league_or_tournament_id: -1,
      bet_status_id: -1,
      league_or_tournament_str: '',
      player_or_team1_str: '',
      specific_bet: '',
      type_of_bet: '',
      player_or_team2_str: '',
      odds: 0
    })
  }

  function removePick (index: number) {
    remove(index)
    setEnumPicks(enumPicks + 1)
  }

  return (
    <div>
      <Toast ref={toast} />
      <HeadingWithImage
        level={3}
        image={systemData?.image_url ?? 'setDefaultImage'}
      >
        Register New Pick: {systemData?.name}{' '}
      </HeadingWithImage>
      <SmartBetRegister
        setIsVisible={(isVisible: boolean) =>
          setIsSmartBetRegisterVisible(isVisible)
        }
        isVisible={isSmartBetRegisterVisible}
        appendData={appendToSmartBet}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('system_id')} value={id ?? -1} />
        <div className="grid">
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="bookie_id">Bookie</FormLabel>
            <Controller
              name="bookie_id"
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
            {errors.bookie_id?.message && (
              <Message
                severity="info"
                text={errors.bookie_id?.message as string}
              />
            )}
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="stake">Stake</FormLabel>
            <Controller
              name="stake"
              control={control}
              render={({ field }) => {
                const { onChange } = field
                return (
                  <InputNumber
                    placeholder="Stake"
                    minFractionDigits={2}
                    maxFractionDigits={2}
                    {...field}
                    onChange={(e) => {
                      onChange(e.value)
                    }}
                    onBlur={(e) => {
                      if (systemData?.initial_bankroll && e.target.value.length > 0) {
                        const result = systemData?.initial_bankroll / 100 * parseFloat(e.target.value)
                        setValue('money_stake', result)
                      }
                    }}
                  />
                )
              }}
            />
            {errors.stake?.message && (
              <Message severity="info" text={errors.stake?.message as string} />
            )}
          </div>
          <div className="col-xs-12 col-s-6 col-l-4 form-element">
            <FormLabel htmlFor="money_stake">Money Stake</FormLabel>
            <Controller
              name="money_stake"
              control={control}
              render={({ field }) => {
                const { onChange } = field
                return (
                  <InputNumber
                    placeholder="Money Stake"
                    minFractionDigits={2}
                    maxFractionDigits={2}
                    {...field}
                    onChange={(e) => onChange(e.value)}
                  />
                )
              }}
            />
            {errors.money_stake?.message && (
              <Message
                severity="info"
                text={errors.money_stake?.message as string}
              />
            )}
          </div>
        </div>
        <section className="header_buttons">
          <div className='btn_wrapper'>
            <Button
              label="Agregar pick al parlay"
              onClick={(e) => {
                e.preventDefault()
                appendNewPickToParlay(e)
              }}
            />
          </div>
          <div className='btn_wrapper'>
            <Button
              onClick={(e) => {
                e.preventDefault()
                setIsSmartBetRegisterVisible(!isSmartBetRegisterVisible)
              }}
              label="Open Smart Bet"
              className='p-button-alert'
            />
          </div>
        </section>
        {fields.map((_, index) => {
          return (
            <Fragment key={`form-elem-${index}-${enumPicks}`}>
              <div className="grid">
                <div className="col-xs-12 col-s-6 col-l-4">
                  <FormSeparator title={`Pick N°${index + 1}`} onRemoveClick={() => { removePick(index) }} />
                </div>
              </div>
              <input
                type="hidden"
                {...register(`picks.${index}.player_or_team1_id`)}
              />
              <input
                type="hidden"
                {...register(`picks.${index}.player_or_team2_id`)}
              />
              <input
                type="hidden"
                {...register(`picks.${index}.league_or_tournament_id`)}
              />

              <div className="grid">
                <div className="col-xs-6 col-s-6 col-l-4 form-element">
                  <FormLabel htmlFor="sport_id">Sport</FormLabel>
                  <Controller
                    name={`picks.${index}.sport_id`}
                    key={`picks.${index}.sport_id`}
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
                  {errors?.picks?.[index]?.sport_id?.message && (
                    <Message
                      severity="info"
                      text={errors?.picks?.[index].sport_id.message as string}
                    />
                  )}
                </div>
                <div className="col-xs-6 col-l-4 form-element">
                  <FormLabel htmlFor="player_or_team1_str">
                    Team/Player 1
                  </FormLabel>
                  <Controller
                    name={`picks.${index}.player_or_team1_str`}
                    control={control}
                    render={({ field }) => {
                      return <InputText placeholder="Team/Player 1" {...field} />
                    }}
                  />
                  {errors?.picks?.[index]?.player_or_team1_str?.message && (
                      <Message
                        severity="info"
                        text={errors?.picks?.[index].player_or_team1_str.message as string}
                      />
                  )}
                </div>
                <div className="col-xs-6 col-l-4 form-element">
                  <FormLabel htmlFor="player_or_team1_str`}">
                    Team/Player 2
                  </FormLabel>
                  <Controller
                    name={`picks.${index}.player_or_team2_str`}
                    control={control}
                    render={({ field }) => {
                      return <InputText placeholder="Team/Player 2" {...field} />
                    }}
                  />
                </div>
                <div className="col-xs-6 col-l-4 form-element">
                  <FormLabel htmlFor="odds">Odds</FormLabel>
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
                          onChange={(e) => field.onChange(e.value)}
                        />
                      )
                    }}
                  />
                </div>
                <div className="col-xs-6 col-l-4 form-element">
                  <FormLabel htmlFor="type_of_bet">Type of Bet</FormLabel>
                  <Controller
                    name={`picks.${index}.type_of_bet`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputText
                          placeholder="Asian Handicap, 1x2, Over/Under Goals, Over/Under Cards"
                          {...field}
                        />
                      )
                    }}
                  />
                </div>
                <div className="col-xs-6 col-l-4 form-element">
                  <FormLabel htmlFor="specific_bet">Specific Bet</FormLabel>
                  <Controller
                    name={`picks.${index}.specific_bet`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputText
                          placeholder="Over 2.5, Team X -1 HA, Over 185.5 Pts, etc."
                          {...field}
                        />
                      )
                    }}
                  />
                </div>
                <div className="col-xs-6 col-l-4 form-element">
                  <FormLabel htmlFor="league_or_tournament_str">
                    League or Tournament
                  </FormLabel>
                  <Controller
                    name={`picks.${index}.league_or_tournament_str`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <InputText
                          placeholder="UEFA Champions League, Italy Serie A, ATP Shanghai, NHL"
                          {...field}
                        />
                      )
                    }}
                  />
                </div>
                <div className="col-xs-6 col-l-4 form-element">
                  <FormLabel htmlFor="bet_status_id">Bet Status</FormLabel>
                  <Controller
                    name={`picks.${index}.bet_status_id`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Dropdown
                          options={statusesData}
                          optionLabel="name"
                          optionValue="id"
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          placeholder="Select Status"
                        />
                      )
                    }}
                  />
                </div>
              </div>
            </Fragment>
          )
        })}
        <section className='grid'>
          <div className='col-xs-12 form-element'>
            <Button
              type="submit"
              label="Crear Pick"
              className='p-button-success'
              style={{ maxWidth: '400px', width: '100%', margin: '30px auto' }}
            />
          </div>
        </section>
      </form>
    </div>
  )
}

export default AddPick
