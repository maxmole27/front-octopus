import { Dialog } from 'primereact/dialog'
import {
  FileUpload,
  FileUploadSelectEvent,
  FileUploadUploadEvent
} from 'primereact/fileupload'
import { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { IndividualBetCreate, SmartBetResponse } from '@/features/system-manager/types/individual-bet'
import { useQuery } from '@tanstack/react-query'
import rawSportsService from '@/features/common/sports/sports.service'
import { getBetStatuses } from '../../services/bet-statuses.service'
import { BetStatusResponse } from '@/features/common/bet-statuses/bet-statuses'
import { Sport } from '@/features/common/sports/sports'

interface SmartbetRegisterInterface {
  setIsVisible: (isVisible: boolean) => void
  isVisible: boolean
  appendData: (data: IndividualBetCreate[]) => void
}

function SmartBetRegister ({ setIsVisible, isVisible, appendData }: SmartbetRegisterInterface) {
  const toast = useRef<Toast>(null)
  const [hideButtonBrowse, setHideButtonBrowse] = useState(true)
  const [imagePrev, setImagePrev] = useState<string>('')

  const { data: sportsData } = useQuery<Sport[]>({
    queryKey: ['sports'],
    queryFn: () => rawSportsService()
  })

  const { data: betStatuses } = useQuery<BetStatusResponse[]>({
    queryKey: ['betStatuses'],
    queryFn: () => getBetStatuses()
  })

  const onUpload = async (event: FileUploadUploadEvent) => {
    if (event.xhr.status === 200) {
      toast.current?.show({
        severity: 'info',
        summary: 'Success',
        detail: 'File Uploaded'
      })
    }

    const formattedData = JSON.parse(event.xhr.response)
    const data: SmartBetResponse[] = JSON.parse(formattedData.completion)
    const transformedData: IndividualBetCreate[] = await Promise.all(
      data.map(async (item: SmartBetResponse) => {
        const selectedSport = sportsData?.find((sport: Sport) => sport.name === formattedData.sport)?.id
        const selectedBetStatus = betStatuses?.find((typeOfBet: BetStatusResponse) => typeOfBet.name === formattedData.bet_status)?.id
        return {
          bet_status_id: selectedBetStatus || 1,
          specific_bet: item.specific_bet,
          odds: parseFloat(item.odds),
          player_or_team1_str: item.team1,
          player_or_team2_str: item.team2,
          league_or_tournament_str: item.league_or_tournament ?? '',
          sport_id: selectedSport || 1,
          type_of_bet: item.type_of_bet
        }
      }))
    appendData(transformedData)
    setHideButtonBrowse(false)
    setIsVisible(false)
  }

  const onError = () => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Error uploading file'
    })
    setImagePrev('')
    setHideButtonBrowse(true)
  }

  const onSelect = (event: FileUploadSelectEvent) => {
    setImagePrev(URL.createObjectURL(event.files[0]))
  }

  return (
    <Dialog onHide={() => setIsVisible(false)} visible={isVisible} header="Smart Bet">
      <Toast ref={toast}></Toast>
        <div className="grid">
          <div className="col-xs-12" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <FileUpload
              mode="basic"
              auto
              name="file"
              url={`${import.meta.env.VITE_API_BASE_URL}/file_uploader/tesseract`}
              accept="image/*"
              maxFileSize={1000000}
              onUpload={onUpload}
              onError={onError}
              onSelect={onSelect}
            />
          </div>
        </div>

      {imagePrev && imagePrev.length > 0 && (
        <>
          <div className="grid">
            <div className="col-6">
              <h3 style={{ color: 'var(--purple-blaze-500)' }}>Preview</h3>
              <img src={imagePrev} alt="preview" className="image-preview" />
            </div>
          </div>
          <div className='grid'>
            <div className='col-12'>
              {hideButtonBrowse && (<Button
                label="Loading..."
                disabled={true}
                onClick={() => {
                  // setIsVisible(false)
                  // setImagePrev('')
                }}
              />)}
            </div>
          </div>
        </>
      )}
    </Dialog>
  )
}

export default SmartBetRegister
