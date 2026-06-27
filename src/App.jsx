import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Pokemon from './assets/Pokemon'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path="/" element={<Pokemon />} />
      </Routes>
  )
}

export default App
