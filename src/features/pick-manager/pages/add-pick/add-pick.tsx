import { useState, useEffect, MouseEvent, useRef } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams, useSearchParams } from 'react-router'

import FormLabel from '@/ui/components/form-label/form-label'
import { HeadingWithImage } from '@/ui/components/heading/heading'

import { Message } from 'primereact/message'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { InputNumber } from 'primereact/inputnumber'
import { Toast } from 'primereact/toast'

import './add-pick.css'

import rawBookiesService from '@/features/common/bookies/bookies.service'
import rawSportsService from '@/features/common/sports/sports.service'
import { getSystemById } from '@/features/system-manager/services/system.service'
import { SystemResponse } from '@/features/system-manager/types/system'
import {
  createBetslipWithIndividualBets,
  updateBetslipWithIndidivualBets,
} from '@/features/common/betslips/betslip.service'
import betslipTransformer from '@/features/common/betslips/betslip.transformer'
import { IndividualBetCreate } from '@/features/system-manager/types/individual-bet'
import { createSchema } from './add-pick-resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { SeverityOptions } from '@/ui/types/toast'
import { useGetPickById } from './useGetPickById'
import { pickManagerStore } from '../../store/pick-manager.store'
import { FormPickInterface } from '../../types/individual-pick'
import SmartBetRegister from '../smart-bet-register/smart-bet-register'
import getBetStatuses from '@/features/common/bet-statuses/bet-statuses.service'
import IndividualPickForm from './components/individual-pick/individual-pick-form'
import { useAppendBet } from './hooks/useAppendBet'

