import { useNavigate } from 'react-router'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Button } from 'primereact/button'
import './subheader.css'

function Subheader() {
  const navigate = useNavigate()

  function goBack() {
    navigate(-1)
  }
  return (
    <div className="subheader">
      <Button onClick={goBack}>
        <AiOutlineArrowLeft />
      </Button>
      <p>
        Welcome back, <strong>moleman27</strong>
      </p>
    </div>
  )
}

export default Subheader
