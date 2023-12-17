import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [test,setTest] = useState('')

  useEffect(()=>{
    fetch('./api')
    .then(response=>response.json())
    .then(data=>console.log(data))
  },[])
  return (
    <div>
      test
    </div>
  )
}

export default App
