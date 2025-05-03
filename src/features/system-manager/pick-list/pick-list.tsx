import { useQuery } from '@tanstack/react-query'
import { getBetsBySystem, getSystemById } from '../services/system.service'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { BetslipResponse, SystemResponse } from '../types/system'
import TitleWithImage from '../components/title-with-image/title-with-image'
import { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import { BetslipsResponse } from '../types/individual-bet'
import TableFilters from '../components/table-filters/table-filters'
import { usePickListStore } from '../store/pick-list.store'
import './pick-list.css'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { getYYYYMMDD } from '@/shared/utils/date-handlers'
import BlockList from '../components/block-list/block-list'
import {
  handleBookieName,
  handleEventName,
  handleLeagueOrTournament,
  handleOdds,
  handleRegisteredDate,
  handleSpecificBet,
  handleSportName,
  handleStake,
  handleStatus,
  handleTypeOfBet,
} from './hande-pick-data'
import rawBookiesService from '@/features/common/bookies/bookies.service'
import { getStatusChip } from '../components/status-chip/status-chip'

function PickList() {
  // const location = useLocation()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    filterRangeEndDate,
    filterRangeStartDate,
    refetchCounter,
    filterTeamsOrPlayers,
    filterSports,
    setRefetchCounter,
  } = usePickListStore()
  const [isModalDelete, toggleModalDelete] = useState(false)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)
  const [listMode, setListMode] = useState(true)

  const { data: bookiesData, isLoading: isLoadingBookies } = useQuery({
    queryKey: ['bookies'],
    queryFn: () => rawBookiesService(),
  })

  const pageParam = searchParams.get('page')
  const page = pageParam ? parseInt(pageParam) : 1

  const { data: systemBets, isLoading: isLoadingBets } =
    useQuery<BetslipsResponse>({
      queryKey: ['system-bets', page, refetchCounter],
      // stale time to refresh automatically
      staleTime: 0,
      queryFn: () =>
        getBetsBySystem({
          pageParam: page,
          systemId: id ? parseInt(id) : 0,
          startDate: filterRangeStartDate
            ? getYYYYMMDD(filterRangeStartDate)
            : undefined,
          endDate: filterRangeEndDate
            ? getYYYYMMDD(filterRangeEndDate)
            : undefined,
          sports: filterSports,
          teamOrPlayer: filterTeamsOrPlayers,
        }),
    })

  const navigate = useNavigate()

  const { data: system } = useQuery<SystemResponse>({
    queryKey: ['system', id],
    queryFn: () => getSystemById(id ? parseInt(id) : 0),
    enabled: !!id && parseInt(id) > 0,
  })

  const resetPage = () => {
    setSearchParams({ page: '1' }, { replace: true })
  }

  useEffect(() => {
    if (!pageParam) {
      setSearchParams({ page: '1' })
    }
  }, [pageParam, setSearchParams])

  function getEntireUrlImage(imageUrl?: string) {
    if (!imageUrl || imageUrl.length === 0) return ''
    return `${import.meta.env.VITE_API_BASE_URL}/static/${imageUrl}`
  }

  function handleDeleteButton() {
    toggleModalDelete(true)
  }

  function handleActions(betslip: BetslipResponse) {
    return (
      <div>
        <Button
          className="p-button-alert"
          style={{ marginRight: '5px' }}
          onClick={() => {
            navigate(`/pick-manager/${betslip.id}?system=${betslip.system_id}`)
          }}
        >
          <i className="pi pi-pen-to-square" />
        </Button>
        <Button
          className="p-button-danger"
          onClick={() => handleDeleteButton()}
        >
          <i className="pi pi-trash" />
        </Button>
      </div>
    )
  }
  function onPageChange(event: { page: number; first: number; rows: number }) {
    setFirst(event.first)
    setRows(event.rows)
    setSearchParams({ page: (event.page + 1).toString() }, { replace: true })
  }
  return (
    <div>
      <TitleWithImage
        title={system?.name}
        imageUrl={getEntireUrlImage(system?.image_url)}
      />
      <TableFilters
        refetchCounter={refetchCounter}
        setRefetchCounter={setRefetchCounter}
        resetPage={resetPage}
      />
      {listMode ? (
        <DataTable value={systemBets?.data} loading={isLoadingBets}>
          <Column
            field="registered_data"
            header="Registered Date"
            body={(betslip) => handleRegisteredDate(betslip)}
          ></Column>
          <Column
            field="event"
            header="Event"
            body={(betslip) => handleEventName(betslip)}
          ></Column>
          <Column
            field="sport"
            header="Sport"
            body={(betslip) => handleSportName(betslip)}
          ></Column>
          <Column
            field="league_or_tournament"
            header="League"
            body={(betslip) => handleLeagueOrTournament(betslip)}
          ></Column>
          <Column
            field="bookie"
            header="Bookie"
            body={(betslip) => handleBookieName(betslip, bookiesData)}
          ></Column>
          <Column
            field="type_of_bet"
            header="Type of Bet"
            body={(betslip) => handleTypeOfBet(betslip)}
          ></Column>
          <Column
            field="specific_bet"
            header="Specific Bet"
            body={(betslip) => handleSpecificBet(betslip)}
          ></Column>
          <Column
            field="stake"
            header="Stake"
            body={(betslip) => handleStake(betslip)}
          ></Column>
          <Column
            field="odds"
            header="Odds"
            body={(betslip) => handleOdds(betslip)}
          ></Column>
          <Column
            field="status"
            header="Status"
            body={(betslip) => getStatusChip(handleStatus(betslip) ?? '')}
          ></Column>
          <Column
            field="actions"
            header="Actions"
            body={(betslip) => handleActions(betslip)}
          ></Column>
        </DataTable>
      ) : (
        <BlockList data={systemBets?.data} loading={isLoadingBets} />
      )}
      <Paginator
        first={first}
        rows={rows}
        totalRecords={systemBets?.totalItems}
        onPageChange={onPageChange}
      />
      <Dialog
        header="Confirmation"
        visible={isModalDelete}
        style={{ width: '50vw' }}
        onHide={() => {
          toggleModalDelete(false)
        }}
      >
        <div>Are you sure you want to delete this bet?</div>
        <Button
          label="Yes"
          className="p-button-success"
          onClick={() => {
            toggleModalDelete(false)
          }}
        />
        <Button
          label="No"
          onClick={() => {
            toggleModalDelete(false)
          }}
        />
      </Dialog>
    </div>
  )
}

export default PickList
