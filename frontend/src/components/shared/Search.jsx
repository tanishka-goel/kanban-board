import React,{useState} from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'

const Search = ({onSearchChange}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearchChange(e.target.value);
  };
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

      <Input
        type="text"
        placeholder="Search..."
        className="pl-10" 
        value={query}
        onChange={handleChange}
      />
    </div>
  )
}

export default Search