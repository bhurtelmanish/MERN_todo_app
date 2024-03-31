import React from 'react'
import { IoSearch } from "react-icons/io5";

const Search = ({onChange}) => {
  return (
    <>
      <div className='search-container'>
          <IoSearch className='search-icon' />
          <input type="search" className="search-todo" placeholder="Search your todos" onInput={onChange} />
      </div>
    </>
  )
}

export default Search