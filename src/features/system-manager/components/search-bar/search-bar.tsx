import { InputText } from 'primereact/inputtext'
import './search-bar.css'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { useSystemsStore } from '../../store/systems.store'

function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  // const searchQuery = useSystemsStore((state) => state.setSearchQuery)
  const setSearchQuery = useSystemsStore((state) => state.setSearchQuery)
  useEffect(() => {
    const handleSearch = async () => {
      setSearchQuery(debouncedSearchValue)
    }
    handleSearch()
  }, [debouncedSearchValue])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="search-bar">
      <InputText
        className="search-bar__input"
        placeholder="Search for systems..."
        type="text"
        style={{ width: '100%' }}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}

export default SearchBar
