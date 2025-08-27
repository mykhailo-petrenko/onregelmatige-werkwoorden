import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import VerbTrainer from './VerbTrainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VerbTrainer />
    </>
  )
}

export default App
