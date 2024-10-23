// components
import TaskTable from './components/TaskTable'

// chakra
import { ChakraProvider } from '@chakra-ui/react'


// style
import './App.css'

function App() {
  return (
    <ChakraProvider>
      <h1>TanStack Table - TODO list</h1>
      <TaskTable />
    </ChakraProvider>
  )
}

export default App
