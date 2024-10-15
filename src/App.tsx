import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Test</h1>
      <div className='bg-red-100'>Hello World</div>
    </>
  )
}

export default App
