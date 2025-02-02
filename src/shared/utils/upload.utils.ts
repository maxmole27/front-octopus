import { FileUploadUploadEvent } from 'primereact/fileupload'

interface UploadResponse {
  filename: string
  message: string
  path: string
}

export function handleOnUpload (response: FileUploadUploadEvent) {
  if (response.xhr.status === 200) {
    const data: UploadResponse = JSON.parse(response.xhr.response)
    return data
  }
}
