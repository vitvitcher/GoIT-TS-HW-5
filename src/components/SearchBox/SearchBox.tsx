import { useEffect, useState } from 'react';
import css from './SearchBox.module.css'
// import { useDebouncedCallback } from 'use-debounce';


interface SearchBoxProps {
  onChange: (query: string) => Promise<void>
}

export default function SearchBox({ onChange }: SearchBoxProps) {

  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchQuery =
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    };

  useEffect(() => {
    onChange(searchQuery)
  }, [searchQuery])

  return (<input
    className={css.input}
    type="text"
    placeholder="Search notes"
    value={searchQuery}
    onChange={updateSearchQuery} />)
}
