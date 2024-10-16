import './form-separator.css'

interface FormSeparatorProps {
  title: string
  onRemoveClick?: () => void
}

function FormSeparator ({ title, onRemoveClick }: FormSeparatorProps) {
  return (
    <div className="form-separator">
          <p>{title}</p> <div className='form-separator__remove' onClick={onRemoveClick}> <i className="pi pi-times"></i> </div>
    </div>
  )
}

export default FormSeparator
