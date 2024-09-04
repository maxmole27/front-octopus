import { HeadingWithImage } from '@/ui/components/heading/heading'
import SmartBetRegister from '../components/smart-bet-register/smart-bet-register'

function AddPick () {
  // FLAG: all this must be replaced with the real image and real data
  const image = `${import.meta.env.VITE_API_BASE_URL}/uploads/ada07b7e-f1c6-4102-8b2c-f590acbb9940-Captura_de_pantalla_2024-05-23_a_la(s)_11.09.25 p. m..png`
  const systemData = {
    name: 'LBTennis',
    id: 1
  }
  return (
    <div>
      <HeadingWithImage level={3} image={image}>Register New Pick: {systemData.name} </HeadingWithImage>
      <SmartBetRegister />
    </div>
  )
}

export default AddPick
