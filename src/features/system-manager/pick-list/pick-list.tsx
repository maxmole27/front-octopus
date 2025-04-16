import { useQuery } from '@tanstack/react-query'
import { getBetsBySystem, getSystemById } from '../services/system.service'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { format, parseISO } from 'date-fns'
import { BetslipResponse, SystemResponse } from '../types/system'
import TitleWithImage from '../components/title-with-image/title-with-image'
import React, { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import { BetslipsResponse } from '../types/individual-bet'
import TableFilters from '../components/table-filters/table-filters'
import { usePickListStore } from '../store/pick-list.store'
import { getAllLeagues, getAllParlayPicks, getAllSpecificBets, getAllSports, getAllTypeOfBets, getRealOddsParlay, handleOddsParlay, handleStatusParlay } from '@/shared/utils/pick-manager.utils'
import { BET_STATUS } from '@/ui/constants'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { getYYYYMMDD } from '@/shared/utils/date-handlers'

function PickList () {
  // const location = useLocation()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    filterRangeEndDate,
    filterRangeStartDate,
    refetchCounter,
    filterSports,
    setRefetchCounter
  } = usePickListStore()
  const [isModalDelete, toggleModalDelete] = useState(false)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)

  const pageParam = searchParams.get('page')
  const page = pageParam ? parseInt(pageParam) : 1

  const { data: systemBets, isLoading: isLoadingBets } = useQuery<BetslipsResponse>({
    queryKey: ['system-bets', page, refetchCounter],
    // stale time to refresh automatically
    staleTime: 0,
    queryFn: () => getBetsBySystem({
      pageParam: page,
      systemId: id ? parseInt(id) : 0,
      startDate: filterRangeStartDate ? getYYYYMMDD(filterRangeStartDate) : undefined,
      endDate: filterRangeEndDate ? getYYYYMMDD(filterRangeEndDate) : undefined,
      sports: filterSports
    })
  })

  const navigate = useNavigate()

  const { data: system } = useQuery<SystemResponse>({
    queryKey: ['system', id],
    queryFn: () => getSystemById(id ? parseInt(id) : 0),
    enabled: !!id && parseInt(id) > 0
  })

  const resetPage = () => {
    setSearchParams({ page: '1' }, { replace: true })
  }

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

  function handleDeleteButton () {
    toggleModalDelete(true)
  }

  function handleActions (betslip: BetslipResponse) {
    return (
      <div>
        <Button className='p-button-alert' style={{ marginRight: '5px' }} onClick={() => { navigate(`/pick-manager/${betslip.id}?system=${betslip.system_id}`) }}><i className='pi pi-pen-to-square' /></Button>
        <Button className='p-button-danger' onClick={() => handleDeleteButton()}><i className='pi pi-trash' /></Button>
      </div>
    )
  }
  function onPageChange (event: { page: number, first: number, rows: number }) {
    setFirst(event.first)
    setRows(event.rows)
    setSearchParams({ page: (event.page + 1).toString() }, { replace: true })
  }
  return (
    <div>
      <TitleWithImage title={system?.name} imageUrl={getEntireUrlImage(system?.image_url)} />
      <TableFilters refetchCounter={refetchCounter} setRefetchCounter={setRefetchCounter} resetPage={resetPage} />
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
      <Paginator first={first} rows={rows} totalRecords={systemBets?.totalItems} onPageChange={onPageChange} />
      <Dialog header="Confirmation" visible={isModalDelete} style={{ width: '50vw' }} onHide={() => { toggleModalDelete(false) }}>
        <div>Are you sure you want to delete this bet?</div>
        <Button label="Yes" className="p-button-success" onClick={() => { toggleModalDelete(false) }} />
        <Button label="No" onClick={() => { toggleModalDelete(false) }} />
      </Dialog>
    </div>
  )
}

export default PickList
