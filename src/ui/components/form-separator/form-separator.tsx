import './form-separator.css'

interface FormSeparatorProps {
  title: string
}

function FormSeparator ({ title }: FormSeparatorProps) {
  return (
    <div className="form-separator">
      {title}
    </div>
  )
}

export default FormSeparator
