import { Controller, useForm } from 'react-hook-form'
import { Calendar } from 'primereact/calendar'
import { MultiSelect } from 'primereact/multiselect'
import './table-filters.css'
import FormLabel from '@/ui/components/form-label/form-label'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { usePickListStore } from '../../store/pick-list.store'
import { useQuery } from '@tanstack/react-query'
import rawSportsService from '@/features/common/sports/sports.service'
import { useState } from 'react'

interface FiltersProps {
  dateRange: Date[] | null
  sports: number[]
  teamsOrPlayers: string
}

function TableFilters ({
  refetchCounter,
  setRefetchCounter,
  resetPage
}: { refetchCounter: number, setRefetchCounter: (counter: number) => void, resetPage: () => void }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues
  } = useForm<FiltersProps>({
    defaultValues: {
      dateRange: null,
      sports: [],
      teamsOrPlayers: ''
    }
  })

  const {
    data: sports,
    isLoading: isLoadingSports
  } = useQuery({
    queryKey: ['sports'],
    queryFn: () => rawSportsService()
  })

  const { setFilterRangeStartDate, setFilterRangeEndDate, setFilterSports, setFilterTeamsOrPlayers } = usePickListStore()

  const onSubmit = (data: FiltersProps) => {
    console.log('data', data)
    const { dateRange, sports } = data
    if (dateRange) {
      setFilterRangeStartDate(new Date(dateRange[0]))
      setFilterRangeEndDate(new Date(dateRange[1]))
    }
    if (sports) {
      setFilterSports(sports)
    }
    resetPage()
    setRefetchCounter(refetchCounter + 1)

    // setFilterSports('2021-01-01')
    // setFilterTeamsOrPlayers('2021-01-01')
  }
  function cleanFilters () {
    setFilterRangeStartDate(null)
    setFilterRangeEndDate(null)
    setValue('dateRange', null)
    setValue('sports', [])
    setValue('teamsOrPlayers', '')
  }

  return (
    <div className='table-filters'>
      <div className='title-box'>Filters</div>
      <div className='filter-box'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid">
            <article className="col-xs-12 col-s-6 col-l-4 form-element">
              <FormLabel htmlFor="dateRange">Date Range</FormLabel>
              <Controller
                control={control}
                name='dateRange'
                render={({ field }) => (
                  <Calendar
                    value={field?.value}
                    onChange={(e) => field.onChange(e.value)}
                    dateFormat='yy-mm-dd'
                    selectionMode="range"
                    readOnlyInput
                    hideOnRangeSelection
                  />
                )} />
            </article>
            <article className="col-xs-12 col-s-6 col-l-4 form-element">
              <FormLabel htmlFor="sports">Sport</FormLabel>
              <Controller
                control={control}
                name='sports'
                render={({ field }) => (
                  <MultiSelect
                    value={getValues('sports')}
                    onChange={(e) => { setValue('sports', e.value) }}
                    options={isLoadingSports ? [] : sports}
                    optionLabel="name"
                    optionValue='id'
                    placeholder="Select Sport"
                  />
                )}
              />
            </article>
            <article className="col-xs-12 col-s-6 col-l-4 form-element">
              <FormLabel htmlFor="teamsOrPlayers">Teams or Players</FormLabel>
              <Controller
                control={control}
                name='teamsOrPlayers'
                render={({ field }) => {
                  return <InputText placeholder="Team/Player" className='p-inputtext-variant' {...field} />
                }}
              />
            </article>
          </div>
          <div className="grid">
            <div className="col-xs-4 form-element" />
            <div className="col-xs-4 form-element" style={{ paddingTop: '1rem' }}>
              <Button type="submit" label="Apply" className="p-button-primary" />
            </div>
            <div className="col-xs-2 form-element" />
            <div className='col-xs-2 form-element' style={{ alignItems: 'flex-end', paddingTop: '1rem' }}>
              <Button
                icon="pi pi-eraser"
                className='p-button-alert clean-button-filters'
                onClick={(e) => {
                  e.preventDefault()
                  cleanFilters()
                  console.log('aaaaaaa', getValues('dateRange'))
                  setRefetchCounter(refetchCounter + 1)
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TableFilters
