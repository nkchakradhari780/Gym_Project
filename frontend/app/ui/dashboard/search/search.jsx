"use client"

import styles from './search.module.css';
import { MdSearch } from 'react-icons/md';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const router = useRouter();
  
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page",1)

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
      
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300); 

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
