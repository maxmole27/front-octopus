import './theme-changer.css'
import { SelectButton } from 'primereact/selectbutton'
import { useGlobalConfigStore } from '@/shared/store/global-config.store'
import { MoonIcon } from '@/ui/icons/moon-icon'
import { SunIcon } from '@/ui/icons/sun-icon'

function ThemeChanger() {
    const themeValue = useGlobalConfigStore((state) => state.theme)
    const setTheme = useGlobalConfigStore((state) => state.setTheme)

  return (
    <div className="theme-changer">
      <SelectButton value={themeValue} onChange={(e) => setTheme(e.value)} options={[<MoonIcon />, <SunIcon />]} />
    </div>
  )
}

export default ThemeChanger