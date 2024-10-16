import { useQuery } from '@tanstack/react-query'
import { getBetsBySystem, getSystemById } from '../services/system.service'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { format, parseISO } from 'date-fns'
import { BetslipResponse, SystemResponse } from '../types/system'
import TitleWithImage from '../components/title-with-image/title-with-image'
import React, { useEffect } from 'react'
import { Paginator } from 'primereact/paginator'
import { BetslipsResponse } from '../types/individual-bet'
import TableFilters from '../components/table-filters/table-filters'
import { usePickListStore } from '../store/pick-list.store'
import { getAllLeagues, getAllParlayPicks, getAllSpecificBets, getAllSports, getAllTypeOfBets, getRealOddsParlay, handleOddsParlay, handleStatusParlay } from '@/shared/utils/pick-manager.utils'
import { BET_STATUS } from '@/ui/constants'
import { Button } from 'primereact/button'

function PickList () {
  // const location = useLocation()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { filterRangeEndDate } = usePickListStore()

  const pageParam = searchParams.get('page')
  const page = pageParam ? parseInt(pageParam) : 1

  const { data: systemBets, isLoading: isLoadingBets } = useQuery<BetslipsResponse>({
    queryKey: ['system-bets', page],
    queryFn: () => getBetsBySystem({ pageParam: page, systemId: id ? parseInt(id) : 0 })
  })

  const navigate = useNavigate()

  const { data: system } = useQuery<SystemResponse>({
    queryKey: ['system', id],
    queryFn: () => getSystemById(id ? parseInt(id) : 0),
    enabled: !!id && parseInt(id) > 0
  })

  useEffect(() => {
    if (!pageParam) { setSearchParams({ page: '1' }) }
  }, [pageParam, setSearchParams])

  function handleEventName (betslip: BetslipResponse): React.ReactNode {
    if (!betslip.individual_bets || betslip.individual_bets.length === 0) return <>No Individual Bet !</>
    if (betslip.individual_bets.length === 1) return <>{betslip.individual_bets[0].player_or_team1.name} vs {betslip.individual_bets[0].player_or_team2.name}</>
    if (betslip.individual_bets.length > 1) return getAllParlayPicks(betslip)
  }

  function handleSportName (betslip: BetslipResponse) {
    if (!betslip.individual_bets[0]) return 'No Individual Bet !'
    if (betslip.individual_bets.length === 0) return betslip.individual_bets[0].player_or_team1.sport.name
    return getAllSports(betslip)
  }

  function handleRegisteredDate (betslip: BetslipResponse) {
    if (!betslip.created_at) return 'No Date'
    return format(parseISO(betslip.created_at), 'yyyy-MM-dd')
  }

  function handleLeagueOrTournament (betslip: BetslipResponse) {
    if (!betslip.individual_bets[0]) return 'No Individual Bet !'
    if (betslip.individual_bets.length === 1) return betslip.individual_bets[0].league_or_tournament.name
    return getAllLeagues(betslip)
  }

  function handleStake (betslip: BetslipResponse) {
    return betslip.stake
  }

  function handleOdds (betslip: BetslipResponse) {
    if (!betslip.individual_bets[0]) return 'No Individual Bet !'
    if (betslip.individual_bets.length === 1) return `${betslip.individual_bets[0].odds.toFixed(2)} / ${getRealOddsParlay(betslip)}`
    const result = handleOddsParlay(betslip)

    return `${result} / ${getRealOddsParlay(betslip)}`
  }

  function handleStatus (betslip: BetslipResponse) {
    if (!betslip.individual_bets[0]) return 'No Individual Bet !'
    if (betslip.individual_bets.length === 1) return BET_STATUS[betslip.individual_bets[0].bet_status_id]
    const result = handleStatusParlay(betslip)
    if (betslip.individual_bets.length > 1) return result
  }

  function handleTypeOfBet (betslip: BetslipResponse) {
    if (!betslip.individual_bets[0]) return 'No Individual Bet !'
    if (betslip.individual_bets.length === 1) return betslip.individual_bets[0].type_of_bet
    return getAllTypeOfBets(betslip)
  }

  function handleSpecificBet (betslip: BetslipResponse) {
    if (!betslip.individual_bets[0]) return 'No Individual Bet !'
    if (betslip.individual_bets.length === 1) return betslip.individual_bets[0].specific_bet
    return getAllSpecificBets(betslip)
  }

  function getEntireUrlImage (imageUrl?: string) {
    if (!imageUrl || imageUrl.length === 0) return ''
    return `${import.meta.env.VITE_API_BASE_URL}/static/${imageUrl}`
  }

  function handleActions (betslip: BetslipResponse) {
    return (
      <div>
        <Button className='p-button-alert' style={{ marginRight: '5px' }} onClick={() => { navigate(`/pick-manager/${betslip.id}`) }}><i className='pi pi-pen-to-square' /></Button>
        <Button className='p-button-danger' onClick={() => console.log('Delete', betslip)}><i className='pi pi-trash' /></Button>
      </div>
    )
  }
  function onPageChange (event: { first: number }) {
    setSearchParams({ page: (event.first / 2 + 1).toString() })
  }
  return (
    <div>
      <TitleWithImage title={system?.name} imageUrl={getEntireUrlImage(system?.image_url)} />
      <TableFilters />
      <h1> {filterRangeEndDate?.getDate() || '' }</h1>
      <DataTable value={systemBets?.data} loading={isLoadingBets}>
        <Column field="registered_data" header="Registered Date" body={(betslip) => handleRegisteredDate(betslip)}></Column>
        <Column field="event" header="Event" body={(betslip) => handleEventName(betslip)}></Column>
        <Column field="sport" header="Sport" body={(betslip) => handleSportName(betslip)}></Column>
        <Column field="league_or_tournament" header="League" body={(betslip) => handleLeagueOrTournament(betslip)}></Column>
        <Column field="type_of_bet" header="Type of Bet" body={(betslip) => handleTypeOfBet(betslip)}></Column>
        <Column field="specific_bet" header="Specific Bet" body={(betslip) => handleSpecificBet(betslip)}></Column>
        <Column field="stake" header="Stake" body={(betslip) => handleStake(betslip)}></Column>
        <Column field="odds" header="Odds" body={(betslip) => handleOdds(betslip)}></Column>
        <Column field="status" header="Status" body={(betslip) => handleStatus(betslip)}></Column>
        <Column field="actions" header="Actions" body={(betslip) => handleActions(betslip)}></Column>
      </DataTable>
      <Paginator first={0} rows={10} totalRecords={systemBets?.totalItems} onPageChange={onPageChange} />
    </div>
  )
}

export default PickList