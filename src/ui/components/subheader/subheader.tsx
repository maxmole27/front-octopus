import { useNavigate } from 'react-router'
import './subheader.css'

function Subheader () {
  const navigate = useNavigate()

  function goBack () {
    navigate(-1)
  }
  return (
    <div className='subheader'>
      <button className='subheader__button' onClick={goBack}>go back</button>
      <p>Welcome back, <strong>moleman27</strong></p>
    </div>
  )
}

export default Subheader
