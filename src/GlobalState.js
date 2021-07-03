import { createContext } from 'react'
import BlogAPI from './api/BlogAPI'

export const GlobalState = createContext()

const DataProvider = ({ children }) => {
  const state = {
    blogAPI: BlogAPI()
  }

  return (
    <GlobalState.Provider value={state}>
      { children }
    </GlobalState.Provider>
  )
}

export default DataProvider