import './theme-changer.css'
import { SelectButton } from 'primereact/selectbutton'
import { useGlobalConfigStore } from '@/shared/store/global-config.store'
import { AiFillMoon } from "react-icons/ai";
import { AiFillSun } from "react-icons/ai";

function ThemeChanger () {
  const themeValue = useGlobalConfigStore((state) => state.theme)
  const setTheme = useGlobalConfigStore((state) => state.setTheme)

  return (
    <div className="theme-changer">
      <SelectButton value={themeValue} onChange={(e) => setTheme(e.value)} options={[<AiFillMoon />, <AiFillSun />]} />
    </div>
  )
}

export default ThemeChanger
