import {
  handleEventName,
  handleRegisteredDate,
  handleSportName,
} from '../../pick-list/hande-pick-data'

import { Chip } from 'primereact/chip'

interface BlockListProps {
  data: any[] | undefined
  loading: boolean
}

function BlockList({ data, loading }: BlockListProps) {
  return (
    <div className="block-list__wrapper">
      {data?.map((bet) => (
        <div key={bet.id} className="block-list__element">
          <p className="block-list__date">{handleRegisteredDate(bet)}</p>
          <p></p>
          <p className="block-list__match">{handleEventName(bet)}</p>
          <p> {handleSportName(bet)} </p>
          <p>{bet.type_of_bet}</p>
          <p>{bet.specific_bet}</p>
          <p className="block-list__stakes">
            <Chip label={`stake ${bet.stake} ($${bet.money_stake})`} />{' '}
          </p>
          <p className="block-list__stakes">
            <Chip label={bet.bookie} />{' '}
          </p>
          <p></p>
        </div>
      ))}
    </div>
  )
}

export default BlockList
