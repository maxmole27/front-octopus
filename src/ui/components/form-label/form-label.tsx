import { ReactNode } from "react"
import './form-label.css'

type FormLabelProps = {
  children: ReactNode;
} & JSX.IntrinsicElements['label'];

function FormLabel({ children, ...props }: FormLabelProps) {
  return (
    <label className="form-label" {...props}>
      {children}
    </label>
  )
}

export default FormLabel