function AddPick({ editMode = false }: { editMode?: boolean }) {
  const { pickId } = useParams()

  const [isSmartBetRegisterVisible, setIsSmartBetRegisterVisible] =
    useState(false)

  const [isEditMode, setIsEditMode] = useState(editMode)
  const [currentPickId, setCurrentPickId] = useState<number>(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const [systemId, setSystemId] = useState<number>(0)

  const [enumPicks, setEnumPicks] = useState<number>(0)
  const navigate = useNavigate()
  const { data: systemData } = useQuery<SystemResponse, Error>({
    queryKey: ['system', systemId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey
      return getSystemById(id as number)
    },
    enabled: !!systemId && systemId > 0,
  })

  const toast = useRef<Toast>(null)

  const show = (severity: SeverityOptions, title: string, detail: string) => {
    toast.current?.show({ severity, summary: title, detail })
  }
  const pms = pickManagerStore()

  const { pickData } = useGetPickById(currentPickId, pms.editCounter)
  const defaultValues = {
    bookie_id: pickData?.bookie_id ?? -1,
  }
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    register,
  } = useForm<FormPickInterface>({
    resolver: zodResolver(createSchema),
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
          odds: 0,
        },
      ],
      bookie_id: defaultValues.bookie_id,
      stake: systemData?.stake_by_default ?? 1,
      money_stake: systemData?.stake_by_default ?? 0,
      system_id: systemId ?? -1,
    },
  })

  useEffect(() => {
    console.log('getValues', getValues('picks'))
  })

  useEffect(() => {
    if (currentPickId === parseInt(pickId ?? '0')) return
    setCurrentPickId(parseInt(pickId ?? '0'))
  }, [pickId, currentPickId])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'picks',
  })

  useEffect(() => {
    if (searchParams.get('system')) {
      setSystemId(parseInt(searchParams.get('system')?.toString() ?? '0'))
    }
  }, [searchParams, setValue, systemId])

  useEffect(() => {
    pms.incrementEditCounter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentPickId && currentPickId > 0) {
      setIsEditMode(true)
    } else {
      setIsEditMode(false)
    }
  }, [currentPickId])

  useEffect(() => {
    if (getValues('picks.0.sport_id') === undefined && systemData) {
      setValue('picks.0.sport_id', systemData?.sport_by_default?.id ?? -1)
    }
    if (systemData) {
      setValue('bookie_id', systemData?.bookie_by_default?.id ?? -1)
    }
  }, [systemData, getValues, setValue])

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)

    if (!searchParams.get('system')) {
      newParams.set('system', '0')
    }

    // Solo actualiza los parámetros si son diferentes a los actuales
    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams({ ...newParams }, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const onSubmit = async (data: object) => {
    if (isEditMode) {
      const transformedData = betslipTransformer({
        ...data,
        system_id: systemId,
      } as FormPickInterface)
      editMutation.mutate({
        betslipId: parseInt(pickId ?? '0') ?? 0,
        updatedBetslip: transformedData,
      })
      setTimeout(() => {
        navigate('/systems-manager')
      }, 1000)
    } else {
      const transformedData = betslipTransformer({
        ...data,
        system_id: systemId,
      } as FormPickInterface)
      mutation.mutate(transformedData)
      setTimeout(() => {
        navigate('/systems-manager')
      }, 1000)
    }
  }

  const { data: bookiesData, isLoading: isLoadingBookies } = useQuery({
    queryKey: ['bookies'],
    queryFn: () => rawBookiesService(),
  })

  const { data: sportsData } = useQuery({
    queryKey: ['sports'],
    queryFn: () => rawSportsService(),
  })

  const { data: statusesData } = useQuery({
    queryKey: ['statuses'],
    queryFn: () => getBetStatuses(),
  })

  const mutation = useMutation({
    mutationFn: createBetslipWithIndividualBets,
    onSuccess() {
      show('success', 'Pick created', 'The pick was created successfully')
      // go back with react router
    },
  })

  const editMutation = useMutation({
    mutationFn: updateBetslipWithIndidivualBets,
    onSuccess() {
      show('success', 'Pick edited', 'The pick was edited successfully')
      // go back with react router
    },
  })

  const appendToSmartBet = (data: IndividualBetCreate[]) => {
    setEnumPicks(enumPicks + 1)
    remove()
    data.forEach((item) => {
      append(item)
    })
  }

  function appendNewPickToParlay(e: MouseEvent) {
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
      odds: 0,
    })
  }

  function removePick(index: number) {
    remove(index)
    setEnumPicks(enumPicks + 1)
  }

  useAppendBet({
    pickData,
    setValue,
    remove,
    append,
    setEnumPicks,
  })

  return (
    <div>
      <Toast ref={toast} />
      <HeadingWithImage
        level={3}
        image={systemData?.image_url ?? 'setDefaultImage'}
      >
        {isEditMode ? 'Edit ' : 'Register New '} Pick: {systemData?.name}{' '}
      </HeadingWithImage>
      <SmartBetRegister
        setIsVisible={(isVisible: boolean) =>
          setIsSmartBetRegisterVisible(isVisible)
        }
        isVisible={isSmartBetRegisterVisible}
        appendData={appendToSmartBet}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    id={'bookie_id'}
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
                      if (
                        systemData?.initial_bankroll &&
                        e.target.value.length > 0
                      ) {
                        const result =
                          (systemData?.initial_bankroll / 100) *
                          parseFloat(e.target.value)
                        setValue('money_stake', result)
                      }
                    }}
                    id="stake"
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
                    id="money_stake"
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
          <div className="btn_wrapper">
            <Button
              label="Add pick to parlay"
              onClick={(e) => {
                e.preventDefault()
                appendNewPickToParlay(e)
              }}
            />
          </div>
          <div className="btn_wrapper">
            <Button
              onClick={(e) => {
                e.preventDefault()
                setIsSmartBetRegisterVisible(!isSmartBetRegisterVisible)
              }}
              label="Open Smart Bet"
              className="p-button-alert"
            />
          </div>
        </section>
        {fields.map((_, index) => {
          return (
            <IndividualPickForm
              key={`form-elem-${index}-${enumPicks}`}
              index={index}
              removePick={removePick}
              register={register}
              control={control}
              errors={errors}
              sportsData={sportsData}
              statusesData={statusesData}
            />
          )
        })}
        <section className="grid">
          <div className="col-xs-12 form-element">
            <Button
              type="submit"
              label={isEditMode ? 'Edit Pick' : 'Create Pick'}
              className="p-button-success"
              style={{ maxWidth: '400px', width: '100%', margin: '30px auto' }}
            />
          </div>
        </section>
      </form>
    </div>
  )
}

export default AddPick
