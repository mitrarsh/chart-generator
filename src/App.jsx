import React from 'react'
import DataContextProvider from './components/DataContext'
import ChartList from './components/ChartList'

const App = () => {
  return (
    <DataContextProvider>
      <ChartList/>
    </DataContextProvider>
  )
}

export default App