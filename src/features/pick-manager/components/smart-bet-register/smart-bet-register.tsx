import { Dialog } from 'primereact/dialog'
import {
  FileUpload,
  FileUploadSelectEvent,
  FileUploadUploadEvent
} from 'primereact/fileupload'
import { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { IndividualPick, IndividualPickFromSmartBet } from '../../types/individual-pick'
import { individualPickAdapter } from '../../adapters/individual-pick-adapter'

interface SmartbetRegisterInterface {
  setIsVisible: (isVisible: boolean) => void
  isVisible: boolean
  appendData: (data: IndividualPick[]) => void
}

function SmartBetRegister ({ setIsVisible, isVisible, appendData }: SmartbetRegisterInterface) {
  const toast = useRef<Toast>(null)
  const [hideButtonBrowse, setHideButtonBrowse] = useState(true)
  const [imagePrev, setImagePrev] = useState<string>('')

  const onUpload = (event: FileUploadUploadEvent) => {
    if (event.xhr.status === 200) {
      toast.current?.show({
        severity: 'info',
        summary: 'Success',
        detail: 'File Uploaded'
      })
    }

    const formattedData = JSON.parse(event.xhr.response)

    const data: IndividualPickFromSmartBet[] = JSON.parse(formattedData.completion)
    const adaptedResponse = individualPickAdapter(data)
    console.log('adaptedResponse', adaptedResponse)
    appendData(adaptedResponse)
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
              <Button
                label="Let the magic happen"
                onClick={() => {
                  // setIsVisible(false)
                  // setImagePrev('')
                }}
              />
            </div>
          </div>
        </>
      )}
    </Dialog>
  )
}

export default SmartBetRegister
