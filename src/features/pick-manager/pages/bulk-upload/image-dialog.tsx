import { SmartBetResponse } from '@/features/system-manager/types/individual-bet'
import { FileUpload, FileUploadUploadEvent } from 'primereact/fileupload'
import { Dialog } from 'primereact/dialog'
import { useBulkUploadStore } from '../../store/bulk-upload.store'

interface ImageDialogProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

interface MultiImageResponse {
  completion: string
  filename: string
  path: string
  text: string
}

function ImageDialog({ visible, setVisible }: ImageDialogProps) {
  const appendBulkImagesResponse = useBulkUploadStore(
    (state) => state.appendBulkImagesResponse
  )

  const bulkImagesResponse = useBulkUploadStore(
    (state) => state.bulkImagesResponse
  )

  const onUpload = (event: FileUploadUploadEvent) => {
    if (event.xhr.status === 200) {
      const formattedData: MultiImageResponse[] = JSON.parse(event.xhr.response)

      if (formattedData) {
        formattedData.map((item: MultiImageResponse) => {
          console.log('Item:', item)
          const internalCompletion: SmartBetResponse[] = JSON.parse(
            item.completion
          )
          console.log('Internal Completion:', internalCompletion)
          appendBulkImagesResponse({
            money_stake: 0,
            stake: 0,
            system_id: 0,
            bookie_id: 0,
            individual_bets: internalCompletion.map((bet: SmartBetResponse) => {
              return {
                id: -1,
                bet_status_id: 1,
                odds: parseFloat(bet.odds),
                player_or_team1_id: -1,
                player_or_team2_id: -1,
                specific_bet: bet.specific_bet,
                sport_id: -1,
                type_of_bet: bet.type_of_bet,
                league_or_tournament_id: -1,
              }
            }),
          })
        })
        // console.log('Transformed Data:', data)
      }
    }
  }

  return (
    <Dialog
      header="Import from image list"
      onHide={() => setVisible(false)}
      visible={visible}
    >
      <div className="bulk-upload__dialog">
        <FileUpload
          mode="advanced"
          auto
          name="files"
          multiple
          url={`${
            import.meta.env.VITE_API_BASE_URL
          }/file_uploader/tesseract_multiple`}
          accept="image/*"
          maxFileSize={1000000}
          onUpload={onUpload}
          // onError={onError}
          // onSelect={onSelect}
        />
      </div>
    </Dialog>
  )
}

export default ImageDialog
