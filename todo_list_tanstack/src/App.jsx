
// react hooks
import { useState } from 'react'

// components
import TaskTable from './components/TaskTable'

// chakra
import { ChakraProvider } from '@chakra-ui/react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <h1>Vite + React</h1>
      {/* <div className="card"> */}
      {/* <button onClick={() => setCount((count) => count + 1)}> */}
      {/* count is {count} */}
      {/* </button> */}
      {/* </div> */}
      <TaskTable/>
    </ChakraProvider>
  )
}

export default App
