import { Controller, useForm } from 'react-hook-form'
import { Calendar } from 'primereact/calendar'
import { MultiSelect } from 'primereact/multiselect'
import './table-filters.css'
import FormLabel from '@/ui/components/form-label/form-label'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { usePickListStore } from '../../store/pick-list.store'

interface FiltersProps {
  dateRange: Date[] | null
  sports: string[]
  teamsOrPlayers: string
}

function TableFilters () {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<FiltersProps>({
    defaultValues: {
      dateRange: null,
      sports: [],
      teamsOrPlayers: ''
    }
  })

  const { setFilterRangeStartDate, setFilterRangeEndDate, setFilterSports, setFilterTeamsOrPlayers } = usePickListStore()

  const onSubmit = (data: FiltersProps) => {
    const { dateRange } = data
    if (dateRange) {
      setFilterRangeStartDate(dateRange[0])
      setFilterRangeEndDate(dateRange[1])
    }
    // setFilterSports('2021-01-01')
    // setFilterTeamsOrPlayers('2021-01-01')
  }
  // TODO: Implement cleanFilters function
  // function cleanFilters () {
  //   setValue('dateRange', null)
  //   setValue('sports', [])
  //   setValue('teamsOrPlayers', '')
  // }

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
                  <MultiSelect value={[]} onChange={(e) => field.onChange(e)} options={[]} optionLabel="name" placeholder="Select Sport" maxSelectedLabels={3} />
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
            <div className="col-xs-4 form-element" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default TableFilters
