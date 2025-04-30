import Heading from '@/ui/components/heading/heading'
import { Button } from 'primereact/button'
import './bulk-upload.css'
import { useState } from 'react'
import ImageDialog from './image-dialog'
import { useBulkUploadStore } from '../../store/bulk-upload.store'

function BulkUpload() {
  const [imageDialogVisible, setImageDialogVisible] = useState<boolean>(false)

  const bulkImagesResponse = useBulkUploadStore(
    (state) => state.bulkImagesResponse
  )

  return (
    <div>
      <Heading level={2}> Bulk Upload</Heading>
      <div className="bulk-upload__buttons">
        <Button
          label="Import from image list"
          severity="success"
          onClick={() => setImageDialogVisible(true)}
        />
        <Button label="Import from .CSV" severity="warning" />
        <ImageDialog
          visible={imageDialogVisible}
          setVisible={setImageDialogVisible}
        />
      </div>
      <div className="bulk-upload__list">
        {bulkImagesResponse.map((item, index) => {
          console.log('wololoooop', bulkImagesResponse)
          return (
            <div key={index}>
              <div className="bulk-upload__item">
                <p> WOLOLO </p>
                <p>{item.money_stake}</p>
                <p>{item.stake}</p>
                <p>{item.system_id}</p>
                <p>{item.bookie_id}</p>
                <p> ---------------- </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BulkUpload
