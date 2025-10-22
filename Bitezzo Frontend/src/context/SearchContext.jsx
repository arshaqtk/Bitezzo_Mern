import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SearchContext = createContext()

export const SearchProvider=({children})=>{
    const navigate=useNavigate()

    const [searchValue,setSearchValue]=useState()

 
    const acceptSearchValue=(searchValue)=>{
        setSearchValue(searchValue)
        navigate('/search')
    }

  return  (<SearchContext.Provider value={{ acceptSearchValue,searchValue }}>
        {children}
     </SearchContext.Provider>)
  }