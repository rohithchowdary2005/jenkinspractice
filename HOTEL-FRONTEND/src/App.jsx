import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import HotelCrud from './components/HotelCrud';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HotelCrud/>
    </>
  )
}

export default App
