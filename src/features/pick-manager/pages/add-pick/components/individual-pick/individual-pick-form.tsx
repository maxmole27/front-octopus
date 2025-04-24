import { Fragment } from 'react'
import { Controller } from 'react-hook-form'

import FormSeparator from '@/ui/components/form-separator/form-separator'
import FormLabel from '@/ui/components/form-label/form-label'

import { Dropdown } from 'primereact/dropdown'
import { Message } from 'primereact/message'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'

interface IndividualPickFormProps {
  index: number
  enumPicks: number
  removePick: (index: number) => void
  register: any
  control: any
  errors: any
  sportsData: any[]
  statusesData: any[]
}

function IndividualPickForm({
  index,
  enumPicks,
  removePick,
  register,
  control,
  errors,
  sportsData,
  statusesData,
}: IndividualPickFormProps) {
  return (
    <Fragment key={`form-elem-${index}-${enumPicks}`}>
      <div className="grid">
        <div className="col-xs-12 col-s-6 col-l-4">
          <FormSeparator
            title={`Pick N°${index + 1}`}
            onRemoveClick={() => {
              removePick(index)
            }}
          />
        </div>
      </div>
      <input type="hidden" {...register(`picks.${index}.id`)} />
      <input type="hidden" {...register(`picks.${index}.player_or_team1_id`)} />
      <input type="hidden" {...register(`picks.${index}.player_or_team2_id`)} />
      <input
        type="hidden"
        {...register(`picks.${index}.league_or_tournament_id`)}
      />

      <div className="grid">
        <div className="col-xs-6 col-s-6 col-l-4 form-element">
          <FormLabel htmlFor={`picks.${index}.sport_id`}>Sport</FormLabel>
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
                  id={`picks.${index}.sport_id`}
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
          <FormLabel htmlFor={`picks.${index}.player_or_team1_str`}>
            Team/Player 1
          </FormLabel>
          <Controller
            name={`picks.${index}.player_or_team1_str`}
            control={control}
            render={({ field }) => {
              return (
                <InputText
                  placeholder="Team/Player 1"
                  {...field}
                  id={`picks.${index}.player_or_team1_str`}
                />
              )
            }}
          />
          {errors?.picks?.[index]?.player_or_team1_str?.message && (
            <Message
              severity="info"
              text={
                errors?.picks?.[index].player_or_team1_str.message as string
              }
            />
          )}
        </div>
        <div className="col-xs-6 col-l-4 form-element">
          <FormLabel htmlFor={`picks.${index}.player_or_team2_str`}>
            Team/Player 2
          </FormLabel>
          <Controller
            name={`picks.${index}.player_or_team2_str`}
            control={control}
            render={({ field }) => {
              return (
                <InputText
                  placeholder="Team/Player 2"
                  {...field}
                  id={`picks.${index}.player_or_team2_str`}
                />
              )
            }}
          />
          {errors?.picks?.[index]?.player_or_team2_str?.message && (
            <Message
              severity="info"
              text={
                errors?.picks?.[index].player_or_team2_str.message as string
              }
            />
          )}
        </div>
        <div className="col-xs-6 col-l-4 form-element">
          <FormLabel htmlFor={`picks.${index}.odds`}>Odds</FormLabel>
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
                  id={`picks.${index}.odds`}
                />
              )
            }}
          />
          {errors?.picks?.[index]?.odds?.message && (
            <Message
              severity="info"
              text={errors?.picks?.[index].odds.message as string}
            />
          )}
        </div>
        <div className="col-xs-6 col-l-4 form-element">
          <FormLabel htmlFor={`picks.${index}.type_of_bet`}>
            Type of Bet
          </FormLabel>
          <Controller
            name={`picks.${index}.type_of_bet`}
            control={control}
            render={({ field }) => {
              return (
                <InputText
                  placeholder="Asian Handicap, 1x2, Over/Under Goals, Over/Under Cards"
                  {...field}
                  id={`picks.${index}.type_of_bet`}
                />
              )
            }}
          />
        </div>
        <div className="col-xs-6 col-l-4 form-element">
          <FormLabel htmlFor={`picks.${index}.specific_bet`}>
            Specific Bet
          </FormLabel>
          <Controller
            name={`picks.${index}.specific_bet`}
            control={control}
            render={({ field }) => {
              return (
                <InputText
                  placeholder="Over 2.5, Team X -1 HA, Over 185.5 Pts, etc."
                  {...field}
                  id={`picks.${index}.specific_bet`}
                />
              )
            }}
          />
        </div>
        <div className="col-xs-6 col-l-4 form-element">
          <FormLabel htmlFor={`picks.${index}.league_or_tournament_str`}>
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
                  id={`picks.${index}.league_or_tournament_str`}
                />
              )
            }}
          />
          {errors?.picks?.[index]?.league_or_tournament_str?.message && (
            <Message
              severity="info"
              text={
                errors?.picks?.[index].league_or_tournament_str
                  .message as string
              }
            />
          )}
        </div>
        <div className="col-xs-6 col-l-4 form-element">
          <FormLabel htmlFor={`picks.${index}.bet_status_id`}>
            Bet Status
          </FormLabel>
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
                  id={`picks.${index}.bet_status_id`}
                />
              )
            }}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default IndividualPickForm
