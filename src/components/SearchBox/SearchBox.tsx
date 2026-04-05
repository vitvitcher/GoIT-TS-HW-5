import { useState } from 'react';
import css from './SearchBox.module.css'


interface SearchBoxProps {
  onChange: (query: string) => void
}

export default function SearchBox({ onChange }: SearchBoxProps) {

  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchQuery =
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
      onChange(e.target.value)
    };



  return (<input
    className={css.input}
    type="text"
    placeholder="Search notes"
    value={searchQuery}
    onChange={updateSearchQuery} />)
}
