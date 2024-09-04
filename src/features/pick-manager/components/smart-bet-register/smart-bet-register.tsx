import { Panel } from 'primereact/panel'
import {
  FileUpload,
  FileUploadSelectEvent,
  FileUploadUploadEvent
} from 'primereact/fileupload'
import { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'

function SmartBetRegister () {
  const toast = useRef<Toast>(null)
  const [hideButtonBrowse, setHideButtonBrowse] = useState(true)
  const [imagePrev, setImagePrev] = useState<string>('')

  const onUpload = (event: FileUploadUploadEvent) => {
    if (event.xhr.status === 200) {
      console.log('aasdwdqeeqweqwqewqewweqqwe')
      toast.current?.show({
        severity: 'info',
        summary: 'Success',
        detail: 'File Uploaded'
      })
    }
    setHideButtonBrowse(false)
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
    <Panel header="Smart Bet Register" toggleable>
      <Toast ref={toast}></Toast>
        <FileUpload
          mode="basic"
          name="demo"
          url={`${import.meta.env.VITE_API_BASE_URL}/upload`}
          accept="image/*"
          maxFileSize={1000000}
          onUpload={onUpload}
          onError={onError}
          onSelect={onSelect}
        />

      {imagePrev && imagePrev.length > 0 && (
        <div className="grid">
          <div className="col-6">
            <h3>Preview</h3>
            <img src={imagePrev} alt="preview" className="image-preview" />
          </div>
        </div>
      )}
    </Panel>
  )
}

export default SmartBetRegister
