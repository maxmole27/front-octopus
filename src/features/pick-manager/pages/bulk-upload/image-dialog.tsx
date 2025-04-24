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
  const setBulkImagesResponse = useBulkUploadStore(
    (state) => state.setBulkImagesResponse
  )

  const onUpload = (event: FileUploadUploadEvent) => {
    if (event.xhr.status === 200) {
      const formattedData: MultiImageResponse[] = JSON.parse(event.xhr.response)

      if (formattedData) {
        formattedData.forEach((item: MultiImageResponse) => {
          const internalCompletion: SmartBetResponse[] = JSON.parse(
            item.completion
          )
          console.log('Internal Completion:', internalCompletion)
        })
        // setBulkImagesResponse(data)
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
