import { useEffect, useState } from 'react';
import css from './SearchBox.module.css'
import { useDebouncedCallback } from 'use-debounce';


interface SearchBarProps {
  onSubmit: (query: string) => Promise<void>
}

export default function SearchBox({ onSubmit }: SearchBarProps) {

  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    },
    300
  );

  useEffect(() => {
    onSubmit(searchQuery)
  }, [searchQuery])

  return (<input
    className={css.input}
    type="text"
    placeholder="Search notes"
    onChange={updateSearchQuery} />)
}